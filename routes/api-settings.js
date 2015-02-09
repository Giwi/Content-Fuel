module.exports = function (app) {
    app.get('/*', function (req, res, next) {
        res.setHeader('Last-Modified', (new Date()).toUTCString());
        res.setHeader('Date', new Date().toString());
        next();
    });

}