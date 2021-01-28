import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import PaymentBraintree from './PaymentBraintree';

// import StripeCheckout from './StripeCheckout';




const  Cart=()=> {

        const [products, setProducts] = useState([]);

        const [reload, setReload] = useState(false);


        useEffect(() => {
            setProducts(loadCart());
        }, [reload])

        const ShowProducts=()=>{
            return <div>
                <h2>show all the Products</h2>
            {
                products.map((product,index)=>{
                  return  <Card 
                    key={index}
                    product={product}
                    addtoCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                    
                    />
                })
            }
            </div>
        }


        
const ShowCheckout=()=>{
    return <div>
        <h2> all the Checkouts work.</h2>
        {/* <StripeCheckout products={products} setReload={setReload}/> */}
       { isAuthenticated() ?(

        <PaymentBraintree products={products} setReload={setReload} ></PaymentBraintree>

        ) :(
            <Link to="/signin">
                <button className="btn btn-danger btn-block">Signin</button>
            </Link>
        ) }
    </div>
}






    return (
        <div>
            <Base title="Cart page" description="this is the cart page.....">
                <div className="row text-center">
                    <div className="col-md-6">{products.length>0 ? ShowProducts() : (<h3>no products available</h3>)}</div>
                    <div className="col-md-6">{ShowCheckout()}</div>
                </div>
            </Base>
        </div>
    )
}
export default Cart;
