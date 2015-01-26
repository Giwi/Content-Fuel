module.exports = function(app) {
  app.get('/ngi18n', function(req, res) {
    res.sendfile('public/js/lib/angular-i18n/angular-locale_'+req.locale.toString().replace("_", "-").toLowerCase()+'.js');
  });
};