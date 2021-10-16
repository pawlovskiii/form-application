document.addEventListener('DOMContentLoaded', function () {
	const sectionPanel = document.querySelector('.panel');
	sectionPanel.addEventListener('submit', handleSubmit);

	const basket = [];

	function handleSubmit(e) {
		e.preventDefault();
		const formSubmitted = e.target;

		const tourTitle =
			formSubmitted.parentElement.querySelector('.excursions__title').innerText;

		const inputAdult = formSubmitted.querySelector(
			'.excursions__field-input--adult'
		).value;
		const inputChild = formSubmitted.querySelector(
			'.excursions__field-input--child'
		).value;

		emptyOrderValidation(inputAdult, inputChild);
		numberValidation(inputAdult, inputChild);

		const adultPrice = formSubmitted.querySelector(
			'.excursions__price--adult'
		).innerText;
		const childPrice = formSubmitted.querySelector(
			'.excursions__price--child'
		).innerText;

		const order = {
			title: tourTitle,
			adultNumber: inputAdult,
			adultPrice: adultPrice,
			childNumber: inputChild,
			childPrice: childPrice,
		};
		basket.push(order);
		displaySummary();
		totalNumberOfTickets(order, basket);
		addTitleTourToSummary(order, basket);
		singleOrderSummary(basket);
		totalValueSummary();

		// completeOrder(basket);

		removeOrder(basket);
	}
});

const ulSummary = document.querySelector('.panel__summary');
const liSummary = document.querySelector('.summary__item');
const liProto = document.querySelector('.summary__item--prototype');

function displaySummary() {
	liSummary.classList.remove('summary__item--prototype');
	const liSummaryClone = liSummary.cloneNode(true);
	ulSummary.appendChild(liSummaryClone);
	liProto.remove();
}

const fileEl = document.querySelector('.uploader__input');
fileEl.addEventListener('change', readFile);
const ulTours = document.querySelector('.panel__excursions');
const liTour = document.querySelector('.excursions__item--prototype');

function readFile(e) {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function (readerEvent) {
			const content = readerEvent.target.result;
			const splittedTxt = content.split(/[\r\n]+/gm);

			displayTours(splittedTxt);

			splittedTxt.forEach((item, index) => {
				setTourName(item, index);

				setAdultPrice(item, index);
				setChildPrice(item, index);

				setTourDescription(item, index);
			});

			clearInputValues();
		};
		reader.readAsText(file, 'UTF-8');
	} else {
		console.log('Wybierz plik tekstowy!');
	}
}

function displayTours(splittedTxt) {
	splittedTxt.forEach(() => {
		const liTourClone = liTour.cloneNode(true);
		liTourClone.classList.remove('excursions__item--prototype');
		ulTours.appendChild(liTourClone);
	});
	liTour.remove();
}

function setTourName(item, index) {
	const toursName = document.querySelectorAll('.excursions__title');
	toursName[index].textContent = item.split('","')[1];
}

function setChildPrice(item, index) {
	const childPriceList = document.querySelectorAll('.excursions__price--child');
	childPriceList[index].textContent = item.split('","')[4].replace('"', '');
}

function setAdultPrice(item, index) {
	const adultPriceList = document.querySelectorAll('.excursions__price--adult');
	adultPriceList[index].textContent = item.split('","')[3];
}

function setTourDescription(item, index) {
	const tourDescList = document.querySelectorAll('.excursions__description');
	tourDescList[index].textContent = item.split('","')[2];
}

function emptyOrderValidation(inputAdult, inputChild) {
	if (!inputAdult && !inputChild) {
		alert('Enter amount of tickets.');
		throw Error('Invalid number of tickets.');
	}
}

function numberValidation(inputAdult, inputChild) {
	const additionInput = inputAdult + inputChild;
	const ticketsValidation = /^\d+$/g.test(additionInput);

	if (!ticketsValidation) {
		alert('Enter integer values as orders values.');
		throw Error('Invalid type of order values.');
	}
}

function singleOrderSummary(basket) {
	let counter = basket.length - 1;
	const summaryCost = document.querySelectorAll('.summary__total-price');
	const adultCost = basket[counter].adultNumber * basket[counter].adultPrice;
	const childCost = basket[counter].childNumber * basket[counter].childPrice;
	summaryCost[counter].textContent = `${adultCost + childCost} PLN`;
}

