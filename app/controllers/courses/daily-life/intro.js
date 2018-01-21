import Controller from '@ember/controller';
import { later } from '@ember/runloop';

export default Controller.extend({
	loading: false,
	loggedIn: false,

	actions: {
		coinbaseLogin() {
			this.set('loading', true);

			later(this, function() {
				this.set('loading', false);
				this.set('loggedIn', true);
			}, 2000);
		}
	}
});
