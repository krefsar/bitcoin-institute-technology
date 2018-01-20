import Controller from '@ember/controller';

export default Controller.extend({
	acceptableAnswers: ['abc', 'def'],
	testCases: [
		{
			input: 123,
			expected: 'ABC'
		},
		{
			input: 456,
			expected: 'DEF'
		}
	],
	customCode: '',

	modifyCode(customCode) {
		return `let privateKey = arguments[0]; ${customCode}`;
	},

	actions: {
		executeCustomCode() {
			this.get('testCases').forEach((testCase) => {
				let modifiedCode = this.modifyCode(this.get('customCode'));

				let result = new Function(modifiedCode)(testCase.input);
				if (result === testCase.expected) {
					alert('you got it right!');
				} else {
					alert(`you returned ${result} and we expected ${testCase.expected}`);
				}
			});
		}
	}
});
