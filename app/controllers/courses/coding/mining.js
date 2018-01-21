import Controller from '@ember/controller';
import crypto from 'npm:crypto-js';
import { later } from '@ember/runloop';

export default Controller.extend({
	apiEnabled: false,
	customCode: '',
	resultsArray: [],
	finished: false,

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
			this.set('executing', true);

			let testCases = this.generateTestCases(3);

			let resultsArray = this.get('resultsArray');

			testCases.forEach((testCase) => {
				let modifiedCode = this.modifyCode(this.get('customCode'));

				let result = new Function(modifiedCode)(testCase.input, crypto);

				resultsArray.pushObject({
					result,
					success: result == testCase.expected
				});
			});

			later(this, function() {
				this.set('result1', resultsArray.objectAt(0));
			}, 2000);

			later(this, function() {
				this.set('result2', resultsArray.objectAt(1));
			}, 2250);

			later(this, function() {
				this.set('result3', resultsArray.objectAt(2));
			}, 2500);

			later(this, function() {
				this.set('finished', true);
			}, 4000);
		},

		toggleApi() {
			this.toggleProperty('apiEnabled');
		}
	}
});
