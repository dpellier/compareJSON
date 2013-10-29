'use strict';

var utils = module.exports;

/**
 * Convert files into js object :
 * {
 *     fileName: name of the file converted,
 *     parsedJSON: map of the JSON value
 * }
 * @param grunt
 * @param sources
 * @returns {Array}
 */
utils.JSONFilesToMap = function(grunt, sources) {

    var results = [];

    if (sources) {
        sources.forEach(function(source, idx) {
            var rawJSON = grunt.file.read(source);
            var parsedJSON = JSON.parse(rawJSON);

            results[idx] = {
                fileName: source,
                parsedJSON: parsedJSON
            };
        });
    }
    return results;
};

/**
 * Compare each json values and return a report with all missing key
 * @param maps
 * @returns {Array}
 */
utils.compareMaps = function(maps) {

    var reports = [];

    if (maps) {
        maps.forEach(function(map, idx) {
            for (var key in map.parsedJSON) {

                // check if the key is in the other files and that it's value is the same
                maps.forEach(function(searchInto, searchIdx) {
                    if (searchIdx === idx) {
                        return;
                    }

                    if (!searchInto.parsedJSON.hasOwnProperty(key)) {
                        reports.push('Missing key: ' + key + '\t\t in file ' + searchInto.fileName);
                    }
                });
            }
        });
    }
    return reports;
};