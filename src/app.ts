// var AWS = require("aws-sdk");
// import {
//     ReceiveMessageCommand,
//     DeleteMessageCommand,
//     SQSClient,
//     DeleteMessageBatchCommand,
//   } from "@aws-sdk/client-sqs";

import { DeleteMessageRequest, ReceiveMessageCommand, ReceiveMessageRequest, SendMessageBatchRequest, SendMessageRequest } from "@aws-sdk/client-sqs";
import { send } from "process";

// AWS.config.update({ region: "ap-south-1" });

// const client = new SQSClient({});
// const SQS_QUEUE_URL = "https://sqs.ap-south-1.amazonaws.com/543446359042/SQS-demo";

// const receiveMessage = (queueUrl: string) =>
//     client.send(
//       new ReceiveMessageCommand({
//         MaxNumberOfMessages: 10,
//         MessageAttributeNames: ["All"],
//         QueueUrl: queueUrl,
//         WaitTimeSeconds: 20,
//         VisibilityTimeout: 20,
//       }),
//     );

//     var params = {
//         AttributeNames: ["SentTimestamp"],
//         MaxNumberOfMessages: 10,
//         MessageAttributeNames: ["All"],
//         QueueUrl: SQS_QUEUE_URL,
//         VisibilityTimeout: 20,
//         WaitTimeSeconds: 0,
//       };

//       sqs.receiveMessage(params, function (err, data) {
//         if (err) {
//           console.log("Receive Error", err);
//         } else if (data.Messages) {
//           var deleteParams = {
//             QueueUrl: queueURL,
//             ReceiptHandle: data.Messages[0].ReceiptHandle,
//           };
//           sqs.deleteMessage(deleteParams, function (err, data) {
//             if (err) {
//               console.log("Delete Error", err);
//             } else {
//               console.log("Message Deleted", data);
//             }
//           });
//         }
//       });

//     export const main = async (queueUrl = SQS_QUEUE_URL) => {
//         const { Messages } = await receiveMessage(queueUrl);
//         console.log("message are ")

//         console.log("message is ",Messages)

//         if (!Messages) {
//             console.log("message is ",Messages)
//           return;
//         }

//         // if (Messages.length === 1) {
//         //   console.log(Messages[0].Body);
//         //   await client.send(
//         //     new DeleteMessageCommand({
//         //       QueueUrl: queueUrl,
//         //       ReceiptHandle: Messages[0].ReceiptHandle,
//         //     }),
//         //   );
//         // } else {
//         //   await client.send(
//         //     new DeleteMessageBatchCommand({
//         //       QueueUrl: queueUrl,
//         //       Entries: Messages.map((message:any) => ({
//         //         Id: message.MessageId,
//         //         ReceiptHandle: message.ReceiptHandle,
//         //       })),
//         //     }),
//         //   );
//         // }
//       };

import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

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
   const  response =  client.send(receiveMessageCommand).then(
    res=>{
        console.log(res);
        console.log("message length is " , res.Messages?.length)
    }
   ).catch(
    err=>{
        console.log(err);
    }
   );
 


}

async function Deletemsg(receiptHandle : string){

  const deleteMessageParams: DeleteMessageRequest= {
  QueueUrl :SQS_QUEUE_URL,
  ReceiptHandle :receiptHandle
  };


const receiveMessageCommand : ReceiveMessageCommand = new ReceiveMessageCommand(deleteMessageParams);

const  response =  client.send(receiveMessageCommand).then(
    res=>{
      console.log(res)
    }
  ).catch(
    err=>{
      console.log(err)
    }
);

}




// async function SendMsgBatch(){

//      const sendBatchParams  : SendMessageBatchRequest ={
//          QueueUrl:SQS_QUEUE_URL,


//      }

// }

// for (let i = 0; i < 100; i++) {
//     console.log(i);
//     SendMsg(i);
// }
//SendMsg(7);
ReceiveMsg();

Deletemsg();