/**
 * Bunyan
 *
 * Factory for the Bunyan logger
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
var bunyan = require("bunyan");
var steeplejack = require("steeplejack");

var Base = steeplejack.Base;
var datatypes = Base.datatypes;


/* Files */
var Logger = require("./Logger");


module.exports = Logger.extend({


    _construct: function (options) {

        options = datatypes.setObject(options, {});

        this._logger = bunyan.createLogger({
            name: options.name
        });

        /* Set the log level - default to error */
        var logLevel = datatypes.setString(options.logLevel, "error");

        /* Set the log level */
        this.setLevel(logLevel);

        return this;

    },


    _setLevel: function (level) {
        this._logger.level(level);
    },


    _trigger: function (level, message) {

        var rtn;

        switch (level) {

            case 5: {
                rtn = this._logger.error(message);
                break;
            }

            case 4: {
                rtn = this._logger.warn(message);
                break;
            }

            case 3: {
                rtn = this._logger.info(message);
                break;
            }

            case 2: {
                rtn = this._logger.debug(message);
                break;
            }

            case 1: {
                rtn = this._logger.trace(message);
                break;
            }

            default: {
                rtn = this._logger.fatal(message);
                break;
            }

        }

        return rtn;

    }


});
