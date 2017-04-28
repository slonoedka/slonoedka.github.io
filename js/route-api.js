/**
 * Class Route.
 *
 * Example of usage:
 *
 * <pre><code>
 * // "from", "to", "transport" and "transport.type" properties are required
 * const partOfRoutes = [
 *  {
 *    "from": "Moscow",
 *    "to": "Minsk",
 *    "transport": {
 *      "type": "bus",
 *      // Any properties you want
 *      // You define the output logic themselves (see _typesOfTransport)
 *    },
 *  {
 *    "from": "Minsk",
 *    "to": "Kiev",
 *    "transport": {
 *      "type": "flight",
 *      // Any properties you want
 *      // You define the output logic themselves (see _typesOfTransport)
 *    },
 *    ...
 *  }
 * ]
 *
 * // Returns array whose values are messages of the route parts
 * // Example: ['Take train ...', 'Take the airport bus ...', ...]
 * const route = new Route(partOfRoutes);
 * </code></pre>
 *
 * @param {Object[]} partsOfRoute
 * @param {String}   partsOfRoute.from           Departure point.
 * @param {String}   partsOfRoute.to             Arrival point.
 * @param {Object}   partsOfRoute.transport      Description of transport.
 * @param {Object}   partsOfRoute.transport.type Type of transport.
 *
 * @constructor
 *
 * @see _typesOfTransport
 */
function Route(partsOfRoute) {
  if (partsOfRoute) {
    this._partsOfRoute = partsOfRoute;
    let startPartOfRoute = this.getStartPartOfRoute();
    this._setMessage(startPartOfRoute);
    this._composeRoute(startPartOfRoute);
  }
  return this._messages;
}

/**
 * Parts of the route.
 * See example in the DocBlock of this class.
 * @type {Array}
 * @private
 * @see Route
 */
Route.prototype._partsOfRoute = [];

/**
 * Array of the resulting messages.
 * See example in the DocBlock of this class.
 * @type {Array}
 * @private
 * @see Route
 */
Route.prototype._messages = [];

/**
 * Returns start part of the route.
 * @returns {{from: String, to: String, transport: Object}}
 */
Route.prototype.getStartPartOfRoute = function ()
{
  let to = {};
  for (let index in this._partsOfRoute) {
    to[this._partsOfRoute[index].to] = 1;
  }

  for (let index in this._partsOfRoute) {
    if (!to[this._partsOfRoute[index].from]) {
      return this._partsOfRoute[index];
    }
  }
};

/**
 * Composes route: populates an array of messages with messages.
 * @param {{from: String, to: String, transport: Object}} startPartOfRoute
 * @private
 */
Route.prototype._composeRoute = function (startPartOfRoute)
{
  for (let index in this._partsOfRoute) {
    if (startPartOfRoute.to === this._partsOfRoute[index].from) {
      this._setMessage(this._partsOfRoute[index]);
      startPartOfRoute = this._partsOfRoute[index];
      delete this._partsOfRoute[index];
      this._composeRoute(startPartOfRoute);
    }
  }
};

/**
 * Pushes message to an array of messages.
 * @param {{from: String, to: String, transport: Object}} partOfRoute
 * @private
 */
Route.prototype._setMessage = function (partOfRoute)
{
  let typeOfTransport = partOfRoute.transport.type;
  let message =
    this._typesOfTransport[typeOfTransport](partOfRoute, partOfRoute.transport);
  this._messages.push(message);
};

/**
 * Object with logic of messages.
 * To define a new type of transport you must set new property whose value is
 * a function that receive two arguments: "route" and "route.transport". This
 * function should return a string with message. Properties of "transport"
 * object defined by you.
 * @type {object}
 * @private
 * @see Route
 */
Route.prototype._typesOfTransport =
{

  // ---------------------------------------------------------------------------

  "airport bus": function (route, transport)
  {
    return (
      'Take the ' + transport.type +
        ' from ' + route.from + ' to ' + route.to + '. ' +
      transport.seat + '.'
    );
  },

  // ---------------------------------------------------------------------------

  "horse": function (route, transport) {
    return (
      'Take a ' + transport.type + ' ' + transport.identificationNumber +
        ' and go from ' + route.from + ' to ' + route.to + '. ' +
      'Seat ' + transport.seat + '.'
    );
  },

  // ---------------------------------------------------------------------------

  "flight": function (route, transport)
  {
    let baggage;

    switch (transport.baggage.type) {
      case 'ticket':
        baggage =
          'Baggage drop at ticket counter ' +
            transport.baggage.identificationNumber + '.';
        break;
      case 'automatic':
        baggage =
          'Baggage will be automatically transferred from your last leg.';
        break;
      default:
        baggage = '';
    }

    return (
      'From ' + route.from + ', ' +
        'take ' + transport.type + ' ' + transport.identificationNumber +
          'to ' + route.to + '. ' +
      'Seat ' + transport.seat + '. ' +
      'Gate ' + transport.gate + '. ' +
      baggage
    );
  },

  // ---------------------------------------------------------------------------

  "train": function (route, transport) {
    return (
      'Take ' + transport.type + ' ' + transport.identificationNumber + ' ' +
          'from ' + route.from + ' to ' + route.to + '. ' +
      'Seat ' + transport.seat + '.'
    );
  },

  // ---------------------------------------------------------------------------

};
