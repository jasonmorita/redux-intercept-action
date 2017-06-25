/* Redux middlware to intercept actions and redirect
    them to other action creators to handle the payloads.
    actions arg should be in the shape of:
    {
        types.TYPE_NAME: [actionCreatorA, actionCreatorB],
        types.TYPE_NAME: actionCreator,
        types.TYPE_NAME: actionCreator,
    }
*/
export default (actions = {}) => store => next => (action) => {
    const actionCreator = actions[action.type];

    if (actionCreator) {
        if (Array.isArray(actionCreator)) {
            return actionCreator.forEach(ac => store.dispatch(ac(action)));
        }

        return store.dispatch(actionCreator(action));
    }

    return next(action);
};
