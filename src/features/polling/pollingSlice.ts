import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from "../misc/DATA";

export interface PollingState {
    value: number;
    user: any,
    userList: any,
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

export const saveAnswer = createAsyncThunk(
    'polling/saveAnswer',
    async (args: any) => {
        let resp = await _saveQuestionAnswer({authedUser: args.authedUser, qid: args.qid, answer: args.answer});

    }
)

export const saveQuestion = createAsyncThunk(
    'polling/saveQuestion',
    async (questionData: any) => {

        let resp = await _saveQuestion(questionData);
    }
)

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
                if (userArray && state.user.id) {
                    let currentUser = userArray.find((user) => user.id === state.user.id);
                    state.user = currentUser;
                }
            });
    },
});

export const {login} = pollingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.polling.user;
export const selectQuestions = (state: RootState) => state.polling.questions;
export const selectUserList = (state: RootState) => state.polling.userList;

export default pollingSlice.reducer;
