import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { createProduct } from "../../actions/products";
import Profile from '../../components/profile/Profile';
import ProductModal from '../modal/ProductModal';
import AppContext from '../../context/AppContext';
import { NavbarData } from './NavbarData';
import { MdAddCircle } from "react-icons/md";
import { getProductTypes } from "../../actions/products";


const Topbar = styled.nav`
    background-color: #343a40;
    position: fixed;
    top: 0;
    right:0;
    left: 200px;
    z-index: 1;
    height: 70px;
    width: calc(100vw - 200px);
    display: inline-block;
    align-items: center;
    padding: 20px 25px;
    .topbar-title {
        color: #fff;
        font-size: 24px;
        float: left;
    }
    .topbar-add-button {
        display: flex;
        border-radius: 6px;
        padding: 0px 10px;
        margin-right: 30px;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        > svg {
            font-size: 20px;
        }
        > span {
            margin-left: 5px;
            font-size: 16px;
        }
    }
    .topbar-profile-icon {
        width: 32px;
        height: 32px;
        border-radius: 100px;
        background: #1a83ff;
        cursor: pointer;
        > #name {
            width: 100%;
            text-align: center;
            color: white;
            font-size: 24px;
            line-height: 32px;
            position: relative;
            top: 0px;
        }
    }
    > div:nth-child(2) {
        float: right;
        display: flex;
        justify-content: space-between;
    }
    .form-field {
        margin-bottom: 10px;
    }
`;

function TopNavbar(props) {
    const myContext = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (window.location.pathname !== 'logout') {
            let navbarData = NavbarData(myContext.admin);
            let data  = navbarData.find(obj => {
                return obj.path === window.location.pathname;
              });
            if (!myContext && myContext.title !== data.title) {
                myContext.setTitle(data.title);
            }
        }
    });

    useEffect(() => {
        props.getProductTypes();
    }, [props.getProductTypes]);
    
  return (
    <>
        <Topbar>
            <div className='topbar-title'>{myContext.title}</div>
            <div>
                { myContext.admin && 
                    (<button className='topbar-add-button' 
                                onClick={() => {
                                    setIsModalOpen(!isModalOpen)
                                }}>
                        <MdAddCircle/> <span>Add Product</span>
                    </button>)}
                <div className='topbar-profile-icon'
                        onClick={() => {
                            const profileMenu  = document.querySelector('#profile-menu');
                            profileMenu.classList.toggle('active');
                        }} id="profile-icon">
                    <div id="name">
                        {myContext.user?.username.toUpperCase().charAt(0)}
                    </div>
                </div>
                <Profile/>
            </div>
            <ProductModal isOpen={isModalOpen}
                onCancelCallback={() => {
                    setIsModalOpen(false);
                }}
                onSubmitCallback={props.createProduct}/>
        </Topbar>
    </>
  )
};

TopNavbar.displayName = "TopNavbar";

const mapStateToProps = (state) => {
    return {
        types: state.products.types,
    };
}

export default connect(mapStateToProps, { createProduct, getProductTypes })(TopNavbar);