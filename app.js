/* importar as configurações do servidor*/
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(3000, function(){
	console.log('Servidor on');
});

module.exports = function(app, req, res) {
	app.post('/login', (req, res) => {
		res.render('login');
	})
	// app.post('/login', () => {
		
	// }
	// )
	}