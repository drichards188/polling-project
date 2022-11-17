import counterReducer, {
    PollingState,
    increment,
    decrement,
    incrementByAmount,
} from './pollingSlice';

describe('counter reducer', () => {
    const initialState: PollingState = {
        value: 0,
        user: {id: 12, name: 'drichards', company: 'envoloperty', answered: [13, 255, 162, 18, 22], created: [92, 1, 5, 15]},
        userList: [
            {id: '12',
                name: 'drichards',
                company: 'enveloperty',
                answered: ['13', '255', '162', '18', '22'],
                created: ['92', '1', '5', '15']},
            {id: '13',
                name: 'arichards',
                company: 'ef go ahead',
                answered: ['13', '255', '162', '18', '22'],
                created: ['92', '1', '5', '15']},
            {id: '14',
                name: 'krichards',
                company: 'enveloperty',
                answered: ['13', '255', '162', '18', '22'],
                created: ['92', '1', '5', '15']}
        ],
        polls: [{
            id: 1,
            option1: 'write in JS',
            option2: 'write in TS',
            answered1: 22,
            answered2: 5
        }],
        questions: {},
        status: 'idle',
    };
    it('should handle initial state', () => {
        expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
            value: 0,
            status: 'idle',
        });
    });

    it('should handle increment', () => {
        const actual = counterReducer(initialState, increment());
        expect(actual.value).toEqual(4);
    });

    it('should handle decrement', () => {
        const actual = counterReducer(initialState, decrement());
        expect(actual.value).toEqual(2);
    });

    it('should handle incrementByAmount', () => {
        const actual = counterReducer(initialState, incrementByAmount(2));
        expect(actual.value).toEqual(5);
    });
});
