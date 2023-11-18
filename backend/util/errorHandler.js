const globalErrorHandler = (err, req, res, next) => {
    if (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
    else{
        next();
        return;
    }
};

module.exports = {
    globalErrorHandler,
};