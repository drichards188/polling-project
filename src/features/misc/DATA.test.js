import {_saveQuestion} from "./DATA";

describe('_saveQuestion', () => {
    it('will return question object if successful', async() => {
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

    // it('will return an error if the id is not found', async() => {
    //     var unknownId = 55;
    //     await expect(getUserById(unknownId)).rejects.toEqual('User with ID ' + unknownId + ' not found.');
    // });
});