class NotesList {

	constructor() {
		this.idCounter = 1;
		this.notes = {};
	}

	createNote(options) {
		let note = new Note(options);
		note.id = this.idCounter;
		this.notes[this.idCounter] = note;

		// Збереження в localStorage
		localStorage.setItem('note-' + note.id, JSON.stringify(note));

		return this.idCounter++;
	}

	updateNote({id, name, desc, state}) {
		let note = this.notes[id];
		note.name = name;
		note.desc = desc;
		note.state = state;

		// Збереження в localStorage
		localStorage.setItem('note-' + id, JSON.stringify(note));
	}

	deleteNote(id) {
		// Видалення з localStorage
		localStorage.removeItem('note-' + id);
		// Видалення з колекції
		delete this.notes[id];

	}

	changeState(id, newState) {
		let note = this.notes[id];
		note.state = newState;

		// Збереження в localStorage
		localStorage.setItem('note-' + id, JSON.stringify(note));
	}
}

class Note {

	constructor(options) {
		let opts = options || {};
		this.name = opts.name || 'Порожній квиток';
		this.desc = opts.desc || '';
		this.state = opts.state || 'Зробити';
		this.people = opts.people || [];
		this.category = opts.category;
	}
}

