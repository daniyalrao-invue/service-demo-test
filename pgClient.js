const { Pool } = require('pg');

class PgClient {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      min: process.env.DB_POOL_MIN || 1,
      max: process.env.DB_POOL_MAX || 10
    });

    this.pool.on('error', (error) => {
      console.error({ err : error }, 'Unexpected error on pg pool idle client');
    });
  }

  async getDBInstance() {
    try {
      const client = await this.pool.connect();
      return client;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  closeDBInstance() {
    this.pool.end();
  }
}

module.exports = new PgClient();