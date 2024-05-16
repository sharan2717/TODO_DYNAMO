import { Router } from "express";
import { addItems, deleteItem, getItems, updateItem } from "../handlers/handler";

const apiRouter = Router();

apiRouter.get("/getItems",getItems)

apiRouter.post("/addItem",addItems)
apiRouter.put("/updateItem",updateItem)
apiRouter.delete("/deleteItem",deleteItem)




export default apiRouter;