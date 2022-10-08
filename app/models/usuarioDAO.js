function usuarioDAO(connection){//classe com objetivo de acesso a dados data acess object
	this._connection = connection;
}

usuarioDAO.prototype.loginUsuarioA = function(user, senha, callback){
	this._connection.query('select * from usuarioA where user_name = ? AND senha = ?', [user,senha], callback);
}

module.exports = function(){
	return usuarioDAO;
}