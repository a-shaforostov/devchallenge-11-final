/* global exports */

function calcStats(state) {

	if (!state || !state.bounds) {
		return null;
	}

	let w = state.bounds.x2 - state.bounds.x1 + 1;
	let h = state.bounds.y2 - state.bounds.y1 + 1;
	return {
		w: w,
		h: h,
		square: w * h,
	};
}

try {
	exports.calcStats = calcStats;
} catch(e) {/* empty */}
