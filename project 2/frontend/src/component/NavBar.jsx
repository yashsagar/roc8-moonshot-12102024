import { useState } from "react";
import { useUser } from "../store/user.js";
const NavBar = () => {
  const { user, logout } = useUser();
  const [showDropDown, setShowDropDown] = useState(false);

  const handelLogout = () => {
    setShowDropDown(false);
    logout();
  };

  const handelDatabaseUpdation = async () => {
    try {
      fetch("http://localhost:3000/v1/db/update").then(
        (res) => res.ok && console.log("database updated")
      );
    } catch (error) {
      console.log(`database update failed : ${error}`);
    }
    setShowDropDown(false);
  };

  return (
    <nav className="wrapper flex py-2 justify-between">
      <div className="pl-2 text-2xl font-bold text-green-500">Yash</div>
      <div className="relative">
        <div
          onClick={() => {
            setShowDropDown((prevState) => !prevState);
          }}
          className="w-10 aspect-square rounded-full bg-slate-600 grid place-content-center cursor-pointer text-white"
        >
          {(user[0] && user[0].toUpperCase()) || "U"}
        </div>
        <div
          className={`absolute  ${
            showDropDown ? "block" : "hidden"
          } top-10 -right-2 w-fit bg-slate-400 px-2 py-4 mt-2 rounded-md space-y-2 z-10`}
        >
          <div
            onClick={handelLogout}
            className="py-2 bg-slate-300 rounded-md px-2 cursor-pointer hover:bg-slate-200 active: active:bg-slate-200/50 select-none"
          >
            Logout
          </div>
          <div
            onClick={handelDatabaseUpdation}
            className="py-2 bg-slate-300 rounded-md px-2 cursor-pointer hover:bg-slate-200 whitespace-nowrap active: active:bg-slate-200/50 select-none"
          >
            Update Database
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
