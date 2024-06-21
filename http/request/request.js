export default class Request {
  /** @type {string} */
  body;
  /** @type {Record<string, string>} */
  headers;
  /** @type {import('../routing/route-match.js').default} */
  match;
  /** @type {'get'|'post'|'put'|'delete'|'options'} */
  method;
  /** @type {string} */
  path;
  /** @type {string} */
  search;

  /**
   * @param {'get'|'post'|'put'|'delete'|'options'} method
   * @param {string} path
   * @param {Record<string, string>} headers
   * @param {string} [body]
   * @param {string} [search]
   */
  constructor(method, path, headers, body = '', search = '') {
    this.method = method;
    this.path = path;
    this.headers = headers;
    this.body = body;
    this.search = search;
  }
}
