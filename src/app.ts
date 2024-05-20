var AWS = require("aws-sdk");
import {
    ReceiveMessageCommand,
    DeleteMessageCommand,
    SQSClient,
    DeleteMessageBatchCommand,
  } from "@aws-sdk/client-sqs";

AWS.config.update({ region: "ap-south-1" });




const client = new SQSClient({});
const SQS_QUEUE_URL = "queue_url";

const receiveMessage = (queueUrl: string) =>
    client.send(
      new ReceiveMessageCommand({
        MaxNumberOfMessages: 10,
        MessageAttributeNames: ["All"],
        QueueUrl: queueUrl,
        WaitTimeSeconds: 20,
        VisibilityTimeout: 20,
      }),
    );

    export const main = async (queueUrl = SQS_QUEUE_URL) => {
        const { Messages } = await receiveMessage(queueUrl);
      
        if (!Messages) {
          return;
        }
      
        if (Messages.length === 1) {
          console.log(Messages[0].Body);
          await client.send(
            new DeleteMessageCommand({
              QueueUrl: queueUrl,
              ReceiptHandle: Messages[0].ReceiptHandle,
            }),
          );
        } else {
          await client.send(
            new DeleteMessageBatchCommand({
              QueueUrl: queueUrl,
              Entries: Messages.map((message:any) => ({
                Id: message.MessageId,
                ReceiptHandle: message.ReceiptHandle,
              })),
            }),
          );
        }
      };
      

