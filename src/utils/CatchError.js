// function GlobalCatcherError(message , error) {
//     console.log(message);
//     console.log(error);
//     console.log(error.stack);
//     console.log(error.message);
//     console.log(error.name);
//     console.log(error.fileName);
//     console.log(error.lineNumber);
//     console.log(error.columnNumber);
//     console.log(error.stackTraceLimit);
// }


const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).json({
            success: false,
            message: err.message

        })
    }
}

export {asyncHandler};