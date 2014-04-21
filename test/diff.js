/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var diff = require('../');

describe('diff', function () {
	it('should find noops', function () {
		var a = [1, 2];
		var b = [1, 2];
		var d = diff(a, b);
		d.should.eql(['nop', 'nop']);
	});
	describe('insertions', function () {
		it('should find insertions', function () {
			var a = [];
			var b = [1];
			var d = diff(a, b);
			d.should.eql(['ins']);
		});
		it('should find insertions at the start', function () {
			var a = [2];
			var b = [1, 2];
			var d = diff(a, b);
			d.should.eql(['ins', 'nop']);
		});
		it('should find insertions at the end', function () {
			var a = [2];
			var b = [2, 3];
			var d = diff(a, b);
			d.should.eql(['nop', 'ins']);
		});
	});
	describe('deletions', function () {
		it('should find deletions', function () {
			var a = [1];
			var b = [];
			var d = diff(a, b);
			d.should.eql(['del']);
		});
		it('should find deletions at the start', function () {
			var a = [1, 2];
			var b = [2];
			var d = diff(a, b);
			d.should.eql(['del', 'nop']);
		});
		it('should find deletions at the end', function () {
			var a = [1, 2];
			var b = [1];
			var d = diff(a, b);
			d.should.eql(['nop', 'del']);
		});
	});
	describe('replaces', function () {
		it('should find replaces', function () {
			var a = [1];
			var b = [2];
			var d = diff(a, b);
			d.should.eql(['rep']);
		});
		it('should find replaces at the start', function () {
			var a = [1, 2];
			var b = [3, 2];
			var d = diff(a, b);
			d.should.eql(['rep', 'nop']);
		});
		it('should find replaces at the end', function () {
			var a = [1, 2];
			var b = [1, 3];
			var d = diff(a, b);
			d.should.eql(['nop', 'rep']);
		});
	});
	it('should handle more complex cases (1)', function () {
		var a = 'foobar';
		var b = 'foib';
		var d = diff(a, b);
		d.should.eql(['nop', 'nop', 'rep', 'nop', 'del', 'del']);
	});
	it('should handle more complex cases (2)', function () {
		var a = 'foobar';
		var b = 'oabir';
		var d = diff(a, b);
		d.should.eql(['del', 'nop', 'rep', 'nop', 'rep', 'nop']);
	});
	it('should handle more complex cases (3)', function () {
		var a = 'foobar';
		var b = 'oaibr';
		var d = diff(a, b);
		d.should.eql(['del', 'nop', 'rep', 'ins', 'nop', 'del', 'nop']);
	});
	it('should support custom eql function', function () {
		var a = [{id: 1, name: 'foo'}];
		var b = [{id: 1, name: 'bar'}];
		var d = diff(a, b, function (a, b) { return a.id === b.id; });
		d.should.eql(['nop']);
	});
});

