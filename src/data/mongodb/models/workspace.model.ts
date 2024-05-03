import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    available: {
        type: Boolean,
        default: false,
    },
    business: {
        type: Schema.Types.ObjectId,
        ref:'Business',
        required: true,
    },
});

export const WorkspaceModel = mongoose.model('Workspace', workspaceSchema);