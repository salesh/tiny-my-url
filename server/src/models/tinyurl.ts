import { Schema, model } from 'mongoose';

const TinyUrlSchema = new Schema({
    code: String,
    url: String,
    tinyUrl: String,
    hostname: String,
    counter: Number
}, { timestamps: true });

const TinyUrl = model('TinyUrl', TinyUrlSchema);
export default TinyUrl;