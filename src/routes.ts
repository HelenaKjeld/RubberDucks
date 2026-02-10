import { Router, Request, Response } from "express";
import { createProduct } from "./controllers/productController";

const router: Router = Router();


router.get( "/", (req: Request, res: Response) => {
    // connect
    res.status(200).send("Welcome to the MENTS API");
    // disconnect
});


router.post('/products', createProduct);

export default router;