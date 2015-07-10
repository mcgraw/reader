global.chai = require('chai');
global.expect = global.chai.expect;
global.assert = global.chai.assert;
global.should = global.chai.should();

// ensure NODE_ENV is set to 'test'
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.TEST_ENV = process.env.TEST_ENV || 'test';
