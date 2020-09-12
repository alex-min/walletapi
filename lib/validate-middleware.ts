import { ResultFactory, ValidationChain, ValidationError } from "express-validator"
import { NextApiResponse } from "next"
import { ApiRequest } from "./authenticated"

export default function validateMiddleware(validations: ValidationChain[],
    validationResult: ResultFactory<ValidationError>) {
    return async (req: ApiRequest, res: NextApiResponse, next: () => Promise<void>) => {
        await Promise.all(validations.map((validation) => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next();
        }

        res.status(422).json({ errors: errors.array() })
    }
}