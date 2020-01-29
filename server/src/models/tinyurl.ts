import { Schema, model } from 'mongoose';

const TinyUrlSchema = new Schema({
    code: String,
    url: String,
    hostname: String,
}, { timestamps: true });

const TinyUrl = model('TinyUrl', TinyUrlSchema);
export default TinyUrl;