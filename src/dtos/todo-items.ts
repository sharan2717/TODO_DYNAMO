import { integer } from "aws-sdk/clients/cloudfront";

export interface TodoItem{
    id : string;
    title : string;
    description : string;
    dueDate: string;
    isCompleted : boolean;
}

