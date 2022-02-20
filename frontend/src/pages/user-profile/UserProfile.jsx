import React, { useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const UserProfileWrapper = styled.div`
  z-index: 1;
  padding: 30px 40px;
  text-align: center;
`;

function UserProfile() {
  const myContext = useContext(AppContext);
  if (!myContext.user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <UserProfileWrapper className='product-content'>
          <h2>My profile</h2>
          <div>
                <h5>Username: </h5><span>{myContext.user?.username}</span>
          </div>
      </UserProfileWrapper>
    </>
  )
}

UserProfile.displayName = "UserProfile";

export default UserProfile;