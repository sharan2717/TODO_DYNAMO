import { DeleteMessageBatchCommand, DeleteMessageBatchCommandInput, DeleteMessageCommand, DeleteMessageRequest, ReceiveMessageCommand, ReceiveMessageRequest, SendMessageBatchRequest, SendMessageRequest } from "@aws-sdk/client-sqs";


import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { DeleteMessageBatchRequest } from "aws-sdk/clients/sqs";

const client: SQSClient = new SQSClient({});

const SQS_QUEUE_URL: string =
  "https://sqs.ap-south-1.amazonaws.com/543446359042/SQS-demo";



async function SendMsg( i : number) {
    console.log(`Sending message for ${i}`);
  const sendMessageParams: SendMessageRequest = {
    QueueUrl: SQS_QUEUE_URL,
    MessageBody: "Message from nodejs" + i.toString(),
    DelaySeconds: 5,
    MessageAttributes: {
      attr1: {
        DataType: "String",
        StringValue: "value" + i.toString(),
      },
      attr2: {
        DataType: "String",
        StringValue: "value" + i.toString(),
      },
      attr3: {
        DataType: "String",
        StringValue:  "value" + i.toString(),
      },
    },
  };
  const sendMessageCommand: SendMessageCommand = new SendMessageCommand(sendMessageParams);
   const response = await client.send(sendMessageCommand).then(
    res=>{
        console.log(res);
    }
 

  ).catch(
 err=>{
    console.log(err);
 }

  );
  console.log(response);

}


 
async function ReceiveMsg(){
 
    const receiveMessageParams: ReceiveMessageRequest = {
        MaxNumberOfMessages: 10,
        MessageAttributeNames: ["All"],
        QueueUrl: SQS_QUEUE_URL,
        WaitTimeSeconds: 20,
      };

   const receiveMessageCommand : ReceiveMessageCommand = new ReceiveMessageCommand(receiveMessageParams);
   try{
    const response = await client.send(receiveMessageCommand);
    console.log("Message array length",response.Messages?.length)
    return response.Messages;
   }
   catch (err) {
    console.log(err);
    throw err;
    }
}

async function Deletemsg(receiptHandle : string|undefined){

  const deleteMessageParams: DeleteMessageRequest= {
  QueueUrl :SQS_QUEUE_URL,
  ReceiptHandle :receiptHandle
  };


const deleteMessageCommand : DeleteMessageCommand = new DeleteMessageCommand(deleteMessageParams);

const  response =  client.send(deleteMessageCommand).then(
    res=>{
      console.log(res)
    }
  ).catch(
    err=>{
      console.log(err)
    }
);

}

async function DeleteMsgsBatch(messages : any){
console.log("messages from function,,,", messages)
  const deleteMessageBatchParams: DeleteMessageBatchRequest= {
  QueueUrl :SQS_QUEUE_URL,
  Entries :  messages.map( 
 (message:any) =>({
     Id : message.MessageId,
     ReceiptHandle : message.ReceiptHandle,

 })

  )
  };

console.log("deleteMessageBatchParams", deleteMessageBatchParams)
const deleteMessageBatchCommand : DeleteMessageBatchCommand = new DeleteMessageBatchCommand(deleteMessageBatchParams);

const  response =  client.send(deleteMessageBatchCommand).then(
    res=>{
      console.log(res)
    }
  ).catch(
    err=>{
      console.log(err)
    }
);

}

async function PollMessages(){
    
   try{
    let messages = await ReceiveMsg()
    if(messages){
      if(messages.length ===1){
        Deletemsg(messages[0].ReceiptHandle);
      }else{
        DeleteMsgsBatch(messages);
      }
    }
   } catch (error) {
        console.error('Error receiving messages:', error);
    }
}

// for (let i = 0; i < 100; i++) {
//     console.log(i);
//     SendMsg(i);
// }
//SendMsg(7);
//ReceiveMsg();

PollMessages();