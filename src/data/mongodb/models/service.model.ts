import { Schema } from "mongoose";

const serviceSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required.'],
    },
    price:{
        type: Number,
        required:[true, 'Price is required.'],
    },
    duration:{
        type: Number,
    },
    available:{
        type: Boolean,
        default: false,
    },
    business:{
        type: String,
        required:[true, 'Business is required.'],
    },
})