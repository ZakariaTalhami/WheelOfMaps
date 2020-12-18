export function skipMethod(fn, method = []) {
    return function (req, res, next) {
        if (method.includes(req.method)) {
            next();
        } else {
            fn(req, res, next);
        }
    };
}
