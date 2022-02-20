import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { ToggleBtn, Tabs } from '../../components';
import ProductView from '../common/ProductView';
import { retrieveValidProducts, findValidByTypeAndMFD, 
            retrieveExpiredProducts, findExpiredByTypeAndMFD } from "../../actions/products";
import AppContext from '../../context/AppContext';

const SettingsWrapper = styled.div`
    text-align: center;
    .setting-tab {
        padding: 24px;
    }
    .product-list {
        margin-top: 20px;
    }
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


function Settings(props) {
  const myContext = useContext(AppContext);
  const [viewValid, setViewValid] = useState(false);
  const [viewExpired, setViewExpired] = useState(false);
  return (
    <> 
      <SettingsWrapper className='product-content'>
        <h2>Manage Products</h2>
        <div className='setting-tab'>
          <Tabs>
              <div label="Valid products">
                <div>
                  <ToggleView >
                    <label>Toggle view:</label>
                    <ToggleBtn
                        label={"Toggle view"}
                        checked={viewValid}
                        handleToggle={() => setViewValid(!viewValid)}/>
                  </ToggleView>
                  <div className='product-list' id="valid-field">
                    <ProductView
                      view={viewValid}
                      listKey={"valid"}
                      retrieveProducts={props.retrieveValidProducts}
                      findByTypeAndMFD={props.findValidByTypeAndMFD}
                      admin={myContext.admin}
                      />
                  </div>
                </div>
              </div>
              <div label="Expired products">
                  <div>
                      <ToggleView >
                          <label>Toggle view:</label>
                          <ToggleBtn
                              label={"Toggle view"}
                              checked={viewExpired}
                              handleToggle={() => setViewExpired(!viewExpired)}/>
                      </ToggleView>
                      <div className='product-list' id="expired-field">
                        <ProductView
                          view={viewExpired}
                          listKey={"expired"}
                          retrieveProducts={props.retrieveExpiredProducts}
                          findByTypeAndMFD={props.findExpiredByTypeAndMFD}
                          admin={myContext.admin}
                          />
                      </div>
                  </div>
              </div>
          </Tabs>
        </div>
      </SettingsWrapper>  
    </>
  )
}
Settings.displayName = "Settings";

export default connect(null, {
  retrieveValidProducts,
  findValidByTypeAndMFD,
  retrieveExpiredProducts,
  findExpiredByTypeAndMFD,
})(Settings);