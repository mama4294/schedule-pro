import "./App.css";
import React, { useState } from "react";
import { Link, Outlet, Routes, Route } from "react-router-dom";
import GridPage from "./routes/grid-page";

import { Button } from "./components/button/button";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<GridPage />} />
        <Route path="gantt" element={<GanttPage />} />
        <Route path="chart" element={<ChartPage />} />
      </Route>
    </Routes>
  );
}

export default App;

const Navigation = () => {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const currentUser = null;
  return (
    <>
      <nav className="fixed z-50 top-0 w-full ease-in-out duration-300 bg-white">
        {/* Web Navbar */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1
              className="flex-shrink-0 px-3 py-2 rounded-md text-xl font-medium ease-in-out duration-300 text-slate-800"
              href="/"
            >
              Unitled Project
            </h1>

            <div className="hidden md:block">
              <div className="mr-10  items-baseline w-full flex justify-between">
                <div>
                  <Link to="/">
                    <Button>Grid</Button>
                  </Link>
                  <Link to="/gantt">
                    <Button>Gantt</Button>
                  </Link>
                  <Link to="/chart">
                    <Button>Charts</Button>
                  </Link>
                </div>

                <div>
                  {!currentUser && (
                    <a href="/login">
                      <Button>Log In</Button>
                    </a>
                  )}
                  {currentUser && (
                    <a>
                      <Button>Log Out</Button>
                    </a>
                  )}
                  <a href={!currentUser ? "/signup" : "/"}>
                    <Button buttonType="outline">Save</Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setDropDownIsOpen(!dropDownIsOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md focus:outline-none ease-in-out duration-300"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!dropDownIsOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-20 mx-5">
        <Outlet />
      </div>
    </>
  );
};

const GanttPage = () => {
  return <h1 className="text-3xl font-bold underline">Gantt Page!</h1>;
};
const ChartPage = () => {
  return <h1 className="text-3xl font-bold underline">Charts Page!</h1>;
};
