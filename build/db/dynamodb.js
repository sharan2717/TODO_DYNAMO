"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSUpdateDocumentByID = exports.AWSDeleteDocument = exports.AWSfetchDocument = exports.AWSaddDocument = void 0;
const AWS = __importStar(require("aws-sdk"));
//var AWS = require("aws-sdk");
// Configure DynamoDB with credentials from config.json
//AWS.config.loadFromPath('./config.json');
//const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const ddb = new AWS.DynamoDB.DocumentClient();
function AWSaddDocument(document) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            TableName: "TODO_LIST",
            Item: document,
        };
        try {
            yield ddb.put(params).promise();
            return params.Item;
        }
        catch (error) {
            console.error('Error adding document:', error);
            throw error;
        }
    });
}
exports.AWSaddDocument = AWSaddDocument;
function AWSfetchDocument() {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            TableName: "TODO_LIST",
        };
        try {
            const items = yield ddb.scan(params, () => { }).promise();
            return items;
        }
        catch (error) {
            console.error('Error adding document:', error);
            throw error;
        }
    });
}
exports.AWSfetchDocument = AWSfetchDocument;
function AWSDeleteDocument(document_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            TableName: "TODO_LIST",
            Key: {
                id: document_id,
            }
        };
        try {
            yield ddb.delete(params).promise();
        }
        catch (error) {
            console.error('Error adding document:', error);
            throw error;
        }
    });
}
exports.AWSDeleteDocument = AWSDeleteDocument;
function AWSUpdateDocumentByID(document_id, document) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = {
                TableName: "TODO_LIST",
                Item: document,
            };
            yield ddb.put(params).promise();
        }
        catch (error) {
            console.error('Error adding document:', error);
            throw error;
        }
    });
}
exports.AWSUpdateDocumentByID = AWSUpdateDocumentByID;
