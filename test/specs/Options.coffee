###
  Generate Release
  Kevin Gravier
  MIT License
###

Chai = require 'chai'

Chai.use(require 'chai-as-promised')
assert = Chai.assert

Path = require 'path'
Temp = require 'temp'
Exec = require('child_process').execSync
rmdir = require 'rmdir'
Options = require '../../src/lib/Options'

describe 'Options', ->
  starting_dir = process.cwd()
  temp_dir = Temp.path()

  before ->
    Exec "git clone https://github.com/mrkmg/node-generate-release-test-repo.git #{temp_dir}", stdio: 'pipe'
    process.chdir temp_dir

  after (cb) ->
    process.chdir starting_dir
    rmdir temp_dir, cb

  it 'should have default options set properly', ->
    options = new Options []

    assert.equal options.readme_file_location, Path.resolve './README.md'
    assert.equal options.package_file_location, Path.resolve './package.json'
    assert.equal options.dot_release_file_location, Path.resolve './.release.json'
    assert.equal options.remote, 'origin'
    assert.equal options.current_version, null
    assert.equal options.release_type, null
    assert.equal options.no_confirm, false
    assert.equal options.skip_git_pull, false
    assert.equal options.skip_git_push, false
    assert.equal options.set_release_message, false


  it 'should parse cli options properly', ->
    options = new Options [
      'node', 'script'
      '-r', './alt.README.md'
      '-p', './alt.package.json'
      '-c', '1.2.3'
      '-t', 'patch'
      '-d', './alt.release.json'
      '-o', 'test'
      '-n'
      '-l'
      '-s'
      '-m'
    ]

    assert.equal options.readme_file_location, Path.resolve './alt.README.md'
    assert.equal options.package_file_location, Path.resolve './alt.package.json'
    assert.equal options.dot_release_file_location, Path.resolve './alt.release.json'
    assert.equal options.remote, 'test'
    assert.equal options.current_version, '1.2.3'
    assert.equal options.release_type, 'patch'
    assert.equal options.no_confirm, true
    assert.equal options.skip_git_pull, true
    assert.equal options.skip_git_push, true
    assert.equal options.set_release_message, true

  it 'should parse release file options correctly', ->
    options = new Options [
      'node', 'script'
      '-d', './all.release.json'
    ]

    assert.equal options.readme_file_location, Path.resolve './alt.README.md'
    assert.equal options.package_file_location, Path.resolve './alt.package.json'
    assert.equal options.remote, 'test4'
    assert.equal options.no_confirm, true
    assert.equal options.skip_git_pull, true
    assert.equal options.skip_git_push, true
    assert.equal options.set_release_message, true
    assert.sameMembers options.pre_commit_commands, ['test1']
    assert.sameMembers options.post_commit_commands, ['test2']
    assert.sameMembers options.additional_files_to_commit, ['test3']
