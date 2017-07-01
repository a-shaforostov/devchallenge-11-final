class Status {

	constructor (options) {
		let opts = options || {};
		this.name = opts.name;
		this.notes = options.notes || [];
	}
}