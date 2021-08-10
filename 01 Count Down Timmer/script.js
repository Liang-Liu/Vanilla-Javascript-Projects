const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const now = new Date();
const nextYear = now.getFullYear() + 1;
const newYear = `01 Jan ${nextYear} 00:00:00`;

const countDown = () => {
	const newYearParsed = Date.parse(newYear);
	const nowParsed = Date.now();
	const distance = newYearParsed - nowParsed;

	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	daysEl.innerHTML = days;
	hoursEl.innerHTML = hours;
	minutesEl.innerHTML = minutes;
	secondsEl.innerHTML = seconds;
};
countDown();
setInterval(countDown, 1000);
