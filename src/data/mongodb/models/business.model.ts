import { Schema } from "mongoose";

const businessSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    direction:{
        type: String,
        required: [true, 'Direction is required.'],
    },
    mapUbication:{
        type: String,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'BusinessCategory',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})