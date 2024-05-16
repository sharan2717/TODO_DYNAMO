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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.addItems = exports.getItems = void 0;
const dynamodb_1 = require("../db/dynamodb");
const uuid_1 = require("uuid");
function getItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const documents = yield (0, dynamodb_1.AWSfetchDocument)();
            res.status(200).json(documents);
        }
        catch (error) {
            console.error('Error fetching documents:', error);
            res.status(500).json({ error: error.message });
        }
    });
}
exports.getItems = getItems;
function addItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todoItem = req.body;
            todoItem.id = (0, uuid_1.v4)();
            yield (0, dynamodb_1.AWSaddDocument)(todoItem);
            res.status(200).json({ message: 'Document Added successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.addItems = addItems;
function updateItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.query.id;
            const todoItem = req.body;
            todoItem.id = id;
            yield (0, dynamodb_1.AWSUpdateDocumentByID)(id, todoItem);
            res.status(200).json({ message: 'Document Updated successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.updateItem = updateItem;
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.query.id;
            yield (0, dynamodb_1.AWSDeleteDocument)(id);
            res.status(200).json({ message: 'Document deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    });
}
exports.deleteItem = deleteItem;
