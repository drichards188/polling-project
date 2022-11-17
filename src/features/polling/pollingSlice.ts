import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import {_getQuestions, _getUsers} from "../misc/DATA";

export interface PollingState {
    value: number;
    user: any,
    userList: any,
    polls: any,
    questions: any,
    status: 'idle' | 'loading' | 'failed';
}

//todo add to each answered poll which one the user voted for
const initialState: PollingState = {
    value: 0,
    user: {
        // id: '12',
        // name: 'drichards',
        // company: 'enveloperty',
        // answered: ['13', '255', '162', '18', '22'],
        // created: ['92', '1', '5', '15']
    },
    userList: [
        {
            id: '12',
            name: 'drichards',
            company: 'enveloperty',
            answered: ['13', '255', '162', '18', '22'],
            created: ['92', '1', '5', '15']
        },
        {
            id: '13',
            name: 'arichards',
            company: 'ef go ahead',
            answered: ['13', '255', '22'],
            created: ['92', '1', '5', '15']
        },
        {
            id: '14',
            name: 'krichards',
            company: 'enveloperty',
            answered: ['13'],
            created: ['92', '1', '5', '15']
        },
        {
            id: '15',
            name: 'mrichards',
            company: 'enveloperty',
            answered: ['13', '1'],
            created: ['92', '1', '5', '15', '22', '98', '2', '3', '21', '110', '98', '62']
        }
    ],
    polls: [{
        id: '1',
        author: 'jrichards',
        option1: 'write in JS',
        option2: 'write in TS',
        answered1: 22,
        answered2: 5, time: '1519211809934', date: '11/22/2022'
    }, {
        id: '13',
        author: 'arichards',
        option1: 'War Thunder',
        option2: 'Borderlands',
        answered1: 22,
        answered2: 5, time: '1519211810362', date: '11/22/2022'
    }, {
        id: '255',
        author: 'krichards',
        option1: 'lululemon',
        option2: 'North Face',
        answered1: 22,
        answered2: 5, time: '1519211811670', date: '11/22/2022'
    }],
    questions: {},
    status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
    'polling/fetchCount',
    async (amount: number) => {
        // const response = await fetchCount(amount);
        const response = {data: 123}
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const populateStore = createAsyncThunk(
    'polling/populateStore',
    async () => {
        let questionResp = await _getQuestions();

        let userResp = await _getUsers();

        return [questionResp, userResp];
    }
)

export const pollingSlice = createSlice({
    name: 'polling',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        catalogVote: (state, action: PayloadAction<any>) => {
            const vote = action.payload.vote;
            const questionId = action.payload.id;
            let newPollsState = state.questions.map((poll: any) => {
                if (poll.id === action.payload.id) {
                    state.user.answers[questionId] = vote;
                    if (vote === 'optionOne') {
                        poll.optionOne.votes.push(state.user.id);
                    } else {
                        poll.optionTwo.votes.push(state.user.id);
                    }
                    return poll;
                } else {
                    return poll;
                }
            })
            state.questions = newPollsState;
        },
        addPoll: (state, action: PayloadAction<any>) => {
            state.polls.push(action.payload.poll);
            let oldList = state.polls;
            let list = oldList.sort((a: any, b: any) => {
                    return b.time - a.time;
                }
            )
            state.polls = list;
        },
        login: (state, action: PayloadAction<any>) => {
            state.user = action.payload.user;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            })
            .addCase(incrementAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(populateStore.fulfilled, (state, action) => {
                state.status = 'idle';

                let questionArray = Object.keys(action.payload[0]).map((key) => action.payload[0][key]);

                state.questions = questionArray;

                let userArray = Object.keys(action.payload[1]).map((key) => action.payload[1][key]);

                state.userList = userArray;
            });
    },
});

export const {increment, decrement, incrementByAmount, catalogVote, addPoll, login} = pollingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.polling.value;
export const selectUser = (state: RootState) => state.polling.user;
export const selectQuestions = (state: RootState) => state.polling.questions;
export const selectUserList = (state: RootState) => state.polling.userList;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
    (amount: number): AppThunk =>
        (dispatch, getState) => {
            const currentValue = selectCount(getState());
            if (currentValue % 2 === 1) {
                dispatch(incrementByAmount(amount));
            }
        };

export default pollingSlice.reducer;
