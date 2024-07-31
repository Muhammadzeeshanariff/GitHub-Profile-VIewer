import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import Repo from "../components/Repo";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import Logo from "../components/Logo";

const Details = () => {
  const [user, setUser] = useState(null);
  const [type, setType] = useState("repos");
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const BaseURL = "https://api.github.com/users";

  const getUserInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BaseURL + pathname);
      if (!res.ok) {
        throw new Error("User not found");
      }
      const data = await res.json();
      setUser(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUrls = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BaseURL}${pathname}/${type}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setInfos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUrls();
  }, [pathname, type]);

  return (
    <>
      <div>
        <Logo></Logo>
      </div>
      <div className="py-5">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-1 font-medium mx-1 my-4 bg-black rounded text-gray-200"
        >
          Back
        </button>
        {loading && <Loading />}
        {error && (
          <div className="text-red-500 font-semibold text-center">{error}</div>
        )}{" "}
        {user && (
          <div
            className="flex justify-center md:flex-row
            md:px-0 px-4 flex-col gap-10"
          >
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-[350px] rounded-lg md:mx-0 mx-auto"
            />
            <div className="text-lg px-3 leading-10">
              <h1 className="text-3xl pb-4 text-black font-extrabold">
                {user?.name}
              </h1>
              <h1>
                <span className="text-black">Login Name</span> : {user?.login}
              </h1>
              <h1>
                <span className="text-black">followers</span> :{" "}
                {user?.followers}
              </h1>
              <h1>
                <span className="text-black">following</span> :{" "}
                {user?.following}
              </h1>
              <h1>
                <span className="text-black">Public_Repositories</span> :{" "}
                {user?.public_repos}
              </h1>
              <h1>
                <span className="text-black">Join</span> :{" "}
                {new Date(user?.created_at).toLocaleDateString()}
              </h1>
              <a
                href={user?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-sky-950 my-3 tracking-wide"
              >
                Visit
              </a>
            </div>
          </div>
        )}
        <div className="flex border-b border-green-600 pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl">
          <Tabs type={type} setType={setType} />
        </div>
        {type === "repos" && (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
            {infos && <Repo repos={infos} />}
          </div>
        )}
        {type === "followers" && (
          <div>
            <UserCard users={infos} />
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
