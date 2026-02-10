import { Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { connect, disconnect } from '../repository/database';

// CRUD YEAH

/** 
* Add new DUCKS to the database
* @param req
* @param res
*/
export async function createProduct(req: Request, res: Response): Promise<void> {

    const data = req.body;

    try {
        await connect();

        const product = new productModel(data);
        const result = await product.save();

        res.status(201).json(result);

    }
    catch {
        res.status(500).json({ message: "An error occurred while creating the product." });
    }
    finally {
        await disconnect();
    }
}