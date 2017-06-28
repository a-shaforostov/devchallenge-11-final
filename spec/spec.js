var unit = require('../src/js/stats');

describe("life tests", function() {
	it("Перевірка розрахунку меж колонії", function() {
		var res = unit.calcStats({
			bounds: {
				x1:2,
				y1:2,
				x2:4,
				y2:4
			}
		});
		expect(res.w).toBe(3);
		expect(res.h).toBe(3);
		expect(res.square).toBe(9);
	});
	it("Перевірка обробки помилок вихідних даних", function() {
		var res = unit.calcStats(null);
		expect(res).toBe(null);
	});
});