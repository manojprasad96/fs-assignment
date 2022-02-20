import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { IoMdSettings } from 'react-icons/io';
import { CgProfile, CgLogOut } from "react-icons/cg";

const SidebarData = (admin) => {
  let data = [
    {
      title: 'Home',
      path: '/home',
      icon: <AiFillHome />,
      cName: 'nav-text'
    }
  ];
  if (admin) {
      data.push({
        title: 'Settings',
        path: '/settings',
        icon: <IoMdSettings />,
        cName: 'nav-text'
      });
  }
  return data;
}

const ProfileMenuData = [
  {
    title: 'My Profile',
    path: '/profile',
    icon: <CgProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/login',
    icon: <CgLogOut />,
    cName: 'nav-text'
  }
];

const NavbarData = (admin) => { return [...SidebarData(admin), ...ProfileMenuData]};

export {
  SidebarData,
  ProfileMenuData,
  NavbarData
}

