/**
 * Список квитків
 */
class NotesList {

	constructor() {
		this.idCounter = 1;
		this.notes = {};
	}

	/**
	 * Створити квиток
	 * @param options
	 * @returns {number}
	 */
	createNote(options) {
		let note = new Note(options);
		note.id = this.idCounter;
		this.notes[this.idCounter] = note;
		note.people = [testPeople[(Math.random()*2).toFixed(0)]];

		// Збереження в localStorage
		localStorage.setItem('note-' + note.id, JSON.stringify(note));

		return this.idCounter++;
	}

	/**
	 * Оновити квиток
	 * @param id
	 * @param name
	 * @param desc
	 * @param state
	 */
	updateNote({id, name, desc, state}) {
		let note = this.notes[id];
		note.name = name;
		note.desc = desc;
		note.state = state;

		// Збереження в localStorage
		localStorage.setItem('note-' + id, JSON.stringify(note));
	}

	/**
	 * Відалити квиток
	 * @param id
	 */
	deleteNote(id) {
		// Видалення з localStorage
		localStorage.removeItem('note-' + id);
		// Видалення з колекції
		delete this.notes[id];

	}

	/**
	 * Змінити стан при пересуванні
	 * @param id
	 * @param newState
	 */
	changeState(id, newState) {
		let note = this.notes[id];
		note.state = newState;

		// Збереження в localStorage
		localStorage.setItem('note-' + id, JSON.stringify(note));
	}

	/**
	 * Завантажити квитки з локального сховища
	 */
	loadNotes() {
		// Завантажити події local storage
		let loadedNotes = [];
		let lsKeys = Object.keys(localStorage);
		lsKeys.forEach((keyName) => {
			// Події збережені з префіксом event-
			if (keyName.substr(0, 5) === 'note-') {
				let note = JSON.parse(localStorage.getItem(keyName));
				// Додаємо подію в масив
				loadedNotes.push(note);
				// Видаляємо подію зі сховища та створюємо ії в колекції (для оновлення id)
				localStorage.removeItem(keyName);
			}
		});
		// Сформувати події з переприсвоєнням індексів
		loadedNotes.forEach((note) => {
			this.createNote(note);
		});
	}

}

/**
 * Квиток
 */
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

