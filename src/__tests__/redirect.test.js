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
            EVENT_1: [actionCreatorA, actionCreatorB],
            EVENT_2: actionCreatorA,
        };

        redirect = redirectActions(config);
    });

    describe('Dispatch an array of actions present in the redirect config', () => {
        it('should dispatch an array of actions', () => {
            redirect(store)(identity)({
                type: 'EVENT_1',
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
                type: 'EVENT_2',
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
                type: 'EVENT_3',
                payload: {
                    id: 'abc-def-ghi',
                },
            });

            expect(actionCreatorA.mock.calls.length).toBe(0);
            expect(actionCreatorB.mock.calls.length).toBe(0);
        });
    });
});
