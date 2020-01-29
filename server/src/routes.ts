import express from 'express';
const router = express.Router();

import * as TinyUrlController from './controllers/tinyurl'

router.post('/tinyurl', TinyUrlController.generateTinyUrl);

export default router;