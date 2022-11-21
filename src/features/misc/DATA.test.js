import {_saveQuestion, _saveQuestionAnswer} from "./DATA";

describe('_saveQuestion', () => {
    it('will return question object if successful', async () => {
        const questionData = {
            author: 'sarahedo',
            optionOneText: 'pass',
            optionTwoText: 'fail'
        }
        let resp = await _saveQuestion(questionData);
        expect(resp.id).toBeDefined();
        expect(resp.author).toBeDefined();
        expect(resp.optionOne.text).toEqual(questionData.optionOneText);
        expect(resp.optionTwo.text).toEqual(questionData.optionTwoText);
        expect(resp.timestamp).toBeDefined();
    });

    it('wil return an error for an invalid request', async () => {
        let resp = _saveQuestion({author: 'sarahedo'});
        await expect(resp).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    })
});

describe('_saveQuestionAnswer', () => {
    it('will return true if successful', async () => {
        const answerData = {
            authedUser: 'sarahedo',
            qid: 'vthrdm985a262al8qx3do',
            answer: 'optionOne'
        };

        let resp = await _saveQuestionAnswer(answerData);
        expect(resp).toEqual(true);
    });

    it('will return error for an invalid request', async () => {
        let resp = _saveQuestionAnswer({author: 'sarahedo'});
        await expect(resp).rejects.toEqual('Please provide authedUser, qid, and answer');
    })
})