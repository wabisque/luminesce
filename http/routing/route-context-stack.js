export default class RouteContextStack {
  /** @type {Record<string, typeof import('./route-binding.js').default>} */
  get bindings() {
    return this.#bindings;
  }
  /** @type {(import('../middleware/middleware-builder.js').default|typeof import('../middleware/middleware.js').default)[]} */
  get middleware() {
    return this.#middleware;
  }
  /** @type {string} */
  get path() {
    return this.#path;
  }
  /** @type {Record<string, typeof import('./route-binding.js').default>} */
  #bindings;
  /** @type {(import('../middleware/middleware-builder.js').default|typeof import('../middleware/middleware.js').default)[]} */
  #middleware;
  /** @type {string} */
  #path;

  /**
   * 
   * @param {string} [path]
   * @param {(import('../middleware/middleware-builder.js').default|typeof import('../middleware/middleware.js').default)[]} [middleware] 
   * @param {Record<string, typeof import('./route-binding.js').default>} [bindings] 
   */
  constructor(path = '', middleware = [], bindings = {}) {
    this.#path = path;
    this.#middleware = middleware;
    this.#bindings = bindings;
  }
}
