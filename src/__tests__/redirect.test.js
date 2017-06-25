import identity from 'lodash/identity';
import redirectActions from '../';

describe('Intercept action middlware', () => {
    let redirect;
    let actionCreatorA;
    let actionCreatorB;
    let config;
    const store = {
        dispatch: action => action,
    };

    beforeEach(() => {
        actionCreatorA = jest.fn();
        actionCreatorB = jest.fn();

        config = {
            MEMBERSHIP_EVENT_MEMBERSHIP_ADDED_READY: [actionCreatorA, actionCreatorB],
            MEMBERSHIP_EVENT_PARENT_UPDATED_READY: actionCreatorA,
        };

        redirect = redirectActions(config);
    });

    describe('Dispatch an array of actions present in the redirect config', () => {
        it('should dispatch an array of actions', () => {
            redirect(store)(identity)({
                type: 'MEMBERSHIP_EVENT_MEMBERSHIP_ADDED_READY',
                payload: {
                    id: 'abc-def-ghi',
                },
            });

            expect(actionCreatorA.mock.calls.length).toBe(1);
            expect(actionCreatorB.mock.calls.length).toBe(1);
        });
    });

    describe('Dispatch a single action present in the redirect config', () => {
        it('should dispatch single action', () => {
            redirect(store)(identity)({
                type: 'MEMBERSHIP_EVENT_PARENT_UPDATED_READY',
                payload: {
                    id: 'abc-def-ghi',
                },
            });

            expect(actionCreatorA.mock.calls.length).toBe(1);
            expect(actionCreatorB.mock.calls.length).toBe(0);
        });
    });

    describe('Skip dispatch because no action type found in config', () => {
        it('should dispatch an action we do not know about', () => {
            redirect(store)(identity)({
                type: 'ACCESS_CONTROL_SET_STATUS_TYPES',
                payload: {
                    id: 'abc-def-ghi',
                },
            });

            expect(actionCreatorA.mock.calls.length).toBe(0);
            expect(actionCreatorB.mock.calls.length).toBe(0);
        });
    });
});
