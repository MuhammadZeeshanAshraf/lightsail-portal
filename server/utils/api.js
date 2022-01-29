export const asyncHandler =
  (fn) =>
    (req, res, next, ...args) => {
      const fnReturn = fn(req, res, next, ...args);
      return Promise.resolve(fnReturn).catch(next);
    };
