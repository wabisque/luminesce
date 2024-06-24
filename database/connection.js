import { createConnection } from 'mysql2/promise';

export default class Connection {
  /** @type {import('../application/application.js').default} */
  #app;
  /** @type {import('mysql2/promise').Connection} */
  #proxy;

  /**
   * @param {import('../application/application.js').default} app
   */
  constructor(app) {
    this.#app = app;
  }

  /**
   * @returns {Promise<void>}
   */
  async connect() {
    const database = this.#app.config.get('db.database');
    const host = this.#app.config.get('db.host');
    const port = this.#app.config.get('db.port');
    const { username: user, password } = await this.#app.secrets.get();

    this.#proxy = await createConnection({
      host,
      port,
      user,
      password,
      namedPlaceholders: true,
    });
    
    await this.#proxy.connect();
    
    await this.#setup(database);
  }

  /**
   * @return {Promise<void>}
   */
  async disconnect() {
    await this.#proxy.end();
  }

  /**
   * @param {string} command 
   * @param  {Record<string, *>} [options]
   * @returns {Promise<Record<string, *>[]>}
   */
  async execute(command, options = undefined) {
    const [ records ] = await this.#proxy.query(command, options);

    return records;
  }

  /**
   * @returns {Promise<void>}
   */
  async reset() {
    const database = this.#app.config.get('db.database');

    await this.#proxy.query(`DROP DATABASE IF EXISTS \`${database}\``);

    await this.#setup(database);
  }

  /**
   * @return {Promise<void>}
   */
  async #setup(database) {
    await this.#proxy.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await this.#proxy.query(`USE \`${database}\`;`);
    await this.#proxy.query(`
      CREATE TABLE IF NOT EXISTS \`migrations\`
        (
          \`id\` INT UNSIGNED AUTO_INCREMENT NOT NULL,
          \`migration\` VARCHAR(512) NOT NULL,
          \`batch\` INT UNSIGNED NOT NULL,
          CONSTRAINT \`migrations_id_primary_key\` PRIMARY KEY (\`id\`),
          CONSTRAINT \`migrations_migration_unique_key\` UNIQUE (\`migration\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    `);
  }
}
