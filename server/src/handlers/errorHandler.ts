import { Request, Response, NextFunction } from 'express';

/*
Instead of using try{} catch(err) {} in each controller, we wrap the function in catchErrors(),
catch and errors they throw, and pass it along to our express middleware with next()
 */
const catchErrors = (fn: any) => {
  // tslint:disable-next-line:only-arrow-functions
  return function (req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };
};

export default catchErrors;