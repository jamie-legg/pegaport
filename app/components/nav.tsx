import { useEffect, useState } from "react";
import { Link, NavLink } from "remix";

const Nav = () => {
    const [isHome, setIsHome] = useState(true);
    const activeStyle = "text-5xl font-bold";
    useEffect(
        () => {
            //check window location for active link
            const path = window.location.pathname;
            if(path.includes("/search")){
                setIsHome(false);
            }
        }
    );
    return (
        <nav>
        <ul className="flex uppercase 2xl:space-x-20 2xl:text-2xl font-bold 2xl:mx-20 pt-2">
        <li>
        <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            my pega
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            search
          </NavLink>
        </li>
        <li>
          <NavLink to="/family">
            {({ isActive }) => (
              <span
                className={
                  isActive ? activeStyle : undefined
                }
              >
                family tree
              </span>
            )}
          </NavLink>
            </li>
        </ul>
        </nav>
    );
}

export default Nav;