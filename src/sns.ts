import { PublishCommand, PublishCommandInput, SNSClient, paginateListTopics } from "@aws-sdk/client-sns";


const snsClient : SNSClient = new SNSClient({});

const publishParams : PublishCommandInput = {

   Message : "TEST MESSAGE FROM NODEJS",
   TopicArn : "arn:aws:sns:ap-south-1:543446359042:testing"

}

const publishMessage = async() =>{

    try{
    const publishCommand : PublishCommand = new PublishCommand(publishParams);
    const response = await snsClient.send(publishCommand)
console.log("response" , response)
    }catch(err){
        console.log("Error is ",err)
    }
}


publishMessage()