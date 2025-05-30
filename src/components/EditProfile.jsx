import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [bio, setBio] = useState(user.bio || "");
  const [gender, setGender] = useState(user.gender || "");
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, profilePic, bio },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10 gap-10">
        <div className="flex justify-center ">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body ">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="py-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name:</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name:</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age:</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Bio:</legend>
                  <input
                    type="text"
                    className="input"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender:</legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Profile Pic Url:</legend>
                  <input
                    type="text"
                    className="input"
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, profilePic, bio }}
          inActiveButton={true}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
