import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';


 const StripeCheckout=({products,setReload=f=>f,reload=undefined})=> {


    // createOrder

    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const token=isAuthenticated() && isAuthenticated().token
    const userId=isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice=()=>{
       let amount=0;
       products.map(p=>{
           amount=amount+p.price;
       })
       return amount;
    }


    const makePayment=token=>{
        const body={
            token,
            products,
        }
        const headers={
            "Content-Type":"application/json",
            "accept":"application/json"
        }
        return fetch(`${API}/stripepayment`,
        {
            method:"POST",
            headers,
            body:JSON.stringify(body)

        }
         ).then((response) => {
             console.log(response)
             console.log(token)
         }).catch((err) => {
             console.log(err)
         });
    }
// {process.env.REACT_APP_STRIPE_KEY}
// {process.env.REACT_APP_STRIPE_KEY}
    const showStripeButton=()=>{
        return isAuthenticated() ?(
            <StripeCheckoutButton token={makePayment} stripeKey='pk_test_51I16H2FCuedeLqrA36remCWly0uK8YMaRQwgKS7tNEjSJ3J6lHM1ip53e1spvMHmNUGDX88U6FH6LRHGhfBYp71J00MTWkSLvu' amount={getFinalPrice()*100} name="Buy Tshirts" shippingAddress billingAddress>
                <button className="btn btn-outline-primary ">Pay Using Stripe</button>
            </StripeCheckoutButton>
           


        ) :(
            <Link to="/signin">
                <button className="btn btn-danger">Signin</button>
            </Link>
        )
    }

    

    return (
        <div>
            <div className="text-white">
                <h3>this is cart  {getFinalPrice()}</h3>
                {showStripeButton()}
            </div>
        </div>
    )
}

export default  StripeCheckout;