const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('agent').readAny('package').readOwn('profile').updateOwn('profile');

  ac.grant('dmc')
    .extend('agent')
    .readAny('package')
    .createOwn('package')
    .updateOwn('package')
    .deleteOwn('package')
    .readOwn('profile')
    .updateOwn('profile');

  ac.grant('admin')
    .extend('agent')
    .extend('dmc')
    .createAny('package')
    .updateAny('package')
    .deleteAny('package')
    .readAny('profile')
    .updateAny('profile')
    .readAny('inquiry');

  return ac;
})();
