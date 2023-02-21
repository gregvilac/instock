import "./Header.scss";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo/InStock-Logo.svg";

function Header() {

  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/">
          <img src={logo} alt="InStock logo" className="header__logo-img"></img>
        </NavLink>
      </div>
      <div className="header__links">
        <NavLink to = '/' className={({ isActive }) => 
              "header__link " + (isActive && window.location.pathname === '/' ? "header__link--active" : "null")}> 
          Warehouses
        </NavLink>
        <NavLink to="/inventory" className={({ isActive }) => 
              "header__link " + ((isActive) ? "header__link--active" : "null")}>
          Inventory
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
