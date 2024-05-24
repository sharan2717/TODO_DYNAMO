"use strict";
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
var client_sfn_1 = require("@aws-sdk/client-sfn");
require('dotenv').config();
var fs = require('fs').promises;
var path = require('path');
var region = process.env.region;
var roleArn = "arn:aws:iam::543446359042:role/service-role/StepFunctions-MyStateMachine-ukq8x1mo1-role-r8kscwbwr";
var client = new client_sfn_1.SFNClient({ region: region });
var machineDefinition = {
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
};
var createStateMachineParams = {
    name: "MachineFromNodeJS",
    roleArn: roleArn,
    definition: JSON.stringify(machineDefinition),
};
var startExecutionParams = function (stateMachineArn) {
    var startExecutionParams = {
        stateMachineArn: stateMachineArn,
        name: "ExecutionfromNOdejs"
        //input: JSON.stringify({ name: "John Doe" })
    };
    return startExecutionParams;
};
function CreateStateMachine() {
    return __awaiter(this, void 0, void 0, function () {
        var createStateMachineCommand, response, stateMachineArn, startExecutionCommand, startResponse, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    createStateMachineCommand = new client_sfn_1.CreateStateMachineCommand(createStateMachineParams);
                    return [4 /*yield*/, client.send(createStateMachineCommand)];
                case 1:
                    response = _a.sent();
                    console.log("response ", response);
                    stateMachineArn = response.stateMachineArn;
                    if (!stateMachineArn) return [3 /*break*/, 3];
                    startExecutionCommand = new client_sfn_1.StartExecutionCommand(startExecutionParams(stateMachineArn));
                    return [4 /*yield*/, client.send(startExecutionCommand)];
                case 2:
                    startResponse = _a.sent();
                    console.log(" startResponse is", startResponse);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error("Error:", err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
CreateStateMachine();
