import { Router, Request, Response } from "express";
import { 
    createProduct, 
    getAllProduct, 
    getProductById,
    updateProductById, 
    deleteProductById,
    getDucksByQuery, 
    getDucksByQueryGeneric} from "./controllers/productController";
import { loginUser, registerUser, verifyToken } from "./controllers/authController";

const router: Router = Router();


router.get( "/", (req: Request, res: Response) => {
    // connect
    res.status(200).send("Welcome to the MENTS API");
    // disconnect
});

// auth routes
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);




router.post('/products', createProduct);
router.get('/products', getAllProduct);
router.post('/products/query', getDucksByQueryGeneric);


router.get('/products/:id', getProductById);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', verifyToken, deleteProductById);
router.get('/products/:key/:value', verifyToken, getDucksByQuery);


export default router;