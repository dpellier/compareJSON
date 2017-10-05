/*
 * grunt-compare-json
 * https://github.com/dpellier/compare-json
 *
 * Copyright (c) 2013 dpellier
 * Licensed under the MIT license.
 */

'use strict';
var utils = require('../lib/utils'),
    path = require('path');

module.exports = function (grunt) {

    grunt.registerMultiTask('comparejson', 'Compare some JSON files', function () {

        // Fail task if no src directory property is set.
        grunt.config.requires('comparejson.compare.src');

        var allParsedFiles = [],
            fatal = grunt.config.get('comparejson').compare.fatal,
            isByPath = grunt.config.get('comparejson').compare.byPath,
            byPath = {},
            currentPath,
            result = true,
            reports;

        // First, parse all the json file into javascript map
        this.files.forEach(function (file) {
            allParsedFiles = utils.JSONFilesToMap(grunt, file.src);
        });

        if (isByPath) {
            allParsedFiles.forEach(function (item) {
                currentPath = path.dirname(item.fileName);

                if (!byPath[currentPath]) {
                    byPath[currentPath] = [];
                }

                byPath[currentPath].push(item);
            });

            Object.keys(byPath).forEach(function (bucket) {
                reports = utils.compareMaps(byPath[bucket]);

                if (reports.length) {
                    grunt.log.error('path name ' + bucket);
                    reports.forEach(function (report) {
                        grunt.log.error(report);
                    });

                    result = false;
                }
            });
        } else {
            // Then, compare each
            reports = utils.compareMaps(allParsedFiles);

            // If we get some differences, the task is failed and the reports is shown
            if (reports.length) {
                reports.forEach(function (report) {
                    grunt.log.error(report);
                });

                result = false;
            }
        }

        if (result) {
            grunt.log.writeln('SUCCESS : all files have the same keys.');
            return true;
        } else {
            return !fatal;
        }
    });
};
