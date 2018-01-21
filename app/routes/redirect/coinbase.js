import Route from '@ember/routing/route';

export default Route.extend({
	beforeModel() {
		console.log('hey were in the redirect route!');
	}
});
