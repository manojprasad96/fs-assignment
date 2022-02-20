import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { uid } from "react-uid";
import ListViewTemplate from './ListViewTemplate';

const ListContainer = styled.div`
    overflow-y: scroll;
    max-height: calc(100vh - 468px);
    .empty-container {
        text-align: center;
        padding: 24px;
    }
`;

function ListView(props) {
  return (
    <>
        <ListContainer>
            {(props.lists.length === 0) && (<div className='empty-container'>There are no records to display</div>)}
            {props.lists.map( (product) => (
                <ListViewTemplate
                    key={uid(product)}
                    object={product}
                    edit={props.edit}
                    delete={props.delete}
                    admin={props.admin}/>
            ))}
        </ListContainer>
    </>
  )
}

ListView.displayName = "ListView";

ListView.propTypes = {
    lists: PropTypes.array,
    edit: PropTypes.func,
    delete: PropTypes.func,
    admin: PropTypes.bool,
};

ListView.defaultProps = {
    lists: [],
    admin: false,
};

export default ListView;