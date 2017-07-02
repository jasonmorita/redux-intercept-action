# redux-intercept-action
Redux middleware to intercept and redirect FSA actions before they hit reducers.

Useful for handling actions coming in asyncronously from outside your app.

For example, you have a [Pusher](https://pusher.com/) channel connection that is receiving [Flux Standard Actions](https://github.com/acdlite/flux-standard-action) that you need to respond to rather than use to update app state. Rather than send the action to a reducer, you may need to do something first, such as fetch data based on the payload of the action.

To use, configure the middleware with an object with the action TYPEs you would like to intercept and pass the middleware to `applyMiddleware`.

When a dispatched action matches a TYPE in the config map, that action is forwarded to the `actionCreator`(s) specified for that TYPE.

```javascript
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import intercept from 'redux-intercept-action';
import * as types from './types';
import { handlePusherMessage, fetchSomeData, updateUserList } from './actions';

const redirectActions = {
    [types.PUSHER_MESSAGE_SENT]: [
        handlePusherMessage,
        fetchSomeData,
    ],

    [types.PUSHER_USER_JOINED]: updateUserList,
};

const storeFactory = applyMiddleware(
    intercept(redirectActions),
    thunk,
)(createStore);

// actions.js
export const fetchSomeData = ({ payload: { id }}) => (dispatch, getState) => {
    const someData = await fetch('/api', id);

    dispatch({
      type: 'GOT_DATA',
      payload: someData
   });

```
