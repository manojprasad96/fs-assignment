import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';
import { find, isUndefined, isEmpty } from 'lodash';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import DatePicker from "react-datepicker";
import Select from "react-dropdown-select";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from '../../components';
import { getTimeUnitAndCount, generateTypesOpt } from "../../utils/utils";
import { periodOpts } from "../../utils/constant";

const ProductForm = styled.div`
    > div:nth-child(1) {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        color: #12344D;
        line-height: 36px;
        margin: 12px 40px 24px 40px;
    }
    .form-group > label {
        margin-bottom: 5px;
        display: flex;
        justify-content: left;
        > span {
            color: #D72D30 !important;
        }
    }
    .form-group >  div > input {
        margin-bottom: 5px;
    }
    .alert {
        padding: 0px;
    }
    .react-datepicker__input-container {
        display: flex;
        > input {
            flex:1;
            border: 1px solid #CFD7DF;
            background-color: #ffffff;
            box-shadow: inset 0 1px 2px 0 rgb(24 50 71 / 5%);
            padding: 5px 12px;
            min-height: 32px;
            border-radius: 4px;
            line-height: 20px;
            color: #12344D;
            &::placeholder {
                color: #92A2B1;
            }
        }
    }
    .text-input {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        flex-basis: 100%;
        margin-bottom: 10px;
        > input {
            flex:1;
            border: 1px solid #CFD7DF;
            background-color: #ffffff;
            box-shadow: inset 0 1px 2px 0 rgb(24 50 71 / 5%);
            padding: 5px 12px;
            min-height: 32px;
            border-radius: 4px;
            line-height: 20px;
            color: #12344D;
            &::placeholder {
                color: #92A2B1;
            }
        }
        > div:nth-child(1) {
            flex:1;
        }
    }
`;
const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

class ProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeManufacturedDate = this.onChangeManufacturedDate.bind(this);
        this.onChangeValidTill = this.onChangeValidTill.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.resetState = this.resetState.bind(this);
        this.setProductState = this.setProductState.bind(this);
        this.form = React.createRef();
        this.checkBtn = React.createRef();
        this.state = {
            id: null,
            name: "",
            type: "",
            quantity: undefined,
            availability: undefined,
            price: undefined,
            manufacturedDate: Date.now(),
            validTill: undefined,
            validUnit: "Days",
            message: "",
            typeInputError: false,
            mfdInputError: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.edit === true &&
            this.props.isOpen !== prevProps.isOpen &&
            this.props.isOpen === true ) {
            this.setProductState(this.props.product);
        }
    }

    setProductState(product) {
        if (isUndefined(product) && isEmpty(product)) {
            return;
        }
        const { unit, count} = getTimeUnitAndCount(product.validTill);
        this.setState({
            id: product.productId,
            name: product.name,
            type: product.type,
            quantity: product.quantity,
            availability: product.availability,
            price: product.price,
            manufacturedDate: product.manufacturedDate,
            validTill: count,
            validUnit: unit
        });
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value,
        });
      }

    onChangeType(type) {
        this.onChangeTypeInputError(false);
        this.setState({
            type: type,
        });
    }
    onChangeQuantity(e) {
        this.setState({
          quantity: e.target.value,
        });
      }

    onChangeAvailability(e) {
        this.setState({
            availability: e.target.value,
        });
    }
    onChangePrice(e) {
        this.setState({
          price: e.target.value,
        });
      }

    onChangeManufacturedDate(date) {
        this.onChangeMfdInputError(false);
        this.setState({
            manufacturedDate: date.getTime()
        });
    }
    onChangeValidTill(e) {
        this.setState({
          validTill: e.target.value
        });
      }

    onChangeValidUnit(label) {
        this.setState({
            validUnit: label,
        });
    }

    onChangeTypeInputError(value) {
        this.setState({
            typeInputError: value,
        });
    }

    onChangeMfdInputError(value) {
        this.setState({
            mfdInputError: value,
        });
    }

    onSubmit(e) {
        this.form.current.validateAll();
        if (this.state.type === "") {
            this.onChangeTypeInputError(true);
            return;
        }
        if (this.state.manufacturedDate === null) {
            this.onChangeMfdInputError(true);
            return;
        }
        if (this.checkBtn.current.context._errors.length === 0) {
            const unit = find(periodOpts, {"label": this.state.validUnit});
            let payload = {
                "name": this.state.name,
                "type": this.state.type,
                "quantity": this.state.quantity,
                "availability": this.state.availability,
                "price": this.state.price,
                "manufacturedDate": this.state.manufacturedDate,
                "validTill": unit.value * this.state.validTill,
            };
            if (this.props.edit ) {
                payload = [this.state.id, payload];
                this.props.onSubmitCallback(...payload)
                    .finally(()=> {
                        this.resetState();
                        this.props.onCancelCallback();
                    });
            } else{
                this.props.onSubmitCallback(payload)
                    .finally(()=> {
                        this.resetState();
                        this.props.onCancelCallback();
                    });
            }
        }
    }

    onCancel() {
        this.resetState();
        this.props.onCancelCallback();
    }   

    resetState() {
        this.setState({
            id: null,
            name: "",
            type: "",
            quantity: undefined,
            availability: undefined,
            price: undefined,
            manufacturedDate: Date.now(),
            validTill: undefined,
            validUnit: "Days",
            message: "",
            typeInputError: false,
            mfdInputError: false
        });
    }
    render() {
        const { types } = this.props;
        const productTypes = generateTypesOpt(types);
        return (
        <>
            <Modal 
                isOpen={this.props.isOpen} 
                onCancel={() => this.onCancel()}
                onSubmit={() => this.onSubmit()}>
                <ProductForm>
                    <div>{this.props.edit ? "Edit product" : "Add product"}</div>
                    <Form ref={this.form}>
                        <div className="form-group">
                            <label htmlFor="productName">Product name <span>*</span></label>
                            <Input
                            type="text"
                            className="form-control"
                            name="productName"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            placeholder='Product name'
                            validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productType">Product type <span>*</span></label>
                            <div className='text-input'>
                                <Select 
                                    multi={false} 
                                    required={true} 
                                    searchable={true}
                                    options={productTypes}
                                    values={[{"label": this.state.type, "value": this.state.type}]} 
                                    onChange={(values) => this.onChangeType(values[0].label)} 
                                    placeholder='Product type'
                                    className='select-input'
                                    validations={[required]}/>
                            </div>
                            { this.state.typeInputError && (<div className="alert alert-danger" role="alert">
                                    This field is required!
                                </div>)}
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity <span>*</span></label>
                            <Input
                                type="number"
                                className="form-control"
                                name="quantity"
                                value={this.state.quantity}
                                onChange={this.onChangeQuantity}
                                placeholder='Quantity'
                                validations={[required]}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Availability <span>*</span></label>
                            <Input
                                type="number"
                                className="form-control"
                                name="quantity"
                                value={this.state.availability}
                                onChange={this.onChangeAvailability}
                                placeholder='Availability'
                                validations={[required]}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price <span>*</span></label>
                            <Input
                                type="number"
                                className="form-control"
                                name="price"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                placeholder='Price'
                                validations={[required]}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="manufacturingDate">Manufacturing date <span>*</span></label>
                            <div className='text-input'>
                                <DatePicker 
                                    selected={this.state.manufacturedDate}
                                    onChange={(date) => this.onChangeManufacturedDate(date)}
                                    required={true}
                                    placeholderText='Manufacturing date'/>
                            </div>
                            { this.state.mfdInputError && (<div className="alert alert-danger" role="alert">
                                    This field is required!
                            </div>)}
                        </div>
                        <div className="form-group">
                            <label htmlFor="validTill">Valid till <span>*</span></label>
                            <div className='text-input'>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="validTill"
                                    value={this.state.validTill}
                                    onChange={this.onChangeValidTill}
                                    placeholder='Valid till'
                                    validations={[required]}
                                    />
                                <Select 
                                    multi={false} 
                                    required={true} 
                                    searchable={false}
                                    values={periodOpts.filter(option => 
                                        option.label === this.state.validUnit)}
                                    options={periodOpts} 
                                    onChange={(values) => this.onChangeValidUnit(values[0].label)} />
                            </div>
                        </div>
                        {this.state.message && (
                            <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={this.checkBtn} />
                    </Form>
                </ProductForm>
            </Modal>
        </>
        );
      }

}

ProductModal.displayName = "ProductView";

ProductModal.propTypes = {
    isOpen: PropTypes.bool,
    edit: PropTypes.bool,
    product: PropTypes.object,
    onCancelCallback: PropTypes.func,
    onSubmitCallback: PropTypes.func,
};

ProductModal.defaultProps = {
    isOpen: false,
    edit: false,
    product: {},
};
const mapStateToProps = (state) => {
    return {
        types: state.products.types,
    };
}

export default connect(mapStateToProps,null)(ProductModal);