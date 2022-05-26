const setBarData = (day, value, highestSpend) => {
	const bars = document.querySelectorAll('.bar');

	bars.forEach((bar) => {
		if (bar.dataset.day === day) {
			bar.style.setProperty('--bar-height', value + 'px');
			bar.dataset.amount = value;
		}
		if (bar.dataset.amount == highestSpend) {
			bar.style.background = 'var(--accent)';
		}
	});
};

const isHighestSpend = (data) => {
	const values = data.map((value) => value.amount);
	return Math.max(...values);
};

const showSpendingAndBalance = (data) => {
	const STARTING_BALANCE = 1500;
	const totalSpent = data.reduce((acc, cur) => acc + cur.amount, 0);
	const remainingBalance = STARTING_BALANCE - totalSpent;
	const totalSpentDisplay = document.querySelector('#spent');
	const balanceDisplay = document.querySelector('#remaining');

	totalSpentDisplay.innerText = `$${totalSpent.toFixed(2)}`;
	balanceDisplay.innerText = `$${remainingBalance.toFixed(2)}`;
};

const getData = async () => {
	try {
		const response = await fetch('./data/data.json');
		const data = await response.json();

		if (response.ok) {
			data.forEach((day) => {
				setBarData(day.day, day.amount, isHighestSpend(data));
			});
			showSpendingAndBalance(data);
		}
	} catch (error) {
		console.log(error);
	}
};

getData();
