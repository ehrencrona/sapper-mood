
const months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');

export function formatDate(date: Date) {
	return months[date.getMonth()] + ' ' + date.getDate();
}

export function getToday() {
	return new Date();
}
