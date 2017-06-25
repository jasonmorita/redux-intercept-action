"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/* Redux middlware to intercept actions and redirect
    them to other action creators to handle the payloads.
    actions arg should be in the shape of:
    {
        types.TYPE_NAME: [actionCreatorA, actionCreatorB],
        types.TYPE_NAME: actionCreator,
        types.TYPE_NAME: actionCreator,
    }
*/
exports.default = function () {
    var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (store) {
        return function (next) {
            return function (action) {
                var actionCreator = actions[action.type];

                if (actionCreator) {
                    if (Array.isArray(actionCreator)) {
                        return actionCreator.forEach(function (ac) {
                            return store.dispatch(ac(action));
                        });
                    }

                    return store.dispatch(actionCreator(action));
                }

                return next(action);
            };
        };
    };
};