function totalValueSummary() {
	const totalCostValue = document.querySelector('.order__total-price-value');
	const totalValueContainer = [];
	const summaryCost = document.querySelectorAll('.summary__total-price');
	if (summaryCost.length !== 0) {
		summaryCost.forEach((item) => {
			totalValueContainer.push(Number(item.textContent.match(/\d+/g)));
			const totalValue = totalValueContainer
				.flat()
				.reduce((total, item) => (total += item), 0);
			console.log(totalValue);

			totalCostValue.textContent = `${totalValue} PLN`;
		});
	} else {
		totalCostValue.textContent = '0 PLN';
	}
}

function totalNumberOfTickets(order, basket) {
	let counter = basket.length - 1;
	const summaryText = document.querySelectorAll('.summary__prices');
	if (order.adultNumber && order.childNumber) {
		summaryText[
			counter
		].textContent = `dorośli: ${order.adultNumber} x ${order.adultPrice}PLN, dzieci: ${order.childNumber} x ${order.childPrice}PLN`;
	} else if (order.adultNumber) {
		summaryText[
			counter
		].textContent = `dorośli: ${order.adultNumber} x ${order.adultPrice}PLN`;
	} else if (order.childNumber) {
		summaryText[
			counter
		].textContent = `dzieci: ${order.childNumber} x ${order.childPrice}PLN`;
	}
}

function addTitleTourToSummary(order, basket) {
	let counter = basket.length - 1;
	const summaryName = document.querySelectorAll('.summary__name');
	summaryName[counter].textContent = order.title;
}

// function completeOrder(basket) {
// 	if (!basket) {
// 		throw Error('Basket is empty');
// 	}
// 	orderBtn = document.querySelector('.order__field-submit');
// 	orderBtn.addEventListener('click', submitYourOrder);

// 	function submitYourOrder(e) {
// 		e.preventDefault();

// 		fullNameValidation();
// 		emailValidation();

// 		const totalOrder = document.querySelector(
// 			'.order__total-price-value'
// 		).textContent;

// 		if (totalOrder === '0PLN') {
// 			alert('Your basket is empty! :(');
// 		} else {
// 			alert('Order was placed!');
// 			clearInputValues();
// 		}
// 	}
// }

// function fullNameValidation() {
// 	const fullName = document.querySelector('input[name*="name"]').value;
// 	if (!fullName) {
// 		alert('Please enter your first and last name.');
// 		throw Error('Please enter your first and last name.');
// 	}
// }

// function emailValidation() {
// 	const email = document.querySelector('input[name*="email"]').value;
// 	if (!email.match(/@/g)) {
// 		alert('Email needs to contain "@" sign.');
// 		throw Error('Email needs to contain "@" sign.');
// 	}
// }

function removeOrder(basket) {
	let counter = basket.length - 1;
	const removeOrderList = document.querySelectorAll('.summary__btn-remove');
	removeOrderList[counter].addEventListener('click', formatValues);

	function formatValues(e) {
		e.preventDefault();

		basket.pop();
		const removeBtn = e.target;
		const currentLi = removeBtn.parentElement.parentElement;
		currentLi.remove();
		totalValueSummary();
	}
}

function clearInputValues() {
	const totalCostValue = document.querySelector('.order__total-price-value');
	const summaryCost = document.querySelector('.summary__total-price');
	const summaryText = document.querySelector('.summary__prices');
	const summaryName = document.querySelector('.summary__name');
	totalCostValue.textContent = `0PLN`;
	summaryCost.textContent = `0PLN`;
	summaryText.textContent = '';
	summaryName.textContent = '';

	const fullName = document.querySelector('input[name*="name"]');
	const email = document.querySelector('input[name*="email"]');
	fullName.value = '';
	email.value = '';

	const inputQuantityAdultList = document.querySelectorAll(
		'.excursions__field-input--adult'
	);
	const inputQuantityChildrenList = document.querySelectorAll(
		'.excursions__field-input--child'
	);
	inputQuantityAdultList.forEach((item) => {
		item.value = '';
	});
	inputQuantityChildrenList.forEach((item) => {
		item.value = '';
	});
}
