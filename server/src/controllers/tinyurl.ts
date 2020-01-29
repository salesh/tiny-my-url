import { Request, Response, NextFunction } from 'express';
import { body, validationResult, param } from 'express-validator';
import app from '../app';

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
    let url: URL;
    try {
        url = new URL(req.body.url);
    } catch (error) {
        logger.error(`❌ Invalid URL ${error}`);
        return res.status(400).send({error: 'Invalid URL'});
    }
    // Check if url is reachable
    dns.lookup(url.hostname, async (error) => {
        if (error) {
            logger.error(`❌ Invalid URL ${error}`);
            return res.status(400).send({error: 'URL address not found'});
        };

        // Check if already exists
        try {
            const newTinyUrlObject = await generateTinyUrlObject(url.href, url.hostname, next);
            logger.info('Successfully generated tiny url');
            return res.send(newTinyUrlObject)
        } catch(error1) {
            logger.error(`❌ Database problem ${error1}`);
        }
    })
};

const generateTinyUrlObject = async (url: any, hostname: any, next: NextFunction) => {
    const code: string =  nanoid(7);
    return TinyUrl.findOneAndUpdate(
        { url },
        {
          updatedAt: new Date(),
          $setOnInsert: {
            url,
            hostname,
            tinyUrl: `http://${process.env.corePATH}:${app.get('port')}/${code}`,
            code,
            createdAt: new Date(),
            counter: 0
          },
        },
        {
          new: true,
          upsert: true,
        }, (error, doc: any) => {
            if (error) {
                next(error);
            }
            doc.counter++;
            doc.save();
        }
    );
}

export async function getUserUrl (req: Request, res: Response, next: NextFunction) {
    logger.info('Trying to get tiny url');
    // Check if code exists
    await param('tinyUrlCode', 'Code cannot be blank').not().isEmpty().run(req);
    const tinyUrlCode = req.params.tinyUrlCode;
    await TinyUrl.findOne({ code : tinyUrlCode}, (error, result: any) => {
        if (error) {
            logger.error(`❌ Invalid ${error}`);
            return res.status(400).send({error});
        }
        if (result === null) {
            logger.error(`❌ We couldn\'t not find this url`);
            return res.status(400).send({error: 'We couldn\'t not find this url'});
        }
        logger.info('Successfully get tiny url');
        return res.status(200).redirect(result.url);
    });
};

export async function getDailyStatistic (req: Request, res: Response, next: NextFunction) {
    logger.info('Trying to get daily statistic');
    const aggregate = [
        {
            $match : {
                'createdAt': {
                        '$gt': new Date(Date.now() - 24*60*60 * 1000)
                }
            }
        },
        {
            $group: {
                _id: '$hostname',
                repeat: {
                    $sum: "$counter",
                },
                statistic: {
                    '$sum': 1
                }
            },
        },
        {
            $project: {
                name: '$_id',
                value: '$repeat',
                number_different: '$statistic'
            }
        }
    ];
    TinyUrl.aggregate(aggregate, (error: any, logs: any) => {
        if (error) {
            return res.status(400).send({error: 'Problem with database'});
        }
        return res.send(logs);
    })
}