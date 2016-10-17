import computed from 'ember-computed';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  namespace: '/api/edge',
  session: service(),

  headers: computed('session.isAuthenticated', {
    get() {
      const headers = {
        accept: 'application/vnd.api+json'
      };
      const isAuthenticated = get(this, 'session.isAuthenticated');
      if (isAuthenticated) {
        get(this, 'session').authorize('authorizer:application', (headerName, headerValue) => {
          headers[headerName] = headerValue;
        });
      }
      return headers;
    }
  })
});
