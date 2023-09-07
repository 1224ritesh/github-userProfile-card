import PropTypes from "prop-types";

const Cards = ({ userData }) => {
  if (!userData) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <p className="text-gray-500 text-lg font-semibold">
            Enter a GitHub username to get started
          </p>
        </div>
      </div>
    );
  }

  const createdDate = new Date(userData.created_at);
  const formattedDate = `${createdDate.getFullYear()}/${
    createdDate.getMonth() + 1
  }/${createdDate.getDate()}`;

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <div className="bg-green-200 shadow-md rounded-lg p-4">
        <div className="p-6 flex flex-col items-center justify-center">
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s Avatar`}
            className="w-24 h-24 rounded-full border-4 border-black/20 mb-4 shadow-md"
          />
          <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
          <p className="text-gray-600 text-lg">@{userData.login}</p>
          <div className="mt-4 text-gray-700 text-lg text-center">
            <p className="mb-2">Public Repositories: {userData.public_repos}</p>
            <p className="mb-2">Public Gists: {userData.public_gists}</p>
            <p>Profile Created At: {formattedDate}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white to-white/40 rounded-b-xl"></div>
      </div>
    </div>
  );
};

Cards.propTypes = {
  userData: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    public_repos: PropTypes.number.isRequired,
    public_gists: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cards;
