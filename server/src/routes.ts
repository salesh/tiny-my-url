import express from 'express';
const router = express.Router();

import * as TinyUrlController from './controllers/tinyurl'

router.post('/tinyurl', TinyUrlController.generateTinyUrl);
router.get('/tinyurl/:tinyUrlCode', TinyUrlController.getUserUrl);

export default router;