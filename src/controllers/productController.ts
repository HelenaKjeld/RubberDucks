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
    catch (err) {
                console.error("Error creating product:", err); // Add this line

        res.status(500).json("An error occurred while creating the product." + err );
    }
    finally {
        await disconnect();
    }
}



/** 
* Retrieves all DUCKS from the database
* @param req
* @param res
*/
export async function getAllProduct(req: Request, res: Response): Promise<void> {

    try {
        await connect();

        const result = await productModel.find({});

        res.status(200).json(result);

    }
    catch (err) {

        res.status(500).json("error retrieving the products." + err );
    }
    finally {
        await disconnect();
    }
}


/** 
* Retrieves a DUCK by ID from the database
* @param req
* @param res
*/
export async function getProductById(req: Request, res: Response): Promise<void> {

    try {
        await connect();

        const id = req.params.id;
        const result = await productModel.findById({_id: id});

        res.status(200).json(result);

    }
    catch (err) {

        res.status(500).json("error retrieving product by id." + err );
    }
    finally {
        await disconnect();
    }
}


/** 
* Update a DUCK by ID from the database
* @param req
* @param res
*/
export async function updateProductById(req: Request, res: Response): Promise<void> {

    const id = req.params.id;

    try {
        await connect();

        const result = await productModel.findByIdAndUpdate(id, req.body);
        if (!result) {
            res.status(404).send('can nott update Duke with the id=' + id);
        }
        else {
            res.status(200).send('product was updated successfully.');
        }


    }
    catch (err) {

        res.status(500).json("error update the DUCK product by id." + err );
    }
    finally {
        await disconnect();
    }
}

/** 
* Delete a DUCK by ID from the database
* @param req
* @param res
*/
export async function deleteProductById(req: Request, res: Response): Promise<void> {

    const id = req.params.id;

    try {
        await connect();

        const result = await productModel.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send('can not delete Duke with the id=' + id);
        }
        else {
            res.status(200).send('product was deleted successfully.');
        }


    }
    catch (err) {

        res.status(500).json("error deleting the DUCK product by id." + err );
    }
    finally {
        await disconnect();
    }
}