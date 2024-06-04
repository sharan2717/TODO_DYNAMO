import { SFNClient, StartExecutionCommand,CreateStateMachineCommand, CreateStateMachineInput, ValidateStateMachineDefinitionCommand, CreateStateMachineCommandOutput } from "@aws-sdk/client-sfn";
import { Arn, CreateStateMachineOutput, StartExecutionInput } from "aws-sdk/clients/stepfunctions";
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');


const region =process.env.region;
const roleArn = "arn:aws:iam::543446359042:role/service-role/StepFunctions-MyStateMachine-ukq8x1mo1-role-r8kscwbwr"

const client:SFNClient = new SFNClient({ region });

const machineDefinition = {
    "Comment": "A Hello World example demonstrating various state types of the Amazon States Language. It is composed of flow control states only, so it does not need resources to run.",
    "StartAt": "Pass",
    "States": {
      "Pass": {
        "Comment": "A Pass state passes its input to its output, without performing work. They can also generate static JSON output, or transform JSON input using filters and pass the transformed data to the next state. Pass states are useful when constructing and debugging state machines.",
        "Type": "Pass",
        "Result": {
          "IsHelloWorldExample": true
        },
        "Next": "Hello World example?"
      },
      "Hello World example?": {
        "Comment": "A Choice state adds branching logic to a state machine. Choice rules can implement many different comparison operators, and rules can be combined using And, Or, and Not",
        "Type": "Choice",
        "Choices": [
          {
            "Variable": "$.IsHelloWorldExample",
            "BooleanEquals": true,
            "Next": "Yes"
          },
          {
            "Variable": "$.IsHelloWorldExample",
            "BooleanEquals": false,
            "Next": "No"
          }
        ],
        "Default": "Yes"
      },
      "Yes": {
        "Type": "Pass",
        "Next": "Wait 3 sec"
      },
      "No": {
        "Type": "Fail",
        "Cause": "Not Hello World"
      },
      "Wait 3 sec": {
        "Comment": "A Wait state delays the state machine from continuing for a specified time.",
        "Type": "Wait",
        "Seconds": 3,
        "Next": "Parallel State"
      },
      "Parallel State": {
        "Comment": "A Parallel state can be used to create parallel branches of execution in your state machine.",
        "Type": "Parallel",
        "Next": "Hello World",
        "Branches": [
          {
            "StartAt": "Hello",
            "States": {
              "Hello": {
                "Type": "Pass",
                "End": true
              }
            }
          },
          {
            "StartAt": "World",
            "States": {
              "World": {
                "Type": "Pass",
                "End": true
              }
            }
          }
        ]
      },
      "Hello World": {
        "Type": "Pass",
        "End": true
      }
    }
  }

const createStateMachineParams:CreateStateMachineInput ={
 name :"MachineFromNodeJS",
 roleArn:roleArn,
 definition:JSON.stringify(machineDefinition),
}

const startExecutionParams = (stateMachineArn : Arn )=>{
    const startExecutionParams : StartExecutionInput={
   stateMachineArn:stateMachineArn,
   name:"PersonalLAP"
   //input: JSON.stringify({ name: "John Doe" })

}
    return startExecutionParams
}

async function CreateStateMachine() {

    try{
      const createStateMachineCommand : CreateStateMachineCommand = new CreateStateMachineCommand( createStateMachineParams)
      const response :CreateStateMachineCommandOutput= await client.send(createStateMachineCommand)
      console.log("response " , response)
      const stateMachineArn: string | undefined  = response.stateMachineArn
      if(stateMachineArn){
        const startExecutionCommand  : StartExecutionCommand = new StartExecutionCommand(startExecutionParams(stateMachineArn) )
        const startResponse = await client.send(startExecutionCommand);
        console.log( " startResponse is" , startResponse)  
    }
    }catch(err){
        console.error("Error:", err);
    }
    
}

CreateStateMachine();
