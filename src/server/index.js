const mongoose = require('mongoose')

require('dotenv').config();


const { User, Article } = require('./models')

console.log('SCHEMA')
console.log('USER')
console.log(User)
console.log('ARTICLE')
console.log(Article)
console.log('END SCHEMA')

mongoose.connect(process.env.DB_CONNECTION);


mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function() {

  	console.log('connected to mongodb...');
  	console.log(mongoose.connection)

  	const app = require('./app')

	app.listen(process.env.PORT, () => {
		console.log('listening on port...' + process.env.PORT);
	});
});



