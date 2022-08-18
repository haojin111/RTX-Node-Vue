// request params and payload validation
import tourValidate from "./tour.js";

// validate middleware
function validateMiddleware(schema) {
    return (req, res, next) => {
        const schemaKeys = Object.keys(schema);
        let valid = true;
        let err = null;
        for (var i = 0; i < schemaKeys.length; i++) {
            const { error } = schema[schemaKeys[i]].validate(req[schemaKeys[i]]);
            valid = error == null;
            if (!valid) {
                err = error;
                break;
            }
        }

        if (valid) {
            next();
        } else {
            const e = new Error(err);
            e.status = 400;
            throw e;
        }
    }
};

export { validateMiddleware, tourValidate };