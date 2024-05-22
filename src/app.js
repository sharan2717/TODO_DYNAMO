"use strict";
// var AWS = require("aws-sdk");
// import {
//     ReceiveMessageCommand,
//     DeleteMessageCommand,
//     SQSClient,
//     DeleteMessageBatchCommand,
//   } from "@aws-sdk/client-sqs";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_sqs_1 = require("@aws-sdk/client-sqs");
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
var client_sqs_2 = require("@aws-sdk/client-sqs");
var client = new client_sqs_2.SQSClient({});
var SQS_QUEUE_URL = "https://sqs.ap-south-1.amazonaws.com/543446359042/SQS-dem";
function SendMsg(i) {
    return __awaiter(this, void 0, void 0, function () {
        var sendMessageParams, sendMessageCommand, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Sending message for ".concat(i));
                    sendMessageParams = {
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
                                StringValue: "value" + i.toString(),
                            },
                        },
                    };
                    sendMessageCommand = new client_sqs_2.SendMessageCommand(sendMessageParams);
                    return [4 /*yield*/, client.send(sendMessageCommand).then(function (res) {
                            console.log(res);
                        }).catch(function (err) {
                            console.log(err);
                        })];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    return [2 /*return*/];
            }
        });
    });
}
function ReceiveMsg() {
    return __awaiter(this, void 0, void 0, function () {
        var receiveMessageParams, receiveMessageCommand, response, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    receiveMessageParams = {
                        MaxNumberOfMessages: 10,
                        MessageAttributeNames: ["All"],
                        QueueUrl: SQS_QUEUE_URL,
                        WaitTimeSeconds: 20,
                    };
                    receiveMessageCommand = new client_sqs_1.ReceiveMessageCommand(receiveMessageParams);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.send(receiveMessageCommand)];
                case 2:
                    response = _b.sent();
                    console.log("Message array length", (_a = response.Messages) === null || _a === void 0 ? void 0 : _a.length);
                    return [2 /*return*/, response.Messages];
                case 3:
                    err_1 = _b.sent();
                    console.log(err_1);
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function Deletemsg(receiptHandle) {
    return __awaiter(this, void 0, void 0, function () {
        var deleteMessageParams, deleteMessageCommand, response;
        return __generator(this, function (_a) {
            deleteMessageParams = {
                QueueUrl: SQS_QUEUE_URL,
                ReceiptHandle: receiptHandle
            };
            deleteMessageCommand = new client_sqs_1.DeleteMessageCommand(deleteMessageParams);
            response = client.send(deleteMessageCommand).then(function (res) {
                console.log(res);
            }).catch(function (err) {
                console.log(err);
            });
            return [2 /*return*/];
        });
    });
}
function DeleteMsgsBatch(messages) {
    return __awaiter(this, void 0, void 0, function () {
        var deleteMessageBatchParams, deleteMessageBatchCommand, response;
        return __generator(this, function (_a) {
            console.log("messages from function,,,", messages);
            deleteMessageBatchParams = {
                QueueUrl: SQS_QUEUE_URL,
                Entries: messages.map(function (message) { return ({
                    Id: message.MessageId,
                    ReceiptHandle: message.ReceiptHandle,
                }); })
            };
            console.log("deleteMessageBatchParams", deleteMessageBatchParams);
            deleteMessageBatchCommand = new client_sqs_1.DeleteMessageBatchCommand(deleteMessageBatchParams);
            response = client.send(deleteMessageBatchCommand).then(function (res) {
                console.log(res);
            }).catch(function (err) {
                console.log(err);
            });
            return [2 /*return*/];
        });
    });
}
function PollMessages() {
    return __awaiter(this, void 0, void 0, function () {
        var messages, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ReceiveMsg()];
                case 1:
                    messages = _a.sent();
                    if (messages) {
                        if (messages.length === 1) {
                            Deletemsg(messages[0].ReceiptHandle);
                        }
                        else {
                            DeleteMsgsBatch(messages);
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error receiving messages:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// for (let i = 0; i < 100; i++) {
//     console.log(i);
//     SendMsg(i);
// }
//SendMsg(7);
//ReceiveMsg();
PollMessages();
