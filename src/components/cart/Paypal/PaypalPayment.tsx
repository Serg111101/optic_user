import { CLIENT_ID } from '../../../Config/Config'
import React, { useState, useEffect } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import '../cart.scss'


const PaypalCheckout = () => {
    const [success, setSuccess] = useState(false);
    // const [ErrorMessage, setErrorMessage] = useState(" ");
    const [orderID, setOrderID] = useState(false);
    const nav = useNavigate()

    // creates a paypal order
    const createOrder = (data:any, actions:any) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "ok",
                    amount: {
                        currency_code: "USD",
                        value: 25,
                    },
                },
            ],
        }).then((orderID:any) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data:any, actions:any) => {
        return actions.order.capture().then(function (details:any) {
            const { payer } = details;
            console.log(payer);
            setSuccess(true);
        });
    };

    //capture likely error
    // const onError = (data:any, actions:any) => {
    //     setErrorMessage("An Error occured with your payment ");
    // };

    useEffect(() => {
        if (success) {
            console.log('Order successful . Your order id is--', orderID);
            nav("/Completion")
        }
    },[success, orderID, nav]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div className='formpay' id="payment-form" >
                <div className="wrapper">
                    <div className="product-img">
                      
                    </div>
                    <div className="product-info">
                        <div className="product-text">
                            <h1>Payment in PayPal</h1>
                        </div>
                        <div className="product-price-btn">
                            <p>Order price: $25</p>
                            <br></br>
                            
                        </div>
                    </div>
                </div>
                <br></br>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
            </div>
        </PayPalScriptProvider>
    );
}


export default PaypalCheckout