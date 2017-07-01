/* global View, Materialize, notesList, testStatuses, Handlebars, SimpleMDE */
/* eslint-disable no-invalid-this */

// Модальне вікно редагування квитка
$('#editnote').modal({
	// complete: () => {
	// 	if ($timeSelector) $timeSelector.remove();
	// 	$('.day-full').removeClass('selected-day');
	// },
});

// Ініціалізуємо дошку

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

let notesList = new NotesList();
notesList.loadNotes();

// Створити представлення
let view = new View();
view.renderView();


/* РЕЄСТРАЦІЯ ОБРОБНИКІВ ПОДІЙ */

// Кнопка створення нового квитка
$('#create-note').on('click', function() {
	createNewNote();
});

// Редагування квитка
$(document).on('click', '.note', function() {
	editNote($(this).data('id'));
});

// Обробка клавіш
$(document).on('keydown', function(event) {
	switch (event.keyCode) {
		case 45: { // insert
			createNewNote();
			break;
		}
	}
});

// Натиснута кнопка "зберегти" в модальному вікні редагування події
$(document).on('click', '#create-note-ok', (event) => {
	let form = $('#editnote form')[0];

	// Валідація
	if (!form.checkValidity()) {

		alert('Не вірно заповнені поля');
		event.preventDefault();
		event.stopImmediatePropagation();

	} else {

		if (form.elements.id && form.elements.id.value) {
			// Змінити квиток
			notesList.updateNote({
				id: form.elements.id.value,
				name: form.elements.name.value,
				desc: form.elements.desc.simplemde.value(),
				state: form.elements.state.value,
			});
		} else {
			// Створити квиток
			let noteId = notesList.createNote({
				name: form.elements.name.value,
				desc: form.elements.desc.simplemde.value(),
				state: form.elements.state.value,
			});
			testStatuses[0].notes.push(notesList.notes[noteId]);
		}

		// Оновити представлення
		view.renderView();
	}
});

// Натиснута кнопка видалення події
$(document).on('click', '#delete-note', () => {
	let form = $('#editnote form')[0];
	if (form.elements.id && form.elements.id.value) {
		notesList.deleteNote(form.elements.id.value);
		view.renderView();
	}
});


// Вимкнути відправку форми
$('form').on('submit', (e) => e.preventDefault());


function createEditNoteForm() {
	let $place = $('#editnote');
	let source = document.getElementById('editnote-template').innerHTML;
	let template = Handlebars.compile(source);
	$place.html(template({
		statuses: testStatuses,
	}));
		$('select').material_select();
	let element = $($place).find('textarea')[0];
	let simplemde = new SimpleMDE({element: element});
	element.simplemde = simplemde;
}

function createNewNote() {
	createEditNoteForm();
	let form = $('#editnote form')[0];
	form.elements.id.value = '';
	form.elements.name.value = '';
	form.elements.desc.simplemde.value('');
	form.elements.state.value = testStatuses[0].name;

	$('#delete-note').addClass('disabled');
	$('#editnote').modal('open');
}

function editNote(id) {
	createEditNoteForm();
	let form = $('#editnote form')[0];
	let note = notesList.notes[id];
	form.elements.id.value = id;
	form.elements.name.value = note.name;
	form.elements.desc.simplemde.value(note.desc);
	form.elements.state.value = note.state;

	$('#delete-note').removeClass('disabled');
	$('#editnote').modal('open');
}

