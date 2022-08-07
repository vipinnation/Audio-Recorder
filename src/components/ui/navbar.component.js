import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <div className="bg-primary">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link exact to='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">Audio Recorder</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center font-semibold text-white">
            <Link exact to="/">
              <span className="mr-5 hover:text-gray-900">Home</span>
            </Link>
            <Link exact to="/">
              <span className="mr-5 hover:text-gray-900">About</span>
            </Link>
            <Link exact to="/login">
              <span className="mr-5 hover:text-gray-900">Login</span>
            </Link>

            <Link exact to="/contact-us">
              <span className="mr-5 hover:text-gray-900">Contact Us</span>
            </Link>
          </nav>
 
        </div>
      </header>
    </div>
  );
};

export default NavbarComponent;
