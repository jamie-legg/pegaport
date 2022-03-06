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
              `${isActive ? activeStyle : undefined} transition-all hover:text-5xl hover:font-bold`
            }
          >
            my pega
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) =>
            `${isActive ? activeStyle : undefined} transition-all hover:text-5xl hover:font-bold`
            }
          >
            search
          </NavLink>
        </li>
        <li>
        <a
            href="https://discord.gg/5c2AGrEMsw"
            className={`transition-all hover:text-5xl hover:font-bold`}
            
          >
            discord
          </a>
            </li>
        </ul>
        </nav>
    );
}

export default Nav;