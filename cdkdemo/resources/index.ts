import { APIGatewayProxyEvent, Context, Callback  } from 'aws-lambda';
import{fetchProducts,decreaseQuantity,placeorder} from './db/dynamodb';
import {CardDetails,OrderDetails,PaymentStatus, Product} from './dtos/models'
import{validateCard,confirmOrder,cancelOrder}from './payments/payment'
import { PutItemInput, PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';
 
const handler = (event:APIGatewayProxyEvent,callback:Callback)=>{
  try{
const body = JSON.parse(event.body || '{}');
    switch(event.path){
        
        case '/products':
            callback(null, getProducts());
          case '/placeOrders':
           callback(null, placeOrder(body));
          case '/processPayment':
            callback(null, processPayment(body));
          default:
            callback(null, "Not Found");
    }

  }catch{}

   
};



async function getProducts(){
  
    try{
         const products= await fetchProducts();
         const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        };
        return response;
    }catch(err){
        const response = {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(err)
        };
return response;

    }
}

async function processPayment(orderdetails :OrderDetails){
    const IsCardValid=await validateCard(orderdetails.card_details)
    if (IsCardValid) {
      const order_response=await confirmOrder(orderdetails);
      const response = {
        statusCode: 500,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order_response)
    };
return response; 
   }
    else{
      const order_response=await cancelOrder(orderdetails);
      const response = {
        statusCode: 500,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order_response)
    };
return response; 
    }
}

async function placeOrder(orderdetails :OrderDetails){
    const newProduct:OrderDetails = {
        productID: orderdetails.productID,
        quantity: orderdetails.quantity,
        orderID :uuidv4(),
        status: "processing",
        orderDate :Date.now().toString(),
        card_details: orderdetails.card_details,
  
    };
    try{
        await placeorder(newProduct);
        const response = {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status:"Order Placed"})
        };
return response;
     }catch (err){
        const response = {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(err)
        };
return response;
  }
}


