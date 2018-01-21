import Controller from '@ember/controller';

export default Controller.extend({
	publicKeys: [],

	actions: {
		generatePublicKey() {
			let publicKeys = this.get('publicKeys');
			publicKeys.pushObject({
				address: 'abcdef'
			});
		}
	}
});
