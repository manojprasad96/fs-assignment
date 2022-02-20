import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { CgProfile, CgLogOut } from "react-icons/cg";
import { logout } from "../../actions/auth";
import { ProfileMenuData } from '../../pages/navbar/NavbarData';

const ProfileMenu = styled.div`
    .profile-menu {
        position: absolute;
        top: 65px;
        right: -10px;
        width: 200px;
        padding: 10px 20px;
        box-sizing:0 5px 25px rbg(0,0,0,0.1);
        background-color: #1a83ff;
        transition: 0.5s;
        border-radius: 15px;
        visibility: hidden;
        opacity: 0;
        z-index: 1000;
        > h3 {
            width:100%;
            text-align: center;
            font-size: 18px;
            padding: 20px 0;
            font-weight: 500;
            color: #555;
            line-height:1.2em;
        }
    }
    > .active {
        visibility: visible;
        opacity: 1;
    }
    .profile-menu ::before {
        content: '';
        position: absolute;
        top: -5px;
        right: 40px;
        width: 20px;
        height: 20px;
        background-color: #1a83ff;
        transform: rotate(45deg);
    }
    
`;

const ProfileDropDown = styled.ul`
    > li {
        list-style: none;
        border-top: 1px solid rgba(0,0,0,0.05);
        display: flex;
        align-item: center;
        cursor: pointer;
        > a {
            padding: 10px 25px;
            text-decoration: none;
            display: flex;
            align-items: center;
            color: black;
            > svg {
                max-width: 30px;
                margin-right: 10px;
                transition: 0.5s;
                font-size: 24px;
            }
        }
    }
    > li:hover {
        background-color: #fff;
        border-radius: 4px;
    }
`;

function Profile(props) {
    const myContext = useContext(AppContext);
    const dispatch = useDispatch();

    const username = myContext.user?.username;

    const logOut = () => {
        dispatch(logout());
    };
    return (
        <ProfileMenu>
            <div id="profile-menu" className='profile-menu'>
                <h3>{username.toUpperCase().charAt(0) + username.slice(1)}</h3>
                <ProfileDropDown>
                    <li key={1}>
                        <Link to={"/profile"}
                            onClick={() => {
                                myContext.setTitle("My Profile");
                            }}>
                        <CgProfile /> My Profile</Link>
                    </li>
                    <li key={2}>
                        <Link to={"/login"}
                            onClick={logOut}>
                        <CgLogOut /> Logout</Link>
                    </li>
                </ProfileDropDown>
            </div>
        </ProfileMenu>
    )
}
export default Profile;