import { Schema, model } from "mongoose";
import { RubberDuck } from "../interfaces/rubberducks";

const productSchema = new Schema<RubberDuck>({
    name: { type: String, required: true, min: 3, max: 255 },
    description: { type: String, required: true, min: 3, max: 1024 },
    imageUrl: { type: String, required: true, min: 3, max: 1024 },
    color: { type: String, required: true, min: 3, max: 255 },
    theme: { type: String, required: true, min: 3, max: 255 },
    size: { type: Number, required: true, min: 1, max: 100 },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true, default: true },
    isOnDiscount: { type: Boolean, required: true, default: false },
    discountPercentage: { type: Number, required: true, default: 0 },
    isHidden: { type: Boolean, required: false },
    _createdBy: { type: String, ref: "User", required: true }

})


export const productModel = model<RubberDuck>("RubberDuck", productSchema);