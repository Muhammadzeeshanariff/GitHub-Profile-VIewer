import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import UserCard from "../components/UserCard";
import Header from "../components/Header";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const BaseURL = "https://api.github.com/users";

  const allUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BaseURL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const findUser = async () => {
    setLoading(true);
    setError(null);
    try {
      if (searchTerm.trim() !== "") {
        setUsers([]);
        const res = await fetch(`${BaseURL}/${searchTerm}`);
        if (res.status === 404) {
          throw new Error("User not found");
        }
        const data = await res.json();
        setUsers([data]);
      } else {
        allUsers();
      }
    } catch (error) {
      console.error("Error finding user:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        findUser={findUser}
      />
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500 font-semibold text-center">{error}</div>
      ) : (
        <div className="container">
          {" "}
          <UserCard users={users} />{" "}
        </div>
      )}
    </div>
  );
};

export default Home;
