import mongoose, { Schema } from "mongoose";


const businessCategorySchema = new Schema({
    name:{
        type:String,
        required: [true, 'Name is required.'],
    },
    available:{
        type:String,
        default: false,
    },
});

export const BusinessCategoryModel = mongoose.model('BusinessCategory', businessCategorySchema);