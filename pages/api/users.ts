import { NextApiResponse } from "next";
import { ApiRequest } from "../../lib/authenticated";
import database from "../../lib/database";
import { handleError } from "../../lib/handle-error";
import { User } from "../../models/User";


/**
 *  Creates a new user
 */
export default handleError(async (req: ApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const u = new User();
        const db = await database();
        return res.status(200).json(await db.getRepository(User).save(u));
    }

    return res.status(400).json({ msg: 'only POST is allowed' });
});