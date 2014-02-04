'use strict';

var assert = require('assert');
var grunt = require('grunt');
var utils = require('../lib/utils');

describe('JSONFilesToMap', function() {
    it('should return an empty array if no arguments is passed', function() {
        // when
        var results = utils.JSONFilesToMap();

        // then
        assert.deepEqual(results, []);
    });

    it('should return a correct object', function() {
        // given
        var sources = ['test/data/fileA.json'];

        // when
        var results = utils.JSONFilesToMap(grunt, sources);

        // then
        assert.ok(results.length > 0);
        assert.strictEqual(results[0].fileName, 'test/data/fileA.json');
        assert.strictEqual(results[0].parsedJSON['JSON.string.1'], 'string1');
    });
});


describe('compareMaps', function() {
    it('should return an empty array if no arguments is passed', function() {
        // when
        var reports = utils.compareMaps();

        // then
        assert.deepEqual(reports, []);
    });

    it('should return an empty array if no differences are found', function() {
        // given
        var values = {"a": "a", "b": "b"};
        var maps = [
            {parsedJSON: values, fileName: 'fileA'},
            {parsedJSON: values, fileName: 'fileB'}
        ];

        // when
        var reports = utils.compareMaps(maps);

        // then
        assert.deepEqual(reports, []);
    });

    it('should return the missing key if some differences are found', function() {
        // given
        var valueA = {"a": "a", "b": "b"};
        var valueB = {"b": "b"};
        var maps = [
            {parsedJSON: valueA, fileName: 'fileA'},
            {parsedJSON: valueB, fileName: 'fileB'}
        ];

        // when
        var reports = utils.compareMaps(maps);

        // then
        assert.equal(reports.length, 1);
    });


    it('should return the missing key if some differences are found inside of sub-objects', function() {
        // given
        var valueA = {"a": {"me":"a","mo":"a"}, "b": "b"};
        var valueB = {"a": {"me":"a"}, "b": "b"};
        var maps = [
            {parsedJSON: valueA, fileName: 'fileA'},
            {parsedJSON: valueB, fileName: 'fileB'}
        ];

        // when
        var reports = utils.compareMaps(maps);

        // then
        assert.equal(reports.length, 1);
    });
});