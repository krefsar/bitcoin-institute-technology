import Controller from '@ember/controller';
import crypto from 'npm:crypto-js';

export default Controller.extend({
	customCode: '',

	modifyCode(customCode) {
		return `const crypto = arguments[1]; let privateKey = arguments[0]; ${customCode}`;
	},

	generateTestCases(numDesired) {
		let testCases = [];

		for (var i = 0; i < numDesired; i++) {
			let privateKey = `test__${i}`;
			let modifiedPrivateKey = `0x80${privateKey}`;
			let hashed = crypto.SHA256(modifiedPrivateKey);
			let doubleHashed = crypto.SHA256(hashed)

			testCases.push({
				input: privateKey,
				expected: doubleHashed.toString()
			});
		}

		return testCases;
	},

	actions: {
		executeCustomCode() {
			let testCases = this.generateTestCases(3);

			testCases.forEach((testCase) => {
				let modifiedCode = this.modifyCode(this.get('customCode'));

				let result = new Function(modifiedCode)(testCase.input, crypto);
				if (result == testCase.expected) {
					alert('you got it right!');
				} else {
					alert(`you returned ${result} and we expected ${testCase.expected}`);
				}
			});
		}
	}
});
