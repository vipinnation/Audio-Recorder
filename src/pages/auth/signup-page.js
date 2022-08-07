import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { API_URL } from "../../assets/config";
import getHeaders from "../../assets/scripts/getHeaders";
import {
  toastWarning,
  toastSuccess,
  toastError,
} from "../../assets/scripts/toastMessage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "cookies-next";

const SignUpPage = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    confPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate()
  useEffect(() => {
    if (getCookie("auth-token")) {
      navigate("/profile");
      return;
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, username, password, confPassword } = user;

    var regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkEmail = regexp.test(String(user.email).toLowerCase());

    var userNameRegex = /^(?=[a-zA-Z0-9._]{5,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const checkUsername = userNameRegex.test(String(user.username));

    if (!email && !username && !password && !confPassword)
      toastWarning("All Field required");
    else if (!email) toastWarning("Email is required");
    else if (!username) toastWarning("Username is required");
    else if (!password) toastWarning("Password is required");
    else if (!confPassword) toastWarning("Confirm your password");
    else if (checkEmail == false) toastWarning("Enter valid email");
    else if (username.length <= 4) toastWarning("Username should of 5 digit");
    else if (checkUsername == false) toastWarning("Enter valid username");
    else if (password.length <= 5) toastWarning("Password should of 6 digit");
    else if (password != confPassword) toastWarning("Password Mismatch");
    else {
      await saveData();
    }

    setIsLoading(false);
  };

  const saveData = async function () {
    try {
      let res = await axios.post(`${API_URL}/auth/signup`, user, {
        headers: getHeaders(),
      });
      toastSuccess(res.data.msg);
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        toastError(error.response.data.msg);
      } else {
        toastError("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Email <i class="fas fa-spinner fa-spin"></i>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                placeholder="Enter your email"
              />
            </div>
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Username
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                placeholder="Enter your username"
              />
            </div>
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="password"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                placeholder="Enter your password"
              />
            </div>
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Confirm Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="password"
                value={user.confPassword}
                onChange={(e) => {
                  setUser({ ...user, confPassword: e.target.value });
                }}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group font-semibold text-lg bg-secondary relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <div className="flex items-center">
                {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                <span className="px-2"> Register</span>
              </div>
            </button>
          </div>
        </form>

        <div>
          <p>
            Already have an account{" "}
            <Link
              exact
              to="/login"
              className="px-2 text-indigo-600 hover:text-indigo-500 font-semibold cursor-pointer "
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
