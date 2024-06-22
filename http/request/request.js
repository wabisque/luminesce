import { JsonParser, QueryParser } from '@dreamitdev/morph';
import Joi from 'joi';

export default class Request {
  /** @type {string} */
  get body() {
    return this.#body;
  }
  /** @type {Record<string, *>} */
  get data() {
    return {
      ...this.#query,
      ...this.#input,
    };
  }
  /** @type {Record<string, string>} */
  get headers() {
    return {
      ...this.#headers,
    };
  }
  /** @type {Record<string, *>} */
  get input() {
    return {
      ...this.#input,
    };
  }
  /** @type {import('../routing/route-match.js').default?} */
  get match() {
    return this.#match;
  }
  /** @type {'get'|'post'|'put'|'delete'|'options'} */
  get method() {
    return this.#method;
  }
  /** @type {Record<string, *>} */
  get parameters() {
    return this.#match?.parameters ?? {};
  }
  /** @type {string} */
  get path() {
    return this.#path;
  }
  /** @type {Record<string, *>} */
  get query() {
    return {
      ...this.#query,
    };
  }
  /** @type {import('../routing/route.js').default?} */
  get route() {
    return this.#match?.route ?? null;
  }
  /** @type {string} */
  get search() {
    return this.#search;
  }
  /** @type {Record<string, *>} */
  get validated() {
    return {
      ...this.#validated,
    };
  }
  /** @type {string} */
  #body;
  /** @type {Record<string, string>} */
  #headers;
  /** @type {Record<string, *>} */
  #input;
  /** @type {import('../routing/route-match.js').default?} */
  #match;
  /** @type {'get'|'post'|'put'|'delete'|'options'} */
  #method;
  /** @type {string} */
  #path;
  /** @type {Record<string, *>} */
  #query;
  /** @type {string} */
  #search;
  /** @type {Record<string, *>} */
  #validated;

  /**
   * @param {'get'|'post'|'put'|'delete'|'options'} method
   * @param {string} path
   * @param {Record<string, string>} headers
   * @param {string} [body]
   * @param {string} [search]
   * @param {import('../routing/route-match.js').default?} [match]
   */
  constructor(method, path, headers, body = '', search = '', match = null) {
    this.#method = method;
    this.#path = path;
    this.#headers = headers;
    this.#body = body;
    this.#search = search;
    this.#match = match;

    this.#input = this.#generateInput();
    this.#query = this.#generateQuery();
    this.#validated = {};
  }

  /**
   * @param {string} key
   * @returns {string?}
   */
  getHeader(key) {
    return Object
      .entries(this.#headers)
      .find(([ existingKey ]) => existingKey.toLocaleLowerCase() == key.toLocaleLowerCase())?.[1]
    ?? null;
  }

  /**
   * @returns {Promise<void>}
   */
  async validate() {
    const schema = await this._validation();

    this.#validated = await schema.validateAsync(
      this.data,
      {
        abortEarly: false,
        allowUnknown: true,
        convert: true,
      }
    );
  }

  /**
   * @returns {Promise<import('joi').ObjectSchema>}
   */
  async _validation() {
    return Joi.object();
  }

  #generateInput() {
    const contentType = this.getHeader('Content-Type');

    if (contentType?.startsWith('application/json') ?? false) {
      return new JsonParser(this.#body).execute();
    }

    if(contentType?.startsWith('application/x-www-form-urlencoded') ?? false) {
      return new QueryParser(this.#body).execute();
    }

    return {
      value: this.#body,
    };
  }

  #generateQuery() {
    return new QueryParser(this.#search).execute();
  }
}
