# grunt-compare-json

> Compare multiples JSON files and report the keys differences

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-compare-json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-compare-json');
```

## The "compare-json" task

### Overview
In your project's Gruntfile, add a section named `comparejson` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  comparejson: {
    compare: {
      src: ['<dir>'],
      fatal: true | false,
      byPath: true | false
    }
  }
})
```

### Arguments

#### src
Type: `Array[String]`<br />
Mandatory: `true`

Directory where are the files to compare. The path can use wildcard.

#### fatal
Type: `Boolean`<br />
Mandatory: `false`<br />
Default value: `true`

Flag to indicate wheter or not the task failed if some differences are found.

#### byPath
Type: `Boolean`<br />
Mandatory: `false`<br />
Default value: `false`

Flag to indicate that files will be compared by path. For example :
/path1/file1.json
/path1/file1.json
/path2/file3.json

The file1.json will only be compared with the file2.json. 

### Usage Examples

```js
grunt.initConfig({
  comparejson: {
    compare: {
      src: ['dir/**/*.json'],
      fatal: true
      byPath: false
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013-10-29   v0.1.0   initial release
