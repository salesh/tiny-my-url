import { Request, Response, NextFunction } from 'express';
import { body, validationResult, param } from 'express-validator';
import app from '../app';

import dns from 'dns';
import nanoid from 'nanoid';
import TinyUrl from '../models/tinyurl';
import logger from '../utils/logger';

export async function generateTinyUrl (req: Request, res: Response, next: NextFunction) {
    logger.info('Trying to generate tiny url');
    const url = await validateUrl(req, res, next);
    const newTinyUrlObject = await generateTinyUrlObject(url.href, url.hostname, next);
    logger.info('Successfully generated tiny url');
    return res.send(newTinyUrlObject)
};

const validateUrl = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Validate url');
    await body('url', 'URL cannot be blank').not().isEmpty().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('❌ URL cannot be blank');
        throw Error('URL cannot be blank');
    }
    // Check if url is valid
    let url: URL;
    try {
        url = new URL(req.body.url);
    } catch (error) {
        logger.error(`❌ Invalid URL ${error}`);
        throw error;
    }
    // Check if url is reachable
    try {
        await lookupPromise(url.hostname);
    } catch(err) {
        logger.error(`❌ Can't  lookup address ${err}`);
        throw err;
    }
    return url;
};

async function lookupPromise(hostname: string){
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, address) => {
            if(err) reject(err);
            resolve(address);
        });
   });
};

const generateTinyUrlObject = async (url: any, hostname: any, next: NextFunction) => {
    const code: string =  nanoid(7);
    const tinyUrl = `http://${process.env.corePATH}:${app.get('port')}/${code}`;
    return TinyUrl.findOneAndUpdate(
        { url },
        {
          updatedAt: new Date(),
          $setOnInsert: {
            url,
            hostname,
            tinyUrl,
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
                    $sum: '$counter',
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