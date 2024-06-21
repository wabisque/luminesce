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
  query;

  /**
   * @param {'get'|'post'|'put'|'delete'|'options'} method
   * @param {string} path
   * @param {Record<string, string>} headers
   * @param {string} [body]
   * @param {string} [query]
   */
  constructor(method, path, headers, body = '', query = '') {
    this.method = method;
    this.path = path;
    this.headers = headers;
    this.body = body;
    this.query = query;
  }
}
