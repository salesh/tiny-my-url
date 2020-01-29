import { Schema, model } from 'mongoose';

const TinyUrlSchema = new Schema({
    tinyUrl: String,
    shortCode: String,
    userUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const TinyUrl = model('TinyUrl', TinyUrlSchema);
export default TinyUrl;