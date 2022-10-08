module.exports.home = function(app, req, res) {	
	if (!req.session.loggedin)
	{
		if (!req.session.loggedin1){
		  res.render('index');
		}
		else{
           res.render('form_add_noticia', {validacao:{}, noticia:{}});
		}
	} 
		else 

	{
		res.redirect('/home');
	}
}

module.exports.login_usuarioA = function(app, req, res){
	var user = req.body.user_name;
	var senha = req.body.senha;
	if (user && senha) {
		var connection = app.config.dbConnection();//recupera modulo que conecta com o banco
		var usuarioA_Model = new app.app.models.UsuarioA_DAO(connection);
		usuarioA_Model.loginUsuarioA(user, senha, function(error, result){
			if (result.length > 0) {
					req.session.loggedin = true;
					req.session.user = user;
					res.redirect('/home');
				} else {
					res.send('Usuário ou senha incorretos!');
				}			
				res.end();
			});
		}
			else {
			res.send('Por favor, entre com o usuário e a senha!');
			res.end();
	}
}


// module.exports.login_usuarioB = function(app, req, res){
// 	var user = req.body.user_name;
// 	var senha = req.body.senha;
// 	if (user && senha) {
// 		var connection = app.config.dbConnection();//recupera modulo que conecta com o banco
// 		var usuarioB_Model = new app.app.models.UsuarioB_DAO(connection);
// 		usuarioB_Model.loginUsuarioB(user, senha, function(error, result){
// 			if (result.length > 0) {
// 					req.session.loggedin1 = true;
// 					req.session.user = user;
// 					res.redirect('/home');
// 				} else {
// 					res.send('Usuário ou senha incorretos!');
// 				}			
// 				res.end();
// 			});
// 		}
// 			else {
// 			res.send('Por favor, entre com o usuário e a senha!');
// 			res.end();
// 	}
// }


