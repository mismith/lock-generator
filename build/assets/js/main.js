'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alphabets = {
	LETTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
	NUMBERS: '1234567890'.split('')
};

var ComboLock = function () {
	function ComboLock(discs, correctNotchIndexes) {
		_classCallCheck(this, ComboLock);

		// defaults
		this.discs = [];

		// shortcuts
		if (discs && discs.length) this.setDiscs(discs);
		if (correctNotchIndexes && correctNotchIndexes.length) this.setCorrectNotchIndexes(correctNotchIndexes);
	}

	_createClass(ComboLock, [{
		key: 'setDiscs',
		value: function setDiscs() {
			var discs = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

			this.discs = discs;
		}
	}, {
		key: 'getDiscs',
		value: function getDiscs() {
			return this.discs;
		}
	}, {
		key: 'getDiscIndex',
		value: function getDiscIndex(disc) {
			return this.discs.indexOf(disc);
		}
	}, {
		key: 'getDisc',
		value: function getDisc(index) {
			return this.discs[index];
		}
	}, {
		key: 'addDisc',
		value: function addDisc(disc) {
			this.discs.push(disc);
		}
	}, {
		key: 'removeDisc',
		value: function removeDisc(discOrIndex) {
			var index = typeof discOrIndex !== 'number' ? this.getDiscIndex(discOrIndex) : discOrIndex;

			this.discs.splice(index, 1);
		}
	}, {
		key: 'forEachDisc',
		value: function forEachDisc(fn) {
			for (var i = 0; i < this.discs.length; i++) {
				fn(this.getDisc(i), i);
			}
		}
	}, {
		key: 'setCurrentNotchIndexes',
		value: function setCurrentNotchIndexes(currentNotchIndexes) {
			this.forEachDisc(function (disc, i) {
				disc.setCurrentNotchIndex(currentNotchIndexes[i]);
			});
		}
	}, {
		key: 'getCurrentNotchIndexes',
		value: function getCurrentNotchIndexes() {
			var currentNotchIndexes = [];
			this.forEachDisc(function (disc, i) {
				currentNotchIndexes[i] = disc.getCurrentNotchIndex();
			});
			return currentNotchIndexes;
		}
	}, {
		key: 'setCurrentNotches',
		value: function setCurrentNotches(currentNotches) {
			this.forEachDisc(function (disc, i) {
				disc.setCurrentNotch(currentNotches[i]);
			});
		}
	}, {
		key: 'getCurrentNotches',
		value: function getCurrentNotches() {
			var currentNotches = [];
			this.forEachDisc(function (disc, i) {
				currentNotches[i] = disc.getCurrentNotch();
			});
			return currentNotches;
		}
	}, {
		key: 'setCorrectNotchIndexes',
		value: function setCorrectNotchIndexes(correctNotchIndexes) {
			this.forEachDisc(function (disc, i) {
				disc.setCorrectNotchIndex(correctNotchIndexes[i]);
			});
		}
	}, {
		key: 'getCorrectNotchIndexes',
		value: function getCorrectNotchIndexes() {
			var correctNotchIndexes = [];
			this.forEachDisc(function (disc, i) {
				correctNotchIndexes[i] = disc.getCorrectNotchIndex();
			});
			return correctNotchIndexes;
		}
	}, {
		key: 'setCorrectNotches',
		value: function setCorrectNotches(correctNotches) {
			this.forEachDisc(function (disc, i) {
				disc.setCorrectNotch(correctNotches[i]);
			});
		}
	}, {
		key: 'getCorrectNotches',
		value: function getCorrectNotches() {
			var correctNotches = [];
			this.forEachDisc(function (disc, i) {
				correctNotches[i] = disc.getCorrectNotch();
			});
			return correctNotches;
		}
	}, {
		key: 'isCorrect',
		value: function isCorrect() {
			var correct = !!this.getDiscs().length;
			this.forEachDisc(function (disc) {
				correct = correct && disc.isCorrect();
			});
			return correct;
		}
	}, {
		key: 'generate',
		value: function generate() {
			var numDiscs = arguments.length <= 0 || arguments[0] === undefined ? 4 : arguments[0];
			var numNotches = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];
			var type = arguments.length <= 2 || arguments[2] === undefined ? Alphabets.LETTERS : arguments[2];
			var mustIncludes = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

			// reset existing stuff
			this.setDiscs();

			for (var i = 0; i < numDiscs; i++) {
				var disc = new ComboLockDisc();
				disc.generate(numNotches, type, mustIncludes[i]);
				if (type === Alphabets.NUMBERS && numNotches == type.length) {
					disc.sortNotches();
				} else {
					disc.shuffleNotches();
				}
				this.addDisc(disc);
			}
			return this.discs;
		}
	}, {
		key: 'generateCorrectNotchIndexes',
		value: function generateCorrectNotchIndexes() {
			this.forEachDisc(function (disc) {
				disc.generateCorrectNotchIndex();
			});
		}
	}]);

	return ComboLock;
}();

