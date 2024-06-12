import * as cdk from 'aws-cdk-lib';
import {aws_lambda as lambda} from 'aws-cdk-lib';
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
 
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { DynamoDB, EventBridge, Lambda } from 'aws-sdk';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkdemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const S3bucket = new CfnBucket(this,"sampleCDKbucket",{
           versioningConfiguration:{
            status:"Enabled"
           }

})
  


const productsTable = new dynamodb.TableV2(this,"products",{
    
    tableName : "products",
    partitionKey : {
      name:"productID",
      type:  dynamodb.AttributeType.STRING
    },
    sortKey :{
      name : "productName",
      type : dynamodb.AttributeType.STRING
    }
})

const ordersTable = new dynamodb.TableV2(this,"orders",{
 tableName : "orders",
  partitionKey :{
    name : "orderID",
    type : dynamodb.AttributeType.STRING
  }
})
const CDKLambda= new lambda.Function(this,"samplepayment", {
  
  runtime: lambda.Runtime.NODEJS_20_X,
  handler:'index.handler',
  code:lambda.Code.fromAsset('build'),
  
  })


productsTable.grantReadWriteData(CDKLambda)
ordersTable.grantReadWriteData(CDKLambda)
 
 const eventbridge =new EventBridge({


 })
 
eventbridge

}//end of constructor
}//end of class
