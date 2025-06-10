import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, inActiveButton }) => {
  const dispatch = useDispatch();
  // console.log(user);
  const { _id, firstName, lastName, age, gender, profilePic, bio } = user;
  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="h-62 w-full overflow-hidden">
        <img
          src={profilePic}
          alt="Profile Pic"
          className="h-full w-full object-fit"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        <p> {bio.length > 40 ? bio.substring(0, 38) + "..." : bio}</p>
        {age && gender && <p>{age + ", " + gender}</p>}
        <div className="card-actions justify-center gap-4 my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
            disabled={inActiveButton}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
            disabled={inActiveButton}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
