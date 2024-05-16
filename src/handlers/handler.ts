
import { Request, Response } from 'express'
import { TodoItem } from "../dtos/todo-items"
import { AWSaddDocument,AWSfetchDocument ,AWSDeleteDocument, AWSUpdateDocumentByID} from "../db/dynamodb"
import { v4 as uuidv4 } from 'uuid';


export async function getItems(req: Request, res: Response) {

    try {
        const documents = await AWSfetchDocument();
        res.status(200).json(documents);
    } catch (error: any) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function addItems(req: Request, res: Response) {

    try {
        const todoItem: TodoItem = req.body;
         todoItem.id=uuidv4();
        await AWSaddDocument(todoItem)
        res.status(200).json({ message: 'Document Added successfully' });

    } catch (error: any) {
        res.status(500).json({ error: error.message });

    }

}

export async function updateItem(req: Request, res: Response) {

    try {
       let id: any = req.query.id;
       const todoItem: TodoItem = req.body;
       todoItem.id=id;
        await AWSUpdateDocumentByID(id, todoItem)
        res.status(200).json({ message: 'Document Updated successfully' });

    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteItem(req: Request, res: Response) {
    try {
        let id: any = req.query.id;
        await AWSDeleteDocument(id)
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error });
    }
}


