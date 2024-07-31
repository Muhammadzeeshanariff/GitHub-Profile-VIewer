import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ users }) => {
  return (
    <div className="flex gap-5 flex-wrap justify-center py-5">
      {Array.isArray(users) && users.length > 0 ? (
        users.map(
          (user) =>
            user?.login && (
              <div
                key={user.id}
                className="flex w-[350px] border rounded-3xl border-black bg-gradient-to-b from-indigo-950 to-sky-900 p-3 flex-col items-center"
              >
                <img
                  src={user?.avatar_url}
                  alt={`${user.login}'s avatar`}
                  className="w-24 mb-4 rounded-full"
                />
                <h1 className="text-xl">{user.login}</h1>
                <Link to={`/${user?.login}`}>
                  <span className="text-gray-200 bg-sky-950 my-3 font-semibold block py-1 px-4 tracking-wide rounded">
                    View
                  </span>
                </Link>
              </div>
            )
        )
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
};

export default UserCard;
