import express from 'express';
const router = express.Router();

import * as TinyUrlController from './controllers/tinyurl'
import logger from './utils/logger';
import catchErrors from './handlers/errorHandler';

router.post('/tinyurl', catchErrors(TinyUrlController.generateTinyUrl));
router.get('/tinyurl/daily-statistic', catchErrors(TinyUrlController.getDailyStatistic));
router.get('/:tinyUrlCode', catchErrors(TinyUrlController.getUserUrl));
router.get('/', (req, res, next) => {
    logger.info('🎩 I am up, maybe you are lost?');
    res.send('🎩 I am up, maybe you are lost?');
});

export default router;