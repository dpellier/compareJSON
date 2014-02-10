/*
 * grunt-compare-json
 * https://github.com/dpellier/compare-json
 *
 * Copyright (c) 2013 dpellier
 * Licensed under the MIT license.
 */

'use strict';
var utils = require('../lib/utils');

module.exports = function(grunt) {

    grunt.registerMultiTask('comparejson', 'Compare some JSON files', function() {

        // Fail task if no src directory property is set.
        grunt.config.requires('comparejson.compare.src');

        var allParsedFiles = [];

        // First, parse all the json file into javascript map
        this.files.forEach(function(file) {
            allParsedFiles = utils.JSONFilesToMap(grunt, file.src);
        });

        // Then, compare each
        var reports = utils.compareMaps(allParsedFiles);

        // If we get some differences, the task is failed and the reports is shown
        if (reports.length) {
            reports.forEach(function(report) {
                grunt.log.error(report);
            });

            return !grunt.config.get('comparejson').compare.fatal;
        }

        grunt.log.writeln('SUCCESS : all files have the same keys.');
        return true;
    });
};
