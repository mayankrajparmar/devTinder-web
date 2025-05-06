import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, age, gender, profilePic, bio } = user;
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={profilePic} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{bio}</p>
          {age && gender && <p>{age + ", " + gender}</p>}
          <div className="card-actions justify-center gap-4 my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
