class View {

	renderView() {
		let _this = this;

		let $place = $('.board');
		let source = document.getElementById('statuses-template').innerHTML;
		let template = Handlebars.compile(source);
		$.each(testStatuses, function() {
			this.notes = _.filter(notesList.notes, _.iteratee({state: this.name}));
		});
		let data = {
			statuses: testStatuses
		};
		$place.html(template(data));

		// $('.statusSortable').sortable({
		// 	connectWith: '.statusSortable'
		// }).disableSelection();
		//
		$('.connectedSortable').sortable({
			connectWith: '.connectedSortable'
		}).disableSelection();

		$( ".connectedSortable" ).on( "sortupdate", function( event, ui ) {
			console.log(ui.item.closest('.status').data('name'));
			console.log(ui.item.data('id'));
			notesList.notes[ui.item.data('id')].state = ui.item.closest('.status').data('name');
			// _this.renderView();
		} );

	}
}