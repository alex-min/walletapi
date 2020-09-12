import { check, validationResult } from 'express-validator';
import { NextApiResponse } from 'next';
import { ApiRequest, authenticated } from '../../lib/authenticated';
import database from '../../lib/database';
import { handleError } from '../../lib/handle-error';
import initMiddleware from '../../lib/init-middleware';
import validateMiddleware from '../../lib/validate-middleware';
import { Wallet } from '../../models/Wallet';

const validateBody = initMiddleware(
    validateMiddleware([
        check('currency')
            .isIn(['EUR', 'USD', 'GBP'])
            .withMessage("only EUR, USD, and GBP currencies are supported"),
        check('name').isString().withMessage('name is required')
    ], validationResult)
)

export default authenticated(handleError(async (req: ApiRequest, res: NextApiResponse) => {
    const db = await database();

    if (req.method === 'POST') {
        await validateBody(req, res);
        const wallet = new Wallet();

        wallet.currency = req.body.currency;
        wallet.name = req.body.name;
        wallet.isMasterWallet = false;
        wallet.user = req.user;
        await db.getRepository(Wallet).save(wallet);
    }

    res.status(200).json(
        await db.getRepository(Wallet)
            .createQueryBuilder()
            .where({ user: { id: req.headers['user-id'] } })
            .getMany()
    )
}));