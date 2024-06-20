export default class Middleware {
  /** @type {import('../../application/application.js').default} */
  get _app() {
    return this.#app;
  }
  /** @type {import('../request/request.js').default} */
  get _request() {
    return this.#request;
  }
  /** @type {import('../../application/application.js').default} */
  #app;
  /** @type {import('../request/request.js').default} */
  #request;

  /**
   * @param {import('../../application/application.js').default} app
   * @param {import('../request/request.js')} request
   */
  constructor(app, request) {
    this.#app = app;
    this.#request = request;
  }

  /**
   * @returns {Promise<import('../request/request.js').default|import('../response/response.js').default|void>}
   */
  async execute() {
    throw new Error('Not implemented');
  }
}
