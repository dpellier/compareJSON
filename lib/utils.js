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
utils.compareMaps = function (maps) {

    var reports = [];

    var isObject =function(obj) {
        return obj === Object(obj);
    };
    var _compareRecursive = function (path, map, searchInto, fileName) {
        for (var key in map) {
            if (map.hasOwnProperty(key) && (null!=map[key])){
                // check if the key is in the other files and that it's value is the same

                if (!(searchInto.hasOwnProperty(key) && (null!=searchInto[key]))) {
                    reports.push('Missing key: ' + path + key + '\t\t in file ' + fileName);
                } else {
                    var subPath = (''!==path?path+key+'.':key+'.');

                    var mapValue = map[key];
                    var searchIntoValue = searchInto[key];
                    if (isObject(mapValue)){
                        _compareRecursive(subPath, mapValue, searchIntoValue, fileName);
                    }
                }
            }
        }
    }

    if (maps) {
        maps.forEach(function (map, idx) {
            maps.forEach(function (searchInto, searchIdx) {
                if (searchIdx === idx) {
                    return;
                }
                _compareRecursive('',map.parsedJSON, searchInto.parsedJSON, searchInto.fileName);
            });
        });
    }
    return reports;
};