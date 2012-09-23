module.exports = function (app){
  app.get('/user', function(req, res) {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify({users: ['bill','kristi'], total: 2, pages: 0}));
  });

  // EG: /user/bill, /user/kristi
  app.get('/user/:id', function(req, res) {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify({name: req.params.id, email: 'test@test.net'}));
  });
};