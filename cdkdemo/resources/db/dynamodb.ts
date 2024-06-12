import * as AWS from 'aws-sdk';
import { DeleteItemOutput, GetItemInput, PutItemInput, PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';
import {CardDetails,OrderDetails,PaymentStatus, Product} from '../dtos/models';

const ddb = new AWS.DynamoDB.DocumentClient();

export async function fetchProducts(){
  
    const params= {
        TableName: 'products',
      };
       try{
        const items=await ddb.scan(params,()=>{}).promise()
          return items;
    
       }catch (error){
        console.error('Error adding document:', error);
        throw error;
    }
}

export async function decreaseQuantity(productId : string , quantity: number){
    const params = {
        TableName: 'products',
        Key: {
            'productId': productId
        },
        UpdateExpression: 'SET #quantity = #quantity - :decreaseBy',
        ExpressionAttributeNames: {
            '#quantity': 'quantity'
        },
        ExpressionAttributeValues: {
            ':decreaseBy': quantity
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        const result = await ddb.update(params).promise();
        return result.Attributes; // Returns the updated item
    } catch (error) {
        console.error('Error decreasing product quantity:', error);
        throw error;
    }

}


export async function increaseQuantity(productId : string , quantity: number){
    const params = {
        TableName: 'products',
        Key: {
            'productId': productId
        },
        UpdateExpression: 'SET #quantity = #quantity - :increaseBy',
        ExpressionAttributeNames: {
            '#quantity': 'quantity'
        },
        ExpressionAttributeValues: {
            ':increaseBy': quantity
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        const result = await ddb.update(params).promise();
        return result.Attributes; // Returns the updated item
    } catch (error) {
        console.error('Error increasing product quantity:', error);
        throw error;
    }
}


export async function placeorder(order_details:OrderDetails){
    const params :PutItemInput= {
        TableName: "orders",
        Item:  order_details as unknown as PutItemInputAttributeMap,
    };
    try{
        await ddb.put(params).promise();
        await decreaseQuantity(order_details.productID,order_details.quantity);
        return '';
     }catch (error){
      console.error('Error placing order:', error);
      throw error;
  }
}


export async function UpdateOrderStatus(orderId : string , status: string){
    const params = {
        TableName: 'orders',
        Key: {
            'orderId': orderId
        },
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: {
            '#quantity': 'quantity'
        },
        ExpressionAttributeValues: {
            ':status': status
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        const result = await ddb.update(params).promise();
        
    } catch (error) {
        console.error('Error updating  order status:', error);
        throw error;
    }
}