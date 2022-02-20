import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { ToggleBtn } from '../../components';
import ProductView from '../common/ProductView';
import { retrieveValidProducts, findValidByTypeAndMFD } from "../../actions/products";
import AppContext from '../../context/AppContext';

const HomeWrapper = styled.div`
  z-index: 1;
  padding: 30px 40px;
  text-align: center;
`;

const ToggleView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    > label {
      font-size: 20px;
      padding-right: 20px;
    }
`;

const ProductViewContainer = styled.div`
    margin-top: 0px;
`;

function Home(props) {
  const myContext = useContext(AppContext);
  const [view, setView] = useState(false);
  if (!myContext.user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
        <HomeWrapper className='product-content'>
            <h2>Products available</h2>
            <ToggleView >
                <label>Toggle view:</label>
                <ToggleBtn
                    label={"Toggle view"}
                    checked={view}
                    handleToggle={() => setView(!view)}/>
            </ToggleView>
            <ProductViewContainer>
              <ProductView
                  view={view}
                  listKey={"valid"}
                  retrieveProducts={props.retrieveValidProducts}
                  findByTypeAndMFD={props.findValidByTypeAndMFD}
                  admin={myContext.admin}
                  />
            </ProductViewContainer>
        </HomeWrapper>
    </>
  )
}

Home.displayName = "Home";

export default connect(null, {
  retrieveValidProducts,
  findValidByTypeAndMFD,
})(Home);