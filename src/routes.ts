import { Router, Request, Response } from "express";
import {
  createDucks,
  getAllDucks,
  getDuckById,
  updateDuckById,
  deleteDuckById,
  getDucksByQuery,
  getDucksByQueryGeneric,
} from "./controllers/productController";
import {
  loginUser,
  registerUser,
  verifyToken,
} from "./controllers/authController";

const router: Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the API is running
 *     responses:
 *      200:
 *        description: API is running.
 */

router.get("/", (req: Request, res: Response) => {
  // connect
  res.status(200).send("Welcome to the MENTS API");
  // disconnect
});

// auth routes
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Takes a user in the body and tries to register it in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                _id:
 *                  type: string
 */
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

// create
router.post("/products", verifyToken, createDucks);

// gets
router.get("/products", getAllDucks);
router.get("/products/:id", getDuckById);
router.post("/products/query", getDucksByQueryGeneric);
router.get("/products/:key/:value", verifyToken, getDucksByQuery);

// update
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *      - Product Routes
 *     summary: Update a DUCK by ID
 *     description: Updates a specific DUCK in the database by its ID. Requires authentication.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID from repository
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RubberDuck'
 *     responses:
 *       200:
 *         description: DUCK updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RubberDuck'
 */
router.put("/products/:id", verifyToken, updateDuckById);

// delete
router.delete("/products/:id", verifyToken, deleteDuckById);

export default router;
