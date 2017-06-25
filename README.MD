# redux-intercept-action
Middleware to intercept and redirect actions when they are dispatched.

Useful for handling actions coming in asyncronously from outside your app.

For example, you have a [Pusher](https://pusher.com/) channel connection that is receiving [Flux Standard Actions](https://github.com/acdlite/flux-standard-action) that you need to respond to rather than use to update app state. Rather than send the action to a reducer, you may need to do something first, such as fetch data based on the payload of the action.

To use, configure the middleware with an object with the action TYPEs you would like to intercept and pass the middleware to `applyMiddleware`.

Any time an action is dispatched with a TYPE that matches the TYPE in the map, that action will be forwarded to the `actionCreator`(s)

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import redirect from 'redirect-action-middleware';
import * as types from './types';

const redirectActions = {
    [types.PUSHER_MESSAGE_SENT]: [
        handlePusherMessage,
        fetchSomeData,
    ],

    [types.PUSHER_USER_JOINED]: updateUserList,
};

const storeFactory = applyMiddleware(
    redirect(redirectActions),
    thunk,
)(createStore);
```
