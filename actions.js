exports.act = function(app) {

  app.get('/', function(req, res){
    res.render('index', {
      title: "JSChat",
      startedAt: new Date()
    });
  });

}


