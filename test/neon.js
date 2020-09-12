var tape = require('tape');
var ssbkeys = require('../');
var fs = require('fs');

tape('getTag', function (t) {
  var hash = 'lFluepOmDxEUcZWlLfz0rHU61xLQYxknAEd6z4un8P8=.sha256';
  var author = '@/02iw6SFEPIHl8nMkYSwcCgRWxiG6VP547Wcp1NW8Bo=.ed25519';
  t.equal(ssbkeys.getTag(hash), 'sha256');
  t.equal(ssbkeys.getTag(author), 'ed25519');
  t.end();
});

tape('loadOrCreateSync can load', function (t) {
  var path = '/tmp/ssb-keys-load_' + Date.now();
  var keys = ssbkeys.generate('ed25519');
  keys.id = keys.id.substring(1);
  fs.writeFileSync(path, JSON.stringify(keys));

  var k2 = ssbkeys.loadOrCreateSync(path);
  t.equal(k2.id, '@' + keys.id);
  t.end();
});

tape('loadOrCreateSync can create', function (t) {
  var path = '/tmp/ssb-keys-create_' + Date.now();
  t.equal(fs.existsSync(path), false);

  var keys = ssbkeys.loadOrCreateSync(path);
  t.true(keys.public.length > 20, 'keys.public is a long string');
  t.true(keys.private.length > 20, 'keys.private is a long string');
  t.true(keys.id.length > 20, 'keys.id is a long string');
  t.end();
});
