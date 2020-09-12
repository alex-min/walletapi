import { check, validationResult } from 'express-validator';
import { NextApiResponse } from 'next';
import { ApiRequest, authenticated } from '../../lib/authenticated';
import database from '../../lib/database';
import { handleError } from '../../lib/handle-error';
import initMiddleware from '../../lib/init-middleware';
import validateMiddleware from '../../lib/validate-middleware';
import { Card } from '../../models/Card';
import { Wallet } from '../../models/Wallet';

export default authenticated(handleError(async (req: ApiRequest, res: NextApiResponse) => {
    const db = await database();

    if (req.method == "POST") {
        const validateBody = initMiddleware(
            validateMiddleware([
                check('wallet_id').isInt().withMessage('wallet_id is required'),
                check('name').isString().withMessage('name is required'),
                check('digits').isCreditCard().withMessage('digits should be a valid credit card'),
                check('expiration_date').matches(/[0-9]{2}\/[0-9]{2}/).withMessage('expiration date should be formatted XX/XX'),
                check('ccv').matches(/[0-9]{3}/).withMessage('ccv should match XXX')
            ], validationResult));
        await validateBody(req, res);

        const c = new Card();
        const wallet = await db.getRepository(Wallet).findOneOrFail({
            relations: ['user'],
            where: { id: req.body.wallet_id },
        });

        if (!wallet.user || wallet.user.id != req.user.id) {
            return res.status(400).json({ msg: "this wallet does not belong to you" });
        }

        wallet.id = req.body.wallet_id;
        c.wallet = wallet;
        c.name = req.body.name;
        c.digits = req.body.digits;
        c.ccv = req.body.ccv;

        const [year, month] = req.body.expiration_date.split('/');
        c.expirationDate = new Date(parseInt(`20${year}`, 10), month);

        await db.getRepository(Card).save(c);
    }

    res.status(200).json(
        await db.getRepository(Card)
            .createQueryBuilder('card')
            .leftJoin('card.wallet', 'wallet')
            .where('wallet.user_id = :id', req.user)
            .getMany());
}));