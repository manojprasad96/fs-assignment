import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { connect } from "react-redux";
import { isEqual } from 'lodash';
import { IconContext } from 'react-icons';
import DatePicker from "react-datepicker";
import Select from "react-dropdown-select";
import "react-datepicker/dist/react-datepicker.css";
import { updateProduct, findProductsById, deleteProduct } from "../../actions/products";
import { DataTable } from '../../components';
import { MdModeEdit, MdDeleteForever  } from "react-icons/md";
import ProductModal from "../modal/ProductModal";
import { epochToDMY, getTimeUnitAndCount, generateTypesOpt } from "../../utils/utils";
import ListView from '../../components/list-view/ListView';
import { DATA_TABLE_ACTIONS, BEFORE_AFTER_OPTS } from "../../utils/constant";

const ActionWrapper = styled.div`
    display: flex;
    > button:nth-child(2) > svg {
        color: red;
    }
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

const Filtercontainer = styled.div`
    margin: 10px;
    .filter-header{
        text-align: left;
    }
    .table-content {
        margin-top: 20px;
        overflow-y: scroll;
        max-height: calc(100vh - 468px);
    }
`;

const FilterBox = styled.div`
    display: flex;
    font-size: 16px;
    flex-direction: row;
    text-align: left;
    > div:nth-child(1) {
        margin-right: 20px; 
    }
    > div {
        display: flex;
        flex-direction: row;
        margin: 10px 0px; 
        > label {
            margin-right: 20px;
            padding: 6px 0px;
            line-height: 20px;
        }
        > div {
            display: flex;
            .type-filter {
                width: 200px;
                padding: 0px 5px;
                height: 6px;
            }
            .mfd-filter {
                width: 100px;
                padding: 0px 5px;
                height: 6px;
            }
            .react-datepicker-wrapper {
                margin-left: 20px;
                input {
                    border-color: #ccc;
                    line-height: 1rem;
                    padding: 17px 5px;
                    height: 6px;
                    border: 1px solid #ccc;
                    border-radius: 2px;
                }
            }
        }
    }
