module.exports = {
	secret: 'sodysseyodysseywherearethouodysseys',
	db_port: {
		production: process.env.PORT || 8080,
		development: 8080,
		test: 8000	
	},
	db_path: {
		production: '',
		development: 'mongodb://127.0.0.1:27017/reader',
		test: 'mongodb://127.0.0.1:27017/reader_test'
	}
};