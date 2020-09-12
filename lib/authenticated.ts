import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../models/User";
import database from "./database";

export interface ApiRequest extends NextApiRequest {
    user: User
}

export function authenticated(endpoint: (req: ApiRequest, res: NextApiResponse) => void) {
    return async (req: ApiRequest, res: NextApiResponse) => {
        if (!req.headers['user-id'] || typeof req.headers['user-id'] !== 'string') {
            return res.status(401).json({ msg: 'please specify an User-id header' });
        }

        const db = await database();
        const user = await db.getRepository(User).findOne(req.headers['user-id'] as string);
        if (!user) {
            return res.status(401).json({ msg: 'user_does_not_exist' });
        }

        req.user = user;

        return await endpoint(req, res);
    }
}