import React, { Component } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import SelectCurrency from 'react-select-currency'
import styles from './FormStyle.css'
import axios from 'axios'


const cList = countryList().getData()
const selectedCurrency = currency => {
    console.log(currency)
    this.setState({currency})
}
const formErrors ={
    merchantError: '',
    merchantNameError:'',
    merchant_passwordError:'',
    orderIdError:'',
    productError:'',
    priceError:'',
    currencyError: '',
    quantityError:'',
    customError: '',
    amountError:'',
    countryError: '',
    firstnameError:'',
    lastnameError:'',
    addressError: '',
    cityError: '',
    stateCError:'',
    postalcodeError: '',
    mobileError: '',
    emailError:'',
    customer_accError:'',
    customer_idError:''
}
export default class Form extends Component{
    constructor(props) {
        super(props);
        this.state = 
        {
            merchantAccount: '',
            api_user_name: '',
            api_user_password:'',
            orderId:'',
            customer_id:'',
            item_name:'',
            item_price:'',
            currency: '',
            quantity:'',
            custom: '',
            amount:'',
            country: '',
            firstname:'',
            lastname:'',
            email: '',
            mobile: '' 
        }
    }
    isValid = (formErrors) => {
        let valid = false;
        Object.keys(formErrors).values.length > 0 ? valid = false : valid = true;
        return valid;
    }
    handleError=(e)=>{
        console.log("Handle error function called")
        console.log(formErrors)
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.isValid(formErrors)){
            axios({
            method: 'post',
            url: 'https://localhost:7000/pay',
            contentType: "application/json",
            data: JSON.stringify(this.state)
            }).then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    console.error(error)
                });
                
            console.log(this.state)
        }   
    }
   
    handleChange=(e)=>{
        e.preventDefault();
        const emailRegExp = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        const passwordRegExp = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.&[A-Z])[0-9a-zA-Z]{8,}$/)
        const currencyRegex = RegExp(/^(?=.*\d)(?=.&[A-Z])[A-Z]{3,}$/)
        const nameRegExp = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.&[A-Z])[A-Z]{3,}$/)
        const numberRegExp = RegExp(/^(?=.*[0-9]){1,}$/)
        const mobileRegExp = RegExp(/^(\+[1-9]){1}[1-9]{1}[0-9]{13}$/)

        const {name, value} = e.target;
        switch(name){
            case "merchant": 
                formErrors.merchantError = emailRegExp.test(value) ? "Merchant account should be valid email address" : ""; this.state.merchantAccount = value;
            break;
            case "merchant_name": 
                formErrors.merchantNameError = nameRegExp.test(value) || value.length < 3 ? "minmum 3 charachters" :""; this.state.api_user_name = value;
            break;
            case "merchant_password": 
                formErrors.merchant_passwordError = passwordRegExp.test(value) || value.length < 8 ? "minmum 8 charachters" : ""; this.state.api_user_password = value;
            break;
            case "orderId": 
            formErrors.orderIdError = value.length < 4 ? "minmum 4 charachters" : ""; this.state.orderId = value
            break;
            
            case "item_name": 
                formErrors.productError = value.length < 3 ? "minmum 3 charachters" : ""; this.state.item_name = value;
            break;
            case "item_price": 
                formErrors.priceError = numberRegExp.test(value) || value.lenght < 1 ? "enter only numbers" : ""; this.state.item_price = value;
            break;
            case "currency": 
                 formErrors.currencyError = currencyRegex.test(value) || value.length == 3 ? "" : "minimum 3 upercased charachters"; this.state.currency = value;
            break;
            case "quantity": 
                formErrors.quantityError = numberRegExp.test(value) || value.length < 1 ? "only numbers" : ""; this.state.quantity = value;
            break;
            case "custom": 
                 formErrors.customError = value.length < 4 ? "minmum 4 charachters" : ""; this.state.custom = value;
            break;
            case "amount": 
                formErrors.amountError = numberRegExp.test(value) || value.length < 1 ? "only numbers" : ""; this.state.amount = value;
            break;
            case "country": 
                formErrors.countryError = value.length = 2 ? "2 upper cased charachters" :""; this.state.country = value.value;
            break;

            case "firstname": 
                formErrors.firstnameError = nameRegExp.test(value) && value.length < 3 ? "minmum 3 charachters" :""; this.state.firstname = value;
            break;
            case "lastname": 
                formErrors.lastnameError = nameRegExp.test(value) && value.length < 3 ? "minmum 3 charachters" :""; this.state.lastname = value;
            break;
            break;
            case "email": 
                formErrors.email = emailRegExp.test(value) && value.length < 3 ? "minmum 3 charachters" : ""; this.state.email = value;
            break;
            case "mobile": 
            formErrors.mobile = mobileRegExp.test(value) && value.length < 3 ? "invalid mobile number" : ""; this.state.mobile = value;
            break;

            default: 
            break;
        } 
    }
    selectedCurrency = (currency) => {
        this.state.currency = currency;
    }
    handleSelectChange = country => {
        this.state.country=country.value
        this.setState({ country });
        console.log(`Option selected:`, country);
    }

    render(){
        const country = this.state.country;
        return (
            
            <div className="form-content">
               <form className="form" onSubmit={this.handleSubmit}>
                    <h2 className="headline">Express Checkout </h2>
                    <h3 className="info">Merchant Info</h3>
                    <div>
                        <label htmlFor="merchant" className="form-lable">Merchant Account:
                            <input type="email" name="merchant" className="form-input" required={true} placeholder="Merchant Account" onChange={this.handleChange}/>
                        </label>
                   </div>
                   {
                       formErrors.merchantError != null ?(
                        <span className="from-error">{formErrors.merchantError}</span>
                       ):
                       null
                   }
                   <div>
                        <label htmlFor="merchant_name" className="form-lable">Api Username
                            <input type="text" name="merchant_name" className="form-input" required={true} placeholder="API User Name" onChange={this.handleChange}/>
                        </label>
                   </div>
                   {
                       formErrors.merchantNameError != null ?(
                        <span className="from-error">{formErrors.merchantNameError}</span>
                       ):
                       null
                   }
                    <div>
                        <label htmlFor="merchant_password" className="form-lable">Api User Password:
                            <input type="password" name="merchant_password" className="form-input" required={true} placeholder="API User Password" onChange={this.handleChange}/>
                        </label>
                   </div>
                   {
                       formErrors.merchant_passwordError != null ?(
                        <span className="from-error">{formErrors.merchant_passwordError}</span>
                       ):
                       null
                   }
                   
                   <h3 className="info">Order Info</h3>

                   <div>
                        <label htmlFor="orderId" className="form-lable">Order Id:
                            <input type="text" name="orderId" className="form-input" required={true}placeholder="Order Id" onChange={this.handleChange}/>
                        </label>
                   </div>
                   {
                       formErrors.orderIdError != null ? (
                        <div className="from-error">{formErrors.orderIdError}</div>
                       ):
                       null
                   }
                    
                   <div >
                        <label htmlFor="iteme_name" className="form-lable">Product:
                            <input type="text" name="item_name" className="form-input" required={true} placeholder="Product" onChange={this.handleChange}/>
                        </label>
                   </div>
                   {
                       formErrors.productError !=null ?(
                        <div className="from-error">{formErrors.productError}</div>
                       ):
                       null
                   }

                   <div>
                        <label htmlFor="item_price" className="form-lable">Price:
                            <input type="number" name="item_price" className="form-input" required={true} placeholder="Price" onChange={this.handleChange}/>
                        </label>
                   </div>
                   {
                       formErrors.priceError != null ?(
                        <div className="from-error">{formErrors.priceError}</div>
                       ):
                       null
                   }
                   <div>
                        <label htmlFor="quantity" className="form-lable">Quantity:
                            <input type="number" name="quantity" className="form-input" required={true} placeholder="Quantity" onChange={this.handleChange}/>
                        </label>
                   </div>
                   {
                       formErrors.quantityError != null ?(
                        <div className="from-error">{formErrors.quantityError}</div>
                       ):
                       null
                   }
                   
                   <div>
                        <label htmlFor="custom" className="form-lable">Custom:
                            <input type="text" name="custom" className="form-input" placeholder="Custom ID" onChange={this.handleChange}/>
                        </label>
                   </div>
                   {
                       formErrors.customError != null ?(
                        <div className="from-error">{formErrors.customError}</div>
                       ):
                       null
                   }

                   <div>
                        <label htmlFor="amount" className="form-lable">Amount:
                            <input type="number" name="amount" className="form-input" required={true} placeholder="Amount" onChange={this.handleChange}/>
                        </label>
                   </div>
                   {
                       formErrors.amountError != null ?(
                        <div className="from-error">{formErrors.amountError}</div>
                       ):
                       null
                   }
                    <div >
                        <label htmlFor="currency" className="form-lable">Currency:
                            <input name="currency" className="form-input" required={true} type ="text" onChange={this.handleChange} placeholder="ETB"/>
                            
                        </label>
                   </div>
                   {
                       formErrors.currencyError != null?(
                        <div className="from-error">{formErrors.currencyError}</div>
                       ):
                       null
                   }

                    <h3 className="info">Payer Info</h3>

                    <div className="form-input-div">
                        <label htmlFor="country" className="form-lable">Country:
                        <Select  placeholder="---- select country ----" options={cList} onChange={this.handleSelectChange}/>
                        </label>
                    </div>
                    {
                        formErrors.countryError != null ?(
                        <div className="from-error">{formErrors.countryError}</div>
                        ):
                        null
                    }
                    <div>
                        <label htmlFor="firstname" className="form-lable">First name:
                            <input type="text" name="firstname" className="form-input" required={true} placeholder="Firstname" onChange={this.handleChange}/>
                        </label>
                    </div>
                    {
                        formErrors.firstnameError != null ?(
                        <div className="from-error">{formErrors.firstnameError}</div>
                        ):
                        null
                    }

                    <div>
                        <label htmlFor="lastname" className="form-lable">Last name:
                            <input type="text" name="lastname" className="form-input" required={true} placeholder="Lastname" onChange={this.handleChange}/>
                        </label>
                    </div>
                    {
                        formErrors.lastnameError != null ?(
                        <div className="from-error">{formErrors.lastnameError}</div>
                        ):
                        null
                    }
                    <div>
                        <label htmlFor="mobile" className="form-lable">Mobile:
                            <input type="tel" name="mobile" className="form-input" required={true} placeholder="Mobile" onChange={this.handleChange}/>
                        </label>
                    </div>
                    {
                        formErrors.mobileError != null?(
                        <div className="from-error">{formErrors.mobileError}</div>
                        ):
                        null
                    }

                    <div >
                        <label htmlFor="email" className="form-lable">Email:
                            <input type="email" name="email" className="form-input" required={true} placeholder=" Email" onChange={this.handleChange}/>
                        </label>
                    </div>
                    {
                        formErrors.emailError != null ?(
                        <div className="from-error">{formErrors.emailError}</div>
                        ):
                        null
                    }                   

        
                   <button className="form-input-btn" type="submit" onSubmit={this.handleSubmit}>Checkout</button>
                </form>
                
            </div>
        )
    }

    
}
