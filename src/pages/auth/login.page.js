import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../assets/config";
import getHeaders from "../../assets/scripts/getHeaders";
import { toastError, toastWarning } from "../../assets/scripts/toastMessage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getCookie, setCookie } from "cookies-next";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (getCookie("auth-token")) {
      navigate("/profile");
      return;
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = user;

    if (!email && !password) {
      toastWarning("All field required");
    } else if (!email) {
      toastWarning("Email is required");
    } else if (!password) {
      toastWarning("Password is required");
    } else {
      await saveUserToDataBase();
    }
    setIsLoading(false);
  };

  const saveUserToDataBase = async function () {
    try {
      let res = await axios.post(`${API_URL}/auth/login`, user, {
        headers: getHeaders(),
      });
      if (res.status == 201) {
        setCookie("auth-token", res.data.token);
        setCookie("role", res.data.role);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        toastError(error.response.data.msg);
      } else if (error.code == "ERR_NETWORK") {
        toastError("Please check internet connection");
      } else {
        toastError("Something went wrong");
      }
    }
  };
  return (
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" onSubmit={submitHandler}>
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="w-full">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Email
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                placeholder="Enter your email"
              />
            </div>
            <div class="w-full">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Password
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="password"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                placeholder="Enter your password"
              />
              <div class="flex items-end justify-between">
                <div class="text-sm">
                  <Link
                    exact
                    to="/forgot-password"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group font-semibold text-lg bg-secondary relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
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
                <span className="px-2"> Sign in</span>
              </div>
            </button>
          </div>
        </form>

        <div>
          <p>
            Don't have an account{" "}
            <Link
              exact
              to="/sign-up"
              className="px-2 text-indigo-600 hover:text-indigo-500 font-semibold cursor-pointer "
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
