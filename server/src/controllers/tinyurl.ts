import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import dns from 'dns';
import nanoid from 'nanoid';
import TinyUrl from '../models/tinyurl'

export async function generateTinyUrl (req: Request, res: Response, next: NextFunction) {
    // Check if url exists
    await check('url', 'Url cannot be blank').not().isEmpty().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send('Url cannot be blank');
    } 
    // Check if url is valid
    let userUrl;
    try {
        userUrl = new URL(req.body.url);
    } catch (err) {
        return res.status(400).send({error: 'invalid URL'});
    }
    // Check if url is reachable
    dns.lookup(userUrl.hostname, (err) => {
        if (err) {
            return res.status(404).send({error: 'Url address not found'});
        };
    })

    // Check if already exists
    const newTinyUrlObject = await generateTinyUrlObject(userUrl.href);
    return res.send('hahah')
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
        },
        (err) => {
            console.log(err);
        }
    );
}