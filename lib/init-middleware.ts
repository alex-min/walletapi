import { NextApiResponse } from "next"
import { ApiRequest } from "./authenticated"

export default function initMiddleware(middleware: any) {
    return (req: ApiRequest, res: NextApiResponse) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result: any) => {
                if (result instanceof Error) {
                    return reject(result)
                }
                return resolve(result)
            })
        })
}