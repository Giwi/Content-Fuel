/**
 * Module EventBus
 *
 * @class contentfuel.eventbus
 * @author Giwi
 * @copyright <b>Giwi</b>.
 */
angular.module('contentfuel.eventbus', [])

    .factory('eventbus', function ($rootScope) {
        'use strict';
        var sharedService = {message : '', data : {}};

        /**
         * @memberOf contentfuel.eventbus
         * @function prepForBroadcast
         * @description Poste d'un message sur le bus
         * @param {String} msg nom du topic
         * @param {Object} data objet passé
         */
        sharedService.prepForBroadcast = function (msg, data) {
            this.message = msg;
            this.data = data;
            this.broadcastItem();
        };
        /**
         * @memberOf contentfuel.eventbus
         * @function broadcastItem
         * @description Propagation du message
         * @private
         */
        sharedService.broadcastItem = function () {
            $rootScope.$broadcast('eventbus');
        };

        return sharedService;
    });

