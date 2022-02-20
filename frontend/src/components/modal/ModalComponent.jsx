import React from 'react';
import styled, { keyframes } from 'styled-components';

const modalSizes = {
    sm: "424px",
    md: "512px",
    lg: "600px",
    xl: "800px",
};

const fade = keyframes`
    0% {
        opacity: .4
    }
    50% {
        opacity: 1
    }
`;

const topToBottomFade = keyframes`
    0% {
        top: -50%
    }
    50% {
        top: 0
    }
`;


const ModalWrapper= styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(18, 52, 77, 0.8);
    transition: opacity 1s linear;
    animation: ${fade} 0.5s;
`;

const ModalContent = styled.div`
    min-width: ${props => modalSizes[props.size]};
    max-width: ${props => modalSizes[props.size]};
    margin: auto;
    background-color: #ffffff;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 18px 0 rgba(18, 52, 77, 0.2);
    animation: ${topToBottomFade} 0.5s;
    position: relative;
    top: 0;
`;

const ModalIcon = styled.span`
    position: absolute;
    left: 32px;
    top: ${ props => {
        if (props.titleIcon === "circle-check") {
            return '38px';
        }
        return '32px';
    }}
`;


const ModalTitle = styled.div`
    ${props => (props.titleIcon ? "padding: 36px 32px 32px 76px" : "padding: 32px")};
    background-color: #fff;
`;

const ModalTitleHeader = styled.div`
    margin-bottom: 4px;
`;

const ModalFooter = styled.div`
    padding: 16px;
    border-radius: 0 0 4px 4px;
    background-color: #f5f7f9;
    text-align: right;
    button + button {
        margin-left: 10px;
    }
`;

const CancelBtn = styled.button`
    padding: 5px 10px;
    border-radius: 6px;
    background-color: #e9ecef;
    border-color: #e9ecef;
    cursor: pointer;
    line-height: 1.5;
    font-size: 16px;
`;

const SubmitBtn = styled.button`
    border-radius: 6px;
    padding: 5px 10px;
    color: #fff;
    background-color: #0e6efd;
    border-color: #0d6efd;
    cursor: pointer;
    line-height: 1.5;
    font-size: 16px;
`;

const ModalComponent = (props) => {
    return (
        <>
            {props.isOpen === true && (
                <ModalWrapper priority={999}>
                    <ModalContent size={"sm"}>
                        {props.titleIcon && (
                            <ModalIcon titleIcon={props.titleIcon}>
                            </ModalIcon>
                        )}
                        <ModalTitle titleIcon={props.titleIcon}>
                            <ModalTitleHeader>

                            </ModalTitleHeader>
                            {props.children}
                        </ModalTitle>
                        <ModalFooter>
                            <CancelBtn onClick={props.onCancel}>Cancel</CancelBtn>
                            <SubmitBtn onClick={props.onSubmit}>Submit</SubmitBtn>
                        </ModalFooter>
                    </ModalContent>
                </ModalWrapper>
            )}
        </>
    );
};

export default ModalComponent;