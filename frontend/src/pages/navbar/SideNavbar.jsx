import React, { useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { SidebarData } from './NavbarData';
import { IconContext } from 'react-icons';
import { HiShoppingBag } from "react-icons/hi";

const Sidebar = styled.ul`
  background-color: #060b26;
  width: 200px;
  height: 100vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index:1;
  padding-left: 0px;
`;

const Logo = styled.li`
  display: flex;
  justify-content: start;
  margin: 2rem 0;
  font-size: 2rem;
  background: none;
`;

const NavMenu = styled.li`
  display: flex;
  justify-content: center;
  > .nav-menu-items {
    width: 100%;
    padding-left: 0px;
  }
  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px;
    list-style: none;
    height: 60px;
    cursor: pointer;
  }
  .nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
    > svg {
      font-size: 2rem;
    }
  }

  .nav-text #active {
    background-color: #1a83ff;
  }

  .nav-text a:hover {
    background-color: #1a83ff;
  }

  span {
    margin-left: 16px;
  }
`;

function SideNavbar() {
  const myContext = useContext(AppContext);
  const navbarData = SidebarData(myContext.admin);
  return (
    <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <Sidebar>
              <Logo>
                <HiShoppingBag />
              </Logo>
              <NavMenu>
                <ul className='nav-menu-items'>
                  {navbarData.map((item, index) => {
                    return (
                      <li key={index} 
                          className={item.cName}>
                        <Link to={item.path} onClick={() => {
                            myContext.setTitle(item.title);
                          }}
                          id={ myContext.title === item.title ? "active": ""}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </NavMenu>
          </Sidebar>
        </IconContext.Provider>
    </>
  );
}
SideNavbar.displayName = "SideNavbar";

export default SideNavbar;