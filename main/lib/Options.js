// Generated by CoffeeScript 1.10.0

/*
  Generate Release
  Kevin Gravier
  MIT License
 */

(function() {
  var Options, Path, args, bool, existsSync;

  existsSync = require('exists-sync');

  Path = require('path');

  bool = require('@nkcmr/bool');

  args = {
    readme_file_location: ['m', 'readme'],
    package_file_location: ['p', 'package'],
    current_version: ['c', 'current-version'],
    release_type: ['r', 'release'],
    no_confirm: ['n', 'no-confirm']
  };

  Options = (function() {
    function Options() {}

    Options.prototype.readme_file_location = './README.md';

    Options.prototype.package_file_location = './package.json';

    Options.prototype.no_confirm = false;

    Options.prototype.release_type = null;

    Options.prototype.current_version = null;

    Options.prototype.parseArgs = function(args) {
      this.args = args;
      this.no_confirm = bool(this.getArgumentValue('no_confirm'));
      this.readme_file_location = Path.resolve((this.getArgumentValue('readme_file_location')) || this.readme_file_location);
      this.package_file_location = Path.resolve((this.getArgumentValue('package_file_location')) || this.package_file_location);
      this.current_version = (this.getArgumentValue('current_version')) || this.current_version;
      this.release_type = (this.getArgumentValue('release_type')) || this.release_type;
      return this.validateArguments();
    };

    Options.prototype.validateArguments = function() {
      return this.validateReadmeFileLocation() || this.validatePackageFileLocation() || this.validateReleaseType() || this.validateNoConfirm();
    };

    Options.prototype.validateReadmeFileLocation = function() {
      return existsSync(this.readme_file_location);
    };

    Options.prototype.validatePackageFileLocation = function() {
      return existsSync(this.package_file_location);
    };

    Options.prototype.validateCurrentVersion = function() {
      return (!this.current_version) || (this.current_version.test(/(\d+\.){2}\d+/));
    };

    Options.prototype.validateReleaseType = function() {
      var ref;
      return (!this.release_type) || ((ref = this.release_type) === 'patch' || ref === 'minor' || ref === 'major');
    };

    Options.prototype.validateNoConfirm = function() {
      return typeof this.no_confirm === 'boolean';
    };

    Options.prototype.getArgumentValue = function(argument) {
      var arg, t;
      t = this;
      return ((function() {
        var i, len, ref, results;
        ref = args[argument];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          arg = ref[i];
          if (t.args[arg]) {
            results.push(t.args[arg]);
          }
        }
        return results;
      })())[0];
    };

    return Options;

  })();

  module.exports = Options;

}).call(this);
