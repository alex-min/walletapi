import { NextApiResponse } from "next";
import { ApiRequest } from "./authenticated";

export function handleError(endpoint: (req: ApiRequest, res: NextApiResponse) => void) {
    return async (req: ApiRequest, res: NextApiResponse) => {
        try {
            await endpoint(req, res);
        }
        catch (e) {
            return res.status(400).json({ 'error': e.toString() });
        }
    }
}