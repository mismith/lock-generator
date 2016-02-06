angular.module('lock-generator', [])
	.controller('AppCtrl', function ($rootScope) {
		$rootScope.alphabetTypes = [
			{
				$id: 'LETTERS',
				name: 'Letters',
			},
			{
				$id: 'NUMBERS',
				name: 'Numbers',
			},
		];
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
		$rootScope.numTimes = n => new Array(n);
		$rootScope.int = v => parseInt(v);
		$rootScope.guesses = [];
		$rootScope.solve = function () {
			angular.forEach($rootScope.lock.getCorrectNotchIndexes(), function (index, i) {
				$rootScope.lock.getDiscs()[i].setCurrentNotchIndex(index);
				$rootScope.guesses[i] = '' + index;
			});
		}
	});
