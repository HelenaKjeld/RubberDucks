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



// create
router.post('/products', verifyToken, createDucks);

// gets
router.get('/products', getAllDucks);
router.get('/products/:id', getDuckById);
router.post('/products/query', getDucksByQueryGeneric);
router.get('/products/:key/:value', verifyToken, getDucksByQuery);

// update + delete 

router.put('/products/:id', verifyToken, updateDuckById);
router.delete('/products/:id', verifyToken, deleteDuckById);



export default router;