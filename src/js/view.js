/* global testStatuses, _, Handlebars, notesList */
/* eslint-disable no-invalid-this */

class View {

	renderView() {
		let $place = $('.board');
		let source = document.getElementById('statuses-template').innerHTML;
		let template = Handlebars.compile(source);
		$.each(testStatuses, function() {
			this.notes = _.filter(notesList.notes, _.iteratee({state: this.name}));
		});
		let data = {
			statuses: testStatuses,
		};
		$place.html(template(data));

		$('.statusSortable').sortable({
			connectWith: '.statusSortable',
		}).disableSelection();

		$('.connectedSortable').sortable({
			connectWith: '.connectedSortable',
		}).disableSelection();

		$('.connectedSortable').on('sortupdate', function( event, ui ) {
			notesList.changeState(ui.item.data('id'), ui.item.closest('.status').data('name'));
		} );


	}
}
