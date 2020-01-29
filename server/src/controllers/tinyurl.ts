import { Request, Response, NextFunction } from 'express';
import { body, validationResult, param } from 'express-validator';

import dns from 'dns';
import nanoid from 'nanoid';
import TinyUrl from '../models/tinyurl';
import logger from '../utils/logger';

export async function generateTinyUrl (req: Request, res: Response, next: NextFunction) {
    logger.info('Trying to generate tiny url');
    // Check if url exists
    await body('url', 'URL cannot be blank').not().isEmpty().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('❌ URL cannot be blank');
        return res.status(400).send('URL cannot be blank');
    }
    // Check if url is valid
    let userUrl;
    try {
        userUrl = new URL(req.body.url);
    } catch (err) {
        logger.error('❌ Invalid URL');
        return res.status(400).send({error: 'Invalid URL'});
    }
    // Check if url is reachable
    dns.lookup(userUrl.hostname, (err) => {
        if (err) {
            logger.error('❌ Invalid URL');
            return res.status(404).send({error: 'URL address not found'});
        };
    })

    // Check if already exists
    const newTinyUrlObject = await generateTinyUrlObject(userUrl.href);
    logger.info('Successfully generated tiny url');
    return res.send(newTinyUrlObject)
};

const generateTinyUrlObject = async (url: any) => {
    return TinyUrl.findOneAndUpdate(
        { userUrl: url},
        {
          $setOnInsert: {
            userUrl: url,
            shortCode: nanoid(7),
          },
        },
        {
          new: true,
          upsert: true,
        }, (err) => {
            if (err) logger.error(`❌ Invalid ${err}`);
        }
    );
}

export async function getUserUrl (req: Request, res: Response, next: NextFunction) {
    logger.info('Trying to get tiny url');
    // Check if code exists
    await param('tinyUrlCode', 'Code cannot be blank').not().isEmpty().run(req);
    const tinyUrlCode = req.params.tinyUrlCode;
    await TinyUrl.findOne({ shortCode : tinyUrlCode}, (err, result) => {
        if (err) {
            logger.error(`❌ Invalid ${err}`);
            return res.status(404).send({error: err});
        }
        if (result === null) {
            logger.error(`❌ We couldn\'t not find this url`);
            return res.status(404).send({error: 'We couldn\'t not find this url'});
        }
        logger.info('Successfully get tiny url');
        return res.status(200).send(result);
    });
};