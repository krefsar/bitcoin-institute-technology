import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('courses', function() {
    this.route('coding', function() {
      this.route('mining');
    });

    this.route('daily-life', function() {
      this.route('intro');
    });
  });
});

export default Router;
