import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
      console.log(res?.data?.data);
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found...</h1>;
  return (
    <div className="flex flex-col  items-center my-5">
      <h1 className="text-bold text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, profilePic, age, gender, bio } =
          connection;
        return (
          <div
            className="flex items-center gap-6  bg-base-200 mt-4 rounded-2xl max-w-[800px]"
            key={connection._id}
          >
            <div className="rounded-l-2xl p-6 bg-base-300">
              <img
                src={profilePic}
                alt="profile-pic"
                className="w-20 rounded-lg"
              />
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
            <div className="flex flex-col p-6">
              <h3 className="font-bold">{firstName + " " + lastName}</h3>
              <p>{bio}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
