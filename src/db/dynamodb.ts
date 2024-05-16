import * as AWS from 'aws-sdk';
import { DeleteItemOutput, GetItemInput, PutItemInput, PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';

//var AWS = require("aws-sdk");
// Configure DynamoDB with credentials from config.json
//AWS.config.loadFromPath('./config.json');

//const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const ddb = new AWS.DynamoDB.DocumentClient();


interface Item {
  id: { S: string };
  CUSTOMER_ID: { N: string };
  CUSTOMER_NAME: { S: string };
}

export async function AWSaddDocument(document:object){
  
  const params :PutItemInput= {
    TableName: "TODO_LIST",
    Item:  document as PutItemInputAttributeMap,
};
   try{
      await ddb.put(params).promise()
      return params.Item;

   }catch (error){
    console.error('Error adding document:', error);
    throw error;
}
}

export async function AWSfetchDocument(){
 
  const params= {
    TableName: "TODO_LIST",
  };
   try{
       const items=await ddb.scan(params,()=>{}).promise()
      return items;

   }catch (error){
    console.error('Error adding document:', error);
    throw error;
}
}


export async function AWSDeleteDocument(document_id:string){
 
  const params= {
    TableName: "TODO_LIST",
    Key:{
      id: document_id,
    }
  };

   try{
       await ddb.delete(params).promise()

   }catch (error){
    console.error('Error adding document:', error);
    throw error;
}
}

export async function AWSUpdateDocumentByID(document_id:string,document:object){

try{
  const params ={
    TableName: "TODO_LIST",
    Item: document as PutItemInputAttributeMap, 
  }
  await ddb.put(params).promise();
}
catch (error){
  console.error('Error adding document:', error);
  throw error;
}}