import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests Found...</h1>;
  return (
    <div className="flex flex-col  items-center my-5">
      <h1 className="text-bold text-3xl">Connection Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, profilePic, age, gender, bio } =
          request.fromUserId;
        return (
          <div
            className="flex items-center gap-6 p-2 bg-base-300 mt-4 rounded-2xl max-w-[800px]"
            key={request._id}
          >
            <img
              src={profilePic}
              alt="profile-pic"
              className="w-28 rounded-full "
            />
            <div className="flex flex-col p-6">
              <h3 className="font-bold">{firstName + " " + lastName}</h3>
              <p>{bio}</p>
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
            <div className="flex gap-4">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
