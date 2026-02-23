import { Router, Request, Response } from "express";
import { 
    createDucks, 
    getAllDucks, 
    getDuckById,
    updateDuckById, 
    deleteDuckById,
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




router.post('/products', createDucks);
router.get('/products', getAllDucks);
router.post('/products/query', getDucksByQueryGeneric);


router.get('/products/:id', getDuckById);
router.put('/products/:id', updateDuckById);
router.delete('/products/:id', verifyToken, deleteDuckById);
router.get('/products/:key/:value', verifyToken, getDucksByQuery);


export default router;