`;

const ProductDetails = styled.div `
        background-color: #EBEFF3;
        box-shadow: 0px 1px 4px rgb(18 52 77 / 12%);
        border-radius: 6px;
        padding: 16px 50px;
        visibility: visible;
        opacity: 1;
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
`;

const buildValidityRow = (timediff) => {
    const { unit, count} = getTimeUnitAndCount(timediff);
    return (<>{count}&nbsp;{unit}</>);
}

const ExpandedComponent = ({ data }) => (<ProductDetails >
    <div className='tag-container'>
        <div className='tag'>Availabile: {data.availability}</div>
        <div className='tag'>Mfd Date: {epochToDMY(data.manufacturedDate)}</div>
    </div>
    <div className='tag-container'>
        <div className='tag'>Best before: {buildValidityRow(data.validTill)}</div>
    </div>
</ProductDetails>);

const generateColumns = (editAction, deleteAction, admin) => {
    return [
        {
            name: 'Product name',
            selector: row => row.name,
        },
        {
            name: 'Product type',
            selector: row => row.type,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Action',
            omit: !admin,
            selector: row => (<ActionWrapper className={DATA_TABLE_ACTIONS}>
                <IconContext.Provider value={{ size: '18px'}}>
                    <ActionButton onClick={() => {editAction(row.productId)}}><MdModeEdit/></ActionButton>
                    <ActionButton onClick={() => {deleteAction(row.productId)}}><MdDeleteForever/></ActionButton>
                </IconContext.Provider>
            </ActionWrapper>)
        }
    ];

}

const generateProductTypes = (types) => {
    return [{ 
        "label": "Any", 
        "value": null
    }, ...generateTypesOpt(types)]
}

class ProductView extends React.Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.onChangeTypeFilter = this.onChangeTypeFilter.bind(this);
        this.onChangeMfdOpValue = this.onChangeMfdOpValue.bind(this);
        this.getMfdOpFilterValue = this.getMfdOpFilterValue.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            product: {},
            isModalOpen: false,
            typeFilter: null,
            mfdOpFilter: "before",
            mfdFilterVal: Date.now()
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.products[this.props.listKey], prevProps.products[this.props.listKey])) {
            this.fetchData();
        }
    }

    fetchData = () => {
        this.props.findByTypeAndMFD(this.state.typeFilter, this.state.mfdFilterVal, this.state.mfdOpFilter);
    }

    onChangeTypeFilter(val) {
        this.setState({
            typeFilter: val,
        });
        this.props.findByTypeAndMFD(val, this.state.mfdFilterVal, this.state.mfdOpFilter);
    }

    onChangeMfdFilter(date) {
        const val = date.getTime();
        this.setState({
            mfdFilterVal: val,
        });
        this.props.findByTypeAndMFD(this.state.typeFilter, val, this.state.mfdOpFilter);
    }

    onChangeMfdOpValue(val) {
        this.setState({
            mfdOpFilter: val,
        });
        this.props.findByTypeAndMFD(this.state.typeFilter, this.state.mfdFilterVal, val);
    }

    openModal(val) {
        this.setState({
            isModalOpen: val,
        });
    }

    editProduct = (id) => {
        this.props
            .findProductsById(id)
            .finally(() => {
                const { product } = this.props;
                this.setState({ 
                    product: product
                });
                this.openModal(true);
            });
    }

    deleteProduct(id) {
        this.props.deleteProduct(id);
    }

    getMfdOpFilterValue(value) {
        return [{
            "label": value[0].toUpperCase()+ value.slice(1),
            "value": value
        }]
    };

    render() {
        let lists = [];
        const { types, products, listKey } = this.props;
        const productTypes = generateProductTypes(types);
        const typeSelectVal = productTypes.find(o => o.name === this.state.typeFilter);
        if (Array.isArray(products[listKey]) && products[listKey] !== null) {
            lists = products[listKey];
        }
        return (
            <> 
                <Filtercontainer>
                    <div className='filter-header'>Filter By: &nbsp;</div>
                    <FilterBox>
                        <div>
                            <label>Type:</label>
                            <Select
                                multi={false} 
                                required={true} 
                                searchable={true}
                                options={productTypes}
                                values={typeSelectVal || [productTypes[0]]} 
                                onChange={(values) => this.onChangeTypeFilter(values[0].value)} 
                                className={'small type-filter'}/>
                        </div>
                        <div>
                            <label>Manufacturing date:</label>
                            <div>
                                <Select 
                                    multi={false} 
                                    required={true} 
                                    searchable={true}
                                    options={BEFORE_AFTER_OPTS}
                                    values={this.getMfdOpFilterValue(this.state.mfdOpFilter)} 
                                    onChange={(values) => this.onChangeMfdOpValue(values[0].value)}
                                    className={'small mfd-filter'}/>
                                <DatePicker 
                                    selected={this.state.mfdFilterVal}
                                    onChange={(date) => this.onChangeMfdFilter(date)}
                                    placeholderText='Manufacturing date'/>
                            </div>
                        </div>  
                    </FilterBox>
                    <div className='table-content'>
                    {this.props.view ? 
                        (<ListView 
                            lists={lists}
                            edit={this.editProduct}
                            delete={this.deleteProduct}
                            admin={this.props.admin}/>) 
                        : 
                        (<DataTable 
                            columns={generateColumns(this.editProduct, this.deleteProduct, this.props.admin)}
                            data={lists}
                            expandedComponent={ExpandedComponent}
                            actionClassName={DATA_TABLE_ACTIONS}/>) 
                        }
                    </div>
                </Filtercontainer>

                <ProductModal
                        isOpen={this.state.isModalOpen} 
                        edit={true}
                        product={this.state.product}
                        onCancelCallback={() => {
                            this.openModal(false);
                        }}
                        onSubmitCallback={this.props.updateProduct}/>
            </>
        );
    }

}

ProductView.displayName = "ProductView";

ProductView.propTypes = {
    view: PropTypes.bool,
    listKey: PropTypes.string,
    retrieveProducts: PropTypes.func,
    findByTypeAndMFD: PropTypes.func,
    admin: PropTypes.bool,
};

ProductView.defaultProps = {
    view: false,
    listKey: "valid",
    admin: false,
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        product: state.products.object,
        types: state.products.types,
    };
}

export default connect(mapStateToProps,{
    updateProduct,
    findProductsById,
    deleteProduct,
  })(ProductView);