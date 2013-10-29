/*
 * grunt-compareJSON
 * https://github.com/dpellier/compareJSON
 *
 * Copyright (c) 2013 dpellier
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'test/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        compareJSON: {
            compare: {
                src: ['test/**/*.json'],
                filter: 'isFile',
                fatal: true
            }
        },

        // Unit tests.
        simplemocha: {
            options: {
                globals: ['should'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },

            all: { src: ['test/**/*.js'] }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');


    grunt.registerTask('test', ['jshint', 'simplemocha']);

    grunt.registerTask('default', ['jshint', 'compareJSON']);
};
