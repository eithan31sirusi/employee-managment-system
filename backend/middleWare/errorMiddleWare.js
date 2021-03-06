
// create a modular error URL.
const notFound = (req, res, next) => {
    // send the current url with the error.
    const error = new Error(`not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) =>  {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
    // console.log(req.originalUrl);
    next()
}

export { notFound, errorHandler }