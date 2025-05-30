import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailId: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };
  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body ">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <div className="py-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            {!isLogin && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer mt-4 text-blue-500 hover:underline font-bold"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "New User? SignUp Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
