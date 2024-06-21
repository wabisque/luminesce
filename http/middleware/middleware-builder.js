export default class MiddlewareBuilder {
  /** @type {*[]} */
  get args() {
    return [
      ...this.#args,
    ];
  }
  /** @type {typeof import('./middleware.js').default} */
  get middleware() {
    return this.#middleware;
  }
  /** @type {*[]} */
  #args;
  /** @type {typeof import('./middleware.js').default} */
  #middleware;

  /**
   * 
   * @param {typeof import('./middleware.js').default} middleware 
   * @param  {...*} args 
   */
  constructor(middleware, ...args) {
    this.#middleware = middleware;
    this.#args = args;
  }

  /**
   * @param {import('../../application/application.js').default} app
   * @param {import('../request/request.js').default} request
   * @returns {import('./middleware.js').default}
   */
  build(app, request) {
    return new this.#middleware(app, request, ...this.#args);
  }
}
