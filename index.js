import Application from './application/application.js';
import Configuration from './configuration/configuration.js';
import Command from './console/command.js';
import Console from './console/console.js';
import Connection from './database/connection.js';
import Facade from './facades/facade.js';
import Hash from './facades/hash.js';
import Router from './facades/router.js';
import Str from './facades/str.js';
import Uuid from './facades/uuid.js';
import Hasher from './hashing/hasher.js';
import Action from './http/action/action.js';
import Middleware from './http/middleware/middleware.js';
import Request from './http/request/request.js';
import Response from './http/response/response.js';
import Route from './http/routing/route.js';
import RouteBinding from './http/routing/route-binding.js';
import RouteBuilder from './http/routing/route-builder.js';
import RouteContext from './http/routing/route-context.js';
import RouteContextStack from './http/routing/route-context-stack.js';
import RouteGroupBuilder from './http/routing/route-group-builder.js';
import RouteMatch from './http/routing/route-match.js';
import StrUtility from './utilities/str.js';
import UuidUtility from './utilities/uuid.js';

export const application = {
  Application,
};

export const configuration = {
  Configuration,
};

export const console = {
  Command,
  Console,
};

export const database = {
  Connection,
};

export const facades = {
  Facade,
  Hash,
  Router,
  Str,
  Uuid,
};

export const hashing = {
  Hasher,
};

export const http = {
  action: {
    Action,
  },
  middleware: {
    Middleware,
  },
  request: {
    Request,
  },
  response: {
    Response,
  },
  routing: {
    Route,
    Router,
    RouteBinding,
    RouteBuilder,
    RouteContext,
    RouteContextStack,
    RouteGroupBuilder,
    RouteMatch,
  },
};

export const utilities = {
  Str: StrUtility,
  Uuid: UuidUtility,
};

export default {
  application,
  configuration,
  console,
  database,
  facades,
  hashing,
  http,
  utilities,
};
