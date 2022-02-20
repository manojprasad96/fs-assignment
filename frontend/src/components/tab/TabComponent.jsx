import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tab from './Tab';

const TabContainer = styled.div`
    .tab-list {
        border-bottom: 1px solid #ccc;
    }
    .tab-list-item {
        display: inline-block;
        list-style: none;
        margin-bottom: -1px;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        &:hover {
            background-color: #F5F7F9;
        }
    }
  
    .tab-list-active {
        background-color: white;
        border: solid #ccc;
        border-width: 1px 1px 0 1px;
    }
`;

class TabComponent extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }
  
    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;
    
        return (
            <TabContainer className="tabs">
                <ol className="tab-list">
                {children.map((child) => {
                    const { label } = child.props;
        
                    return (
                    <Tab
                        activeTab={activeTab}
                        key={label}
                        label={label}
                        onClick={onClickTabItem}
                    />
                    );
                })}
                </ol>
                <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </div>
            </TabContainer>
        );
      }
}

TabComponent.propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
}

export default TabComponent;