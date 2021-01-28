import DropIn from 'braintree-web-drop-in-react';
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { createOrder } from './helper/orderHelper';
import { getmeToken, processPayment } from './helper/paymentBraintreehelper';



const PaymentBraintree=({products,setReload=f=>f,reload=undefined})=> {
     
    

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
      });

    const userId=isAuthenticated() && isAuthenticated().user._id;
    const token=isAuthenticated() && isAuthenticated().token;


    const getToken=(token,userId)=>{
        // 
        getmeToken(token,userId).then((info) => {
            console.log(info);
          
            
            if(info.error){
                setInfo({...info,error:info.error})
            }
            else{
                const clientToken=info.clientToken;
                setInfo({clientToken})
            }
        })
    }


    const showbtDropin=()=>{
        return(
            <div>
                {info.clientToken !== null && products.length>0 ?(
                    <div>
                       <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={instance => (info.instance = instance)}
          />
                    <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>
                    </div>
                ) : (<h3 className="">Plz login and Add something to cart!!!!!!!</h3>
                )}
            </div>
        )
    }
    



    useEffect(() => {
       getToken(token,userId)
    }, [])


    const onPurchase=()=>{
        setInfo({loading:true})
        let nonce;
      
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
              paymentMethodNonce: nonce,
              amount: getAmount()
            };
            processPayment(userId,token,paymentData)
            .then(response => {
                setInfo({...info,success:response.success,loading:false})
          console.log("PAYMENT SUCCESS");

          const orderData={
              products:products,
              transaction_id:response.transaction_id,
              amount:response.transaction.amount
          };
          createOrder(userId,token,orderData);

                

                cartEmpty(()=>{
                    console.log('cart get empty');
                    
                })
                setReload(!reload);
            })
            .catch(error=>{
                setInfo({loading:false,success:false})
          console.log("PAYMENT FAILED");

            })
        })





    }


    const getAmount=()=>{
        let amount=0;
        products.map(p=>{
            amount=amount+p.price;
        });
        return amount;
    }




    return (
        <div>
            <h1 >Your payable amount is {getAmount()} $</h1>
            {showbtDropin()}
            
        </div>
    )
}

export default  PaymentBraintree;