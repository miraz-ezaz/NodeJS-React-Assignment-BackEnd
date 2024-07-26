const { Pool } = require('pg');
const config = require('./config.json');

const pool = new Pool(config);

module.exports = pool;
