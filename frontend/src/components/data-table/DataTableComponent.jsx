import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import DataTable from 'react-data-table-component';

const DataTableWrapper = styled.div`
    .rdt_TableHeadRow {
        background-color: #F5F7F9;
    }
    .rdt_TableRow:hover {
        background-color: #F5F7F9;
    }
    .rdt_TableRow > div:nth-child(7) {
        visibility: hidden;
        opacity: 0;
    }
    .rdt_TableRow:hover {
        > div:nth-child(7) {
            visibility: visible;
            opacity: 1;
        }
    }
`;

function DataTableComponent(props) {
    return (
        <DataTableWrapper>
            <DataTable
                columns={props.columns}
                data={props.data}
                pagination
                expandableRows
                expandableRowsComponent={props.expandedComponent}
            />
        </DataTableWrapper>
    );
};

DataTableComponent.displayName = "DataTableComponent";

DataTableComponent.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    expandedComponent: PropTypes.func,
};

DataTableComponent.defaultProps = {
    columns: [],
    data: [],
};

export default DataTableComponent;