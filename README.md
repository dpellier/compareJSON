# grunt-compareJSON

> Compare multiples JSON files and report the keys differences

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-compareJSON --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-compareJSON');
```

## The "compareJSON" task

### Overview
In your project's Gruntfile, add a section named `compareJSON` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  compareJSON: {
    compare: {
      src: ['<dir>'],
      fatal: true | false
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

### Usage Examples

```js
grunt.initConfig({
  compareJSON: {
    compare: {
      src: ['dir/**/*.json'],
      fatal: true
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