var ComboLockDisc = function () {
	function ComboLockDisc(notches, correctNotchIndex) {
		_classCallCheck(this, ComboLockDisc);

		// defaults
		this.notches = [];

		// shortcuts
		if (notches && notches.length) this.setNotches(notches);
		if (correctNotchIndex !== undefined) this.setCorrectNotchIndex(correctNotchIndex);
	}

	_createClass(ComboLockDisc, [{
		key: 'setNotches',
		value: function setNotches() {
			var notches = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

			this.notches = notches;
		}
	}, {
		key: 'getNotches',
		value: function getNotches() {
			return this.notches;
		}
	}, {
		key: 'getNotchIndex',
		value: function getNotchIndex(notch) {
			return this.notches.indexOf(notch);
		}
	}, {
		key: 'getNotch',
		value: function getNotch(index) {
			return this.notches[index];
		}
	}, {
		key: 'addNotch',
		value: function addNotch(notch) {
			this.notches.push(notch);
		}
	}, {
		key: 'removeNotch',
		value: function removeNotch(notchOrIndex) {
			var index = typeof notchOrIndex !== 'number' ? this.getNotchIndex(notchOrIndex) : notchOrIndex;

			this.notches.splice(index, 1);
		}
	}, {
		key: 'setCurrentNotchIndex',
		value: function setCurrentNotchIndex(index) {
			this.currentNotchIndex = parseInt(index);
		}
	}, {
		key: 'getCurrentNotchIndex',
		value: function getCurrentNotchIndex() {
			return this.currentNotchIndex;
		}
	}, {
		key: 'setCurrentNotch',
		value: function setCurrentNotch(notch) {
			this.setCurrentNotchIndex(this.getNotchIndex(notch));
		}
	}, {
		key: 'getCurrentNotch',
		value: function getCurrentNotch() {
			return this.getNotch(this.currentNotchIndex);
		}
	}, {
		key: 'setCorrectNotchIndex',
		value: function setCorrectNotchIndex(index) {
			this.correctNotchIndex = parseInt(index);
		}
	}, {
		key: 'getCorrectNotchIndex',
		value: function getCorrectNotchIndex() {
			return this.correctNotchIndex;
		}
	}, {
		key: 'setCorrectNotch',
		value: function setCorrectNotch(notch) {
			this.setCorrectNotchIndex(this.getNotchIndex(notch));
		}
	}, {
		key: 'getCorrectNotch',
		value: function getCorrectNotch() {
			return this.getNotch(this.getCorrectNotchIndex());
		}
	}, {
		key: 'isCorrect',
		value: function isCorrect() {
			return this.getCurrentNotchIndex() !== undefined && this.getCorrectNotchIndex() !== undefined && this.getCurrentNotchIndex() === this.getCorrectNotchIndex();
		}
	}, {
		key: 'generate',
		value: function generate() {
			var numNotches = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
			var alphabet = arguments.length <= 1 || arguments[1] === undefined ? Alphabets.LETTERS : arguments[1];
			var mustInclude = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

			alphabet = [].slice.call(alphabet); // clone it so we don't destroy the data

			// reset existing stuff
			this.setNotches();
			this.setCurrentNotchIndex();
			this.setCorrectNotchIndex();

			// make new data
			for (var i = 0; i < numNotches; i++) {
				var index = Math.round(Math.random() * (alphabet.length - 1));
				if (alphabet.indexOf(mustInclude[i]) >= 0) {
					index = alphabet.indexOf(mustInclude[i]);
				}
				var notch = alphabet.splice(index, 1)[0]; // we don't want to repeat glyphs, so pluck them out of this disc's alphabet as they are used up
				this.addNotch(notch);
			}

			// pick a default correct answer
			this.generateCorrectNotchIndex();

			return this.notches;
		}
	}, {
		key: 'generateCorrectNotchIndex',
		value: function generateCorrectNotchIndex() {
			this.setCorrectNotchIndex(Math.round(Math.random() * (this.notches.length - 1)));
		}
	}, {
		key: 'shuffleNotches',
		value: function shuffleNotches() {
			for (var j, x, i = this.notches.length; i; j = Math.floor(Math.random() * i), x = this.notches[--i], this.notches[i] = this.notches[j], this.notches[j] = x) {}
			return this.notches;
		}
	}, {
		key: 'sortNotches',
		value: function sortNotches(compare) {
			return this.notches.sort(compare);
		}
	}]);

	return ComboLockDisc;
}();
'use strict';

angular.module('lock-generator', []).controller('AppCtrl', ["$rootScope", function ($rootScope) {
	$rootScope.alphabetTypes = [{
		$id: 'LETTERS',
		name: 'Letters'
	}, {
		$id: 'NUMBERS',
		name: 'Numbers'
	}];
	$rootScope.alphabetType = 'LETTERS';
	$rootScope.numDiscs = 4;
	$rootScope.numNotches = 10;
	$rootScope.mustIncludes = [];

	// lock
	$rootScope.lock = new ComboLock();
	$rootScope.generate = function () {
		$rootScope.lock.generate($rootScope.numDiscs, $rootScope.numNotches, Alphabets[$rootScope.alphabetType], $rootScope.mustIncludes);
		angular.forEach($rootScope.mustIncludes, function (notch, i) {
			if (notch !== '') $rootScope.lock.getDisc(i).setCorrectNotch(notch);
		});
		$rootScope.solution = $rootScope.lock.getCorrectNotches();
	};
	$rootScope.generate();

	// helpers
	$rootScope.numTimes = function (n) {
		return new Array(n);
	};
	$rootScope.int = function (v) {
		return parseInt(v);
	};
	$rootScope.guesses = [];
	$rootScope.solve = function () {
		angular.forEach($rootScope.lock.getCorrectNotchIndexes(), function (index, i) {
			$rootScope.lock.getDiscs()[i].setCurrentNotchIndex(index);
			$rootScope.guesses[i] = '' + index;
		});
	};
}]);