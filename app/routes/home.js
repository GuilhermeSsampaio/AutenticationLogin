module.exports = function(app) {
	app.get('/', function(req, res){
		app.app.controllers.home.home(app, req, res);
	});

	app.post('/usuarioA/sair', function(req,res){
		app.app.controllers.home.logout_usuarioA(app, req, res);
	});
	
}