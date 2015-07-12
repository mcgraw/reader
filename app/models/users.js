var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

var User = new Schema( {
	email: {
		type: String,
		required: true,	
		index: { unique: true }
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	biography: {
		type: String
	},
	admin: {
		type: Boolean,
		default: false,
		select: false
	},
	photo_url: {
		type: String
	},
	authored: [{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article'
		}, 
		title: {
			type: String
		},
		language: {
			type: String
		},
		select: false
	}],
	purchased: [{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article'
		}, 
		title: {
			type: String
		},
		language: {
			type: String
		},
		select: false
	}],
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

// Make sure any password updates are hashed
User.pre('save', function(next) {
	var user = this;
	
	// hash only if the password changed or the user is new
	if (!user.isModified('password')) return next();
	
	// generate hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

// Compare the provided password against the database hash
User.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
}

exports.User = User;