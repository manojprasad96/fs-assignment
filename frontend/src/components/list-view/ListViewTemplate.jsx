import React, { useState } from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { MdModeEdit, MdDeleteForever  } from "react-icons/md";

const ProductContainer = styled.div`
    background-color: #ffffff;
    box-shadow: 0 1px 4px 0 rgb(18 52 77 / 6%);
    border: 1px solid #CFD7DF;
    border-radius: 8px;
    border-left: thick solid #2C5CC5;
    padding: 12px;
    margin: 20px 5px;
    cursor: pointer;
    max-width: calc(100vw - 300px);
    .tag-container {
        display: flex;
        flex-direction: row;
        .tag {
            margin: 4px;
            font-size: 14px;
            font-weight: normal;
            border: 1px solid transparent;
            border-radius: 4px;
            line-height: 18px;
            padding: 2px 9px;
            background-color: #EBEFF3;
            color: #384551;
        }
    }

    .font-secondary {
        font-size: 18px;
    }
    .font-primary {
        font-size: 28px;
    }
    &:hover .action{
        padding: 10px;
        visibility: visible;
        opacity: 1;
    }
    
`;

const ProductOverview = styled.div`
    padding: 12px;
    display: inline-block;
    width: 100%;
    > div {
        text-align: left; 
    }
    .right-block {
        float: right;
        margin-left: 40px;
    }
    .left-block {
        float: left;
        margin-right: 40px;
    }
`;

const ProductDetails = styled.div(
    ({show}) => `
        background-color: #EBEFF3;
        box-shadow: 0px 1px 4px rgb(18 52 77 / 12%);
        border-radius: 6px;
        ${(show ?`
            padding: 15px;
            visibility: visible;
            opacity: 1;
        `:`
            height: 0px;
            padding: 0px;
            visibility: hidden;
            opacity: 0;
            transition: height 500ms;
        `)}

`);

const ProductActions = styled.div`
    display: flex;
    position: relative;
    > button:nth-child(2) > svg {
        color: red;
    }
    justify-content: end;
    padding: 0px;
    visibility: hidden;
    opacity: 0;
    transition: height 500ms;
`;

const ActionButton = styled.button`
    padding: 5px 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #EBEFF3;
    }
`;

const ListViewTemplate = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <>
            <ProductContainer>
                <div onClick={() => {setShowDetails(!showDetails)}}>
                    <ProductOverview>
                        <div className='right-block'>
                            <div className='font-primary'>₹ {props.object.price}</div>
                            <div className='tag-container'>
                            <div className='tag'>Quantity: {props.object.quantity}</div>
                            </div>
                        </div>
                        <div className='left-block'>
                            <div className='font-primary'>{props.object.name}</div>
                            <div className='font-secondary'>{props.object.type}</div>
                        </div>
                    </ProductOverview>
                </div>
                <ProductDetails show={showDetails}>
                    <div className='tag-container'>
                        <div className='tag'>Availabile: {props.object.availability}</div>
                        <div className='tag'>Mfd Date: {props.object.manufacturedDate}</div>
                    </div>
                    <div className='tag-container'>
                        <div className='tag'>Best before: {props.object.validTill}</div>
                    </div>
                </ProductDetails>
                { props.admin && (
                    <ProductActions className='action'>
                            <IconContext.Provider value={{ size: '18px'}}>
                                <ActionButton onClick={() => {props.edit(props.object.productId)}}><MdModeEdit/></ActionButton>
                                <ActionButton onClick={() => {props.delete(props.object.productId)}}><MdDeleteForever/></ActionButton>
                            </IconContext.Provider>
                    </ProductActions>)}
            </ProductContainer>
        </>
    )
}

ListViewTemplate.displayName = "ListViewTemplate";

ListViewTemplate.propTypes = {
    object: PropTypes.object,
    edit: PropTypes.func,
    delete: PropTypes.func,
    admin: PropTypes.bool,
};

ListViewTemplate.defaultProps = {
    object: {},
    admin: false,
};

export default ListViewTemplate;