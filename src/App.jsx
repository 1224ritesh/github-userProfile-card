import "./App.css";
import { useState } from "react";
import axios from "axios";
import Cards from "./components/Cards";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  const getData = async () => {
    if (!username) {
      // Check if the username is empty
      setEmptyInput(true);
      setUserNotFound(false);
      return;
    }

    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(res.data);
      setUserNotFound(false);
      setEmptyInput(false);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      setUserNotFound(true);
      setUserData(null);
      setEmptyInput(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Search GitHub Profile
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <button
          onClick={getData}
          className="bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded-md"
        >
          Fetch GitHub Profile
        </button>
        {userNotFound && (
          <div className="bg-red-100 text-red-700 p-2 mt-4 rounded-md">
            Username not found, enter a valid GitHub username.
          </div>
        )}
        {emptyInput && (
          <div className="bg-yellow-100 text-yellow-700 p-2 mt-4 rounded-md">
            Please enter a GitHub username.
          </div>
        )}
        {userData && !userNotFound && !emptyInput && (
          <Cards userData={userData}></Cards>
        )}
      </div>
    </div>
  );
}

export default App;
