export default class Request {
  /** @type {Record<string, *>} */
  body;
  /** @type {Record<string, string>} */
  headers;
  /** @type {import('../routing/route-match.js').default} */
  match;
  /** @type {'get'|'post'|'put'|'delete'|'options'} */
  method;
  /** @type {string} */
  path;
  /** @type {Record<string, string|string[]>} */
  query;

  /**
   * @param {'get'|'post'|'put'|'delete'|'options'} method
   * @param {string} path
   * @param {Record<string, *>} [body]
   * @param {Record<string, string>} [headers]
   * @param {Record<string, string|string[]>} [query]
   */
  constructor(method, path, body = {}, headers = {}, query = {}) {
    this.method = method;
    this.path = path;
    this.headers = headers;
    this.body = body;
    this.query = query;
  }
}
