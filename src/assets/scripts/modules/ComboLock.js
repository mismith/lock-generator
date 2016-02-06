const Alphabets = {
	LETTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
	NUMBERS: '1234567890'.split(''),
}
class ComboLock {
	constructor(discs, correctNotchIndexes) {
		// defaults
		this.discs = [];
		
		// shortcuts
		if (discs && discs.length) this.setDiscs(discs);
		if (correctNotchIndexes && correctNotchIndexes.length) this.setCorrectNotchIndexes(correctNotchIndexes);
	}
	
	setDiscs(discs = []) {
		this.discs = discs;
	}
	getDiscs() {
		return this.discs;
	}
	
	getDiscIndex(disc) {
		return this.discs.indexOf(disc);
	}
	getDisc(index) {
		return this.discs[index];
	}
	
	addDisc(disc) {
		this.discs.push(disc);
	}
	removeDisc(discOrIndex) {
		var index = typeof discOrIndex !== 'number' ? this.getDiscIndex(discOrIndex) : discOrIndex;
		
		this.discs.splice(index, 1);
	}
	
	forEachDisc(fn) {
		for(var i = 0; i < this.discs.length; i++) {
			fn(this.getDisc(i), i);
		}
	}
	
	setCurrentNotchIndexes(currentNotchIndexes) {
		this.forEachDisc(function (disc, i) {
			disc.setCurrentNotchIndex(currentNotchIndexes[i]);
		});
	}
	getCurrentNotchIndexes() {
		var currentNotchIndexes = [];
		this.forEachDisc(function (disc, i) {
			currentNotchIndexes[i] = disc.getCurrentNotchIndex();
		});
		return currentNotchIndexes;
	}
	
	setCurrentNotches(currentNotches) {
		this.forEachDisc(function (disc, i) {
			disc.setCurrentNotch(currentNotches[i]);
		});
	}
	getCurrentNotches() {
		var currentNotches = [];
		this.forEachDisc(function (disc, i) {
			currentNotches[i] = disc.getCurrentNotch();
		});
		return currentNotches;
	}
	
	setCorrectNotchIndexes(correctNotchIndexes) {
		this.forEachDisc(function (disc, i) {
			disc.setCorrectNotchIndex(correctNotchIndexes[i]);
		});
	}
	getCorrectNotchIndexes() {
		var correctNotchIndexes = [];
		this.forEachDisc(function (disc, i) {
			correctNotchIndexes[i] = disc.getCorrectNotchIndex();
		});
		return correctNotchIndexes;
	}
	
	setCorrectNotches(correctNotches) {
		this.forEachDisc(function (disc, i) {
			disc.setCorrectNotch(correctNotches[i]);
		});
	}
	getCorrectNotches() {
		var correctNotches = [];
		this.forEachDisc(function (disc, i) {
			correctNotches[i] = disc.getCorrectNotch();
		});
		return correctNotches;
	}
	
	isCorrect() {
		var correct = !! this.getDiscs().length;
		this.forEachDisc(function (disc) {
			correct = correct && disc.isCorrect();
		});
		return correct;
	}
	
	generate(numDiscs = 4, numNotches = 10, type = Alphabets.LETTERS, mustIncludes = []) {
		// reset existing stuff
		this.setDiscs();
		
		for (let i = 0; i < numDiscs; i++) {
			let disc = new ComboLockDisc();
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
	generateCorrectNotchIndexes() {
		this.forEachDisc(function (disc) {
			disc.generateCorrectNotchIndex();
		});
	}
}
class ComboLockDisc {
	constructor(notches, correctNotchIndex) {
		// defaults
		this.notches = [];
		
		// shortcuts
		if (notches && notches.length) this.setNotches(notches);
		if (correctNotchIndex !== undefined) this.setCorrectNotchIndex(correctNotchIndex);
	}
	
	setNotches(notches = []) {
		this.notches = notches;
	}
	getNotches() {
		return this.notches;
	}
	
	getNotchIndex(notch) {
		return this.notches.indexOf(notch);
	}
	getNotch(index) {
		return this.notches[index];
	}
	
	addNotch(notch) {
		this.notches.push(notch);
	}
	removeNotch(notchOrIndex) {
		var index = typeof notchOrIndex !== 'number'? this.getNotchIndex(notchOrIndex) : notchOrIndex;
		
		this.notches.splice(index, 1);
	}
	
	setCurrentNotchIndex(index) {
		this.currentNotchIndex = parseInt(index);
	}
	getCurrentNotchIndex() {
		return this.currentNotchIndex;
	}
	
	setCurrentNotch(notch) {
		this.setCurrentNotchIndex(this.getNotchIndex(notch));
	}
	getCurrentNotch() {
		return this.getNotch(this.currentNotchIndex);
	}
	
	setCorrectNotchIndex(index) {
		this.correctNotchIndex = parseInt(index);
	}
	getCorrectNotchIndex() {
		return this.correctNotchIndex;
	}
	
	setCorrectNotch(notch) {
		this.setCorrectNotchIndex(this.getNotchIndex(notch));
	}
	getCorrectNotch() {
		return this.getNotch(this.getCorrectNotchIndex());
	}
	
	isCorrect() {
		return this.getCurrentNotchIndex() !== undefined && this.getCorrectNotchIndex() !== undefined && this.getCurrentNotchIndex() === this.getCorrectNotchIndex();
	}
	
	generate(numNotches = 10, alphabet = Alphabets.LETTERS, mustInclude = []) {
		alphabet = [].slice.call(alphabet); // clone it so we don't destroy the data
		
		// reset existing stuff
		this.setNotches();
		this.setCurrentNotchIndex();
		this.setCorrectNotchIndex();
		
		// make new data
		for (let i = 0; i < numNotches; i++) {
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
	generateCorrectNotchIndex() {
		this.setCorrectNotchIndex(Math.round(Math.random() * (this.notches.length - 1)));
	}
	
	shuffleNotches() {
		for(var j, x, i = this.notches.length; i; j = Math.floor(Math.random() * i), x = this.notches[--i], this.notches[i] = this.notches[j], this.notches[j] = x);
		return this.notches;
	}
	sortNotches(compare) {
		return this.notches.sort(compare);
	}
}
