import express from 'express';
const router = express.Router();

import * as TinyUrlController from './controllers/tinyurl'
import logger from './utils/logger';

router.post('/tinyurl', TinyUrlController.generateTinyUrl);
router.get('/tinyurl/daily-statistic', TinyUrlController.getDailyStatistic);
router.get('/:tinyUrlCode', TinyUrlController.getUserUrl);
router.get('/', (req, res, next) => {
    logger.info('🎩 I am up, maybe you are lost?');
    res.send('🎩 I am up, maybe you are lost?');
});

export default router;