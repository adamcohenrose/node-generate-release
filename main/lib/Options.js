// Generated by CoffeeScript 1.10.0

/*
  Generate Release
  Kevin Gravier
  MIT License
 */

(function() {
  var Minimist, Options, Path, existsSync, options;

  existsSync = require('exists-sync');

  Path = require('path');

  Minimist = require('minimist');

  options = {
    show_help: {
      "default": false,
      switches: ['h', 'help'],
      file_key: false,
      validate: function(input) {
        return typeof input === 'boolean';
      }
    },
    quiet: {
      "default": false,
      switches: ['q', 'quiet'],
      file_key: false,
      validate: function(input) {
        return typeof input === 'boolean';
      }
    },
    package_file_location: {
      "default": './package.json',
      switches: ['p', 'package'],
      file_key: 'package_file_location',
      filter: function(input) {
        return Path.resolve(input);
      },
      validate: function(input) {
        return typeof input === 'string' && existsSync(input);
      }
    },
    dot_release_file_location: {
      "default": './.release.json',
      switches: ['d', 'release-file'],
      file_key: false,
      filter: function(input) {
        return Path.resolve(input);
      },
      validate: function(input) {
        return typeof input === 'string';
      }
    },
    no_confirm: {
      "default": false,
      switches: ['n', 'no-confirm'],
      file_key: 'no_confirm',
      validate: function(input) {
        return typeof input === 'boolean';
      }
    },
    release_type: {
      "default": null,
      switches: ['t', 'release-type'],
      file_key: 'release_type',
      validate: function(input) {
        return input === null || (typeof input === 'string' && (input === 'patch' || input === 'minor' || input === 'major'));
      }
    },
    current_version: {
      "default": null,
      switches: ['c', 'current-version'],
      file_key: false,
      validate: function(input) {
        return input === null || typeof input === 'string';
      }
    },
    remote: {
      "default": 'origin',
      switches: ['o', 'remote'],
      file_key: 'remote',
      validate: function(input) {
        return typeof input === 'string';
      }
    },
    skip_git_pull: {
      "default": false,
      switches: ['l', 'skip-git-pull'],
      file_key: 'skip_git_pull',
      validate: function(input) {
        return typeof input === 'boolean';
      }
    },
    skip_git_push: {
      "default": false,
      switches: ['s', 'skip-git-push'],
      file_key: 'skip_git_push',
      validate: function(input) {
        return typeof input === 'boolean';
      }
    },
    release_message: {
      "default": 'Release {version}',
      switches: ['m', 'set-release-message'],
      file_key: 'release_message',
      filter: function(input) {
        if (input === false) {
          return 'Release {version}';
        } else {
          return input;
        }
      },
      validate: function(input) {
        return input === true || typeof input === 'string';
      }
    },
    pre_commit_commands: {
      "default": [],
      switches: false,
      file_key: 'pre_commit_commands',
      validate: function(input) {
        return Array.isArray(input);
      }
    },
    post_commit_commands: {
      "default": [],
      switches: false,
      file_key: 'post_commit_commands',
      validate: function(input) {
        return Array.isArray(input);
      }
    },
    post_complete_commands: {
      "default": [],
      switches: false,
      file_key: 'post_complete_commands',
      validate: function(input) {
        return Array.isArray(input);
      }
    },
    files_to_version: {
      "default": ['README.md'],
      switches: false,
      file_key: 'files_to_version',
      validate: function(input) {
        return Array.isArray(input);
      }
    },
    files_to_commit: {
      "default": [],
      switches: false,
      file_key: 'files_to_commit',
      validate: function(input) {
        return Array.isArray(input);
      }
    }
  };

  Options = (function() {
    Options.prototype._file_data = {};

    function Options(args) {
      this.args = Minimist(args.slice(2));
      this.getOption('dot_release_file_location', options.dot_release_file_location);
      this.loadFileData();
      this.getAllOptions();
    }

    Options.prototype.getAllOptions = function() {
      var key, opts, results;
      results = [];
      for (key in options) {
        opts = options[key];
        results.push(this.getOption(key, opts));
      }
      return results;
    };

    Options.prototype.getOption = function(key, opts) {
      var value;
      value = void 0;
      if (opts.switches !== false) {
        value = this.getSwitchValue(opts.switches);
      }
      if (value === void 0 && opts.file_key !== false) {
        value = this.getFileValue(opts.file_key);
      }
      if (value === void 0) {
        value = opts["default"];
      }
      if (opts.filter != null) {
        value = opts.filter(value);
      }
      if (opts.validate != null) {
        if (!opts.validate(value)) {
          throw new Error("Invalid Value for " + key + ": " + value);
        }
      }
      return this[key] = value;
    };

    Options.prototype.loadFileData = function() {
      if (existsSync(this.dot_release_file_location)) {
        return this._file_data = require(this.dot_release_file_location);
      }
    };

    Options.prototype.getFileValue = function(key) {
      if (this._file_data[key] != null) {
        return this._file_data[key];
      }
    };

    Options.prototype.getSwitchValue = function(switches) {
      var s;
      return ((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = switches.length; i < len; i++) {
          s = switches[i];
          if (this.args[s] != null) {
            results.push(this.args[s]);
          }
        }
        return results;
      }).call(this))[0];
    };

    return Options;

  })();

  module.exports = Options;

}).call(this);
