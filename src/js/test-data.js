/* global Status, Person, NotesList */

let testStatuses = [
	new Status({name: 'Зробити'}),
	new Status({name: 'В процесі'}),
	new Status({name: 'Виконано'}),
];

let testPeople = [
	new Person({name: 'Петренко Петро'}),
	new Person({name: 'Іванов Іван'}),
	new Person({name: 'Павленко Павло'}),
];

/**
 * Список всіх квитків
 * @type {Array}
 */
let notesList = new NotesList();

let noteId = notesList.createNote({
	name: 'Перший квиток',
	desc: 'Це перший створений квиток. Привітаємо його',
	people: [testPeople[0], testPeople[1]],
});
testStatuses[0].notes.push(notesList.notes[noteId]);
