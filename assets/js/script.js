const fileEl = document.querySelector('.uploader__input');
fileEl.addEventListener('change', readFile);
const ulTours = document.querySelector('.panel__excursions');
const liTour = document.querySelector('.excursions__item--prototype');

const adultPriceList = document.querySelectorAll('.excursions__price--adult');
const childrenPriceList = document.querySelectorAll(
	'.excursions__price--child'
);

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

			let basketOrder = [];
			const addToOrderBtnList = document.querySelectorAll(
				'.excursions__field-input--submit'
			);
			const numberOfAdultTicketsInputList = document.querySelectorAll(
				'.excursions__field-input--adult'
			);
			const numberOfChildrenTicketsInputList = document.querySelectorAll(
				'.excursions__field-input--child'
			);

			firstTourOrder(
				addToOrderBtnList[0],
				numberOfAdultTicketsInputList[0],
				numberOfChildrenTicketsInputList[0]
			);
			secondTourOrder(
				addToOrderBtnList[1],
				numberOfAdultTicketsInputList[1],
				numberOfChildrenTicketsInputList[1]
			);
			completeOrder(basketOrder);
			removeOrder(basketOrder);
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

function firstTourOrder(
	addToOrderBtnList,
	numberOfAdultTicketsInputList,
	numberOfChildrenTicketsInputList
) {
	// TESTING FUNC
	const sectionPanel = document.querySelector('.panel');
	sectionPanel.addEventListener('click', testFunc);

	function testFunc(e) {
		console.log(e.target);
		console.log(e.target.value);
	}

	// NOT CHANGE
	addToOrderBtnList.addEventListener('click', addTicketsFirstTour);

	function addTicketsFirstTour(e) {
		e.preventDefault();

		const adultTicketsQuantity = numberOfAdultTicketsInputList.value;
		const childrenTicketsQuantity = numberOfChildrenTicketsInputList.value;

		emptyOrderValidation(adultTicketsQuantity, childrenTicketsQuantity);
		numberValidation(adultTicketsQuantity, childrenTicketsQuantity);

		const basketOrder = {};
		const title =
			e.target.parentElement.parentElement.parentElement.firstElementChild
				.firstElementChild.textContent;
		const obj = { title: title };
		setTitleOrder(basketOrder, obj);

		const adultPriceList = document.querySelectorAll(
			'.excursions__price--adult'
		);
		const childrenPriceList = document.querySelectorAll(
			'.excursions__price--child'
		);

		// NEED TO CHANGE
		let firstTourAdultQuantityTickets = 0;
		getQuantityAndPriceTicketsAdultsOrder(
			numberOfAdultTicketsInputList,
			basketOrder,
			firstTourAdultQuantityTickets,
			adultPriceList[0]
		);
		let firstTourChildrenQuantityTickets = 0;
		getQuantityAndPriceTicketsChildrenOrder(
			numberOfChildrenTicketsInputList,
			basketOrder,
			firstTourChildrenQuantityTickets,
			childrenPriceList[0]
		);
		console.log(basketOrder);

		// safeZone
		totalValueSummary(basketOrder);
		totalNumberOfTickets(basketOrder);
		addTitleTourToSummary(basketOrder);
	}
}

function emptyOrderValidation(adultTicketsQuantity, childrenTicketsQuantity) {
	if (!adultTicketsQuantity && !childrenTicketsQuantity) {
		alert('Enter amount of tickets.');
		throw Error('Invalid number of tickets.');
	}
}

function numberValidation(adultTicketsQuantity, childrenTicketsQuantity) {
	const additionInput = adultTicketsQuantity + childrenTicketsQuantity;
	const ticketsValidation = /^\d+$/g.test(additionInput);

	if (!ticketsValidation) {
		alert('Enter integer values as orders values.');
		throw Error('Invalid type of order values.');
	}
}

function setTitleOrder(basketOrder, obj) {
	if (Object.keys(basketOrder).length === 0) {
		basketOrder.title = obj.title;
	} else {
		basketOrder.title = obj.title;
	}
}

function getQuantityAndPriceTicketsAdultsOrder(
	numberOfAdultTicketsInputList,
	basketOrder,
	quantityTicketsAdults,
	adultPriceItem
) {
	if (numberOfAdultTicketsInputList.value) {
		quantityTicketsAdults = numberOfAdultTicketsInputList.value;
		basketOrder.adultNumber = quantityTicketsAdults;
		basketOrder.adultPrice = adultPriceItem.textContent;
	}
}

function getQuantityAndPriceTicketsChildrenOrder(
	numberOfChildrenTicketsInputList,
	basketOrder,
	quantityTicketsChildren,
	childrenPriceItem
) {
	if (numberOfChildrenTicketsInputList.value) {
		quantityTicketsChildren = numberOfChildrenTicketsInputList.value;
		basketOrder.childrenNumber = quantityTicketsChildren;
		basketOrder.childrenPrice = childrenPriceItem.textContent;
	}
}

function secondTourOrder(
	addToOrderBtnList,
	numberOfAdultTicketsInputList,
	numberOfChildrenTicketsInputList
) {
	addToOrderBtnList.addEventListener('click', addTicketsSecondTour);

	function addTicketsSecondTour(e) {
		e.preventDefault();

		const adultTicketsQuantity = numberOfAdultTicketsInputList.value;
		const childrenTicketsQuantity = numberOfChildrenTicketsInputList.value;

		emptyOrderValidation(adultTicketsQuantity, childrenTicketsQuantity);
		numberValidation(adultTicketsQuantity, childrenTicketsQuantity);

		const basketOrder = {};
		const title =
			e.target.parentElement.parentElement.parentElement.firstElementChild
				.firstElementChild.textContent;
		const obj = { title: title };
		setTitleOrder(basketOrder, obj);

		const adultPriceList = document.querySelectorAll(
			'.excursions__price--adult'
		);
		const childrenPriceList = document.querySelectorAll(
			'.excursions__price--child'
		);

		// NEED TO CHANGE
		let secondTourAdultQuantityTickets = 0;
		getQuantityAndPriceTicketsAdultsOrder(
			numberOfAdultTicketsInputList,
			basketOrder,
			secondTourAdultQuantityTickets,
			adultPriceList[1]
		);
		let secondTourChildrenQuantityTickets = 0;
		getQuantityAndPriceTicketsChildrenOrder(
			numberOfChildrenTicketsInputList,
			basketOrder,
			secondTourChildrenQuantityTickets,
			childrenPriceList[1]
		);
		console.log(basketOrder);

		// safeZone
		totalValueSummary(basketOrder);
		totalNumberOfTickets(basketOrder);
		addTitleTourToSummary(basketOrder);
	}
}

function totalValueSummary(basketOrder) {
	const totalCostValue = document.querySelector('.order__total-price-value');
	const summaryCost = document.querySelector('.summary__total-price');
	const adultTicketsCost = basketOrder.adultNumber * basketOrder.adultPrice;
	const childrenTicketCost =
		basketOrder.childrenNumber * basketOrder.childrenPrice;
	possibleOrderOutput(
		totalCostValue,
		summaryCost,
		adultTicketsCost,
		childrenTicketCost
	);
}

function possibleOrderOutput(
	totalCostValue,
	summaryCost,
	adultTicketsCost,
	childrenTicketCost
) {
	if (adultTicketsCost && childrenTicketCost) {
		totalCostValue.textContent = `${adultTicketsCost + childrenTicketCost}PLN`;
		summaryCost.textContent = `${adultTicketsCost + childrenTicketCost}PLN`;
	} else if (adultTicketsCost) {
		totalCostValue.textContent = `${adultTicketsCost}PLN`;
		summaryCost.textContent = `${adultTicketsCost}PLN`;
	} else if (childrenTicketCost) {
		totalCostValue.textContent = `${childrenTicketCost}PLN`;
		summaryCost.textContent = `${childrenTicketCost}PLN`;
	}
}

function totalNumberOfTickets(basketOrder) {
	const summaryText = document.querySelector('.summary__prices');
	if (basketOrder.adultNumber && basketOrder.childrenNumber) {
		summaryText.textContent = `dorośli: ${basketOrder.adultNumber} x ${basketOrder.adultPrice}PLN, dzieci: ${basketOrder.childrenNumber} x ${basketOrder.childrenPrice}PLN`;
	} else if (basketOrder.adultNumber) {
		summaryText.textContent = `dorośli: ${basketOrder.adultNumber} x ${basketOrder.adultPrice}PLN`;
	} else if (basketOrder.childrenNumber) {
		summaryText.textContent = `dzieci: ${basketOrder.childrenNumber} x ${basketOrder.childrenPrice}PLN`;
	}
}

function addTitleTourToSummary(basketOrder) {
	const summaryName = document.querySelector('.summary__name');
	summaryName.textContent = basketOrder.title;
}

function completeOrder(basketOrder) {
	orderBtn = document.querySelector('.order__field-submit');
	orderBtn.addEventListener('click', submitYourOrder);

	function submitYourOrder(e) {
		e.preventDefault();

		fullNameValidation();
		emailValidation();

		const summaryCost = document.querySelector(
			'.summary__total-price'
		).textContent;

		if (summaryCost === '0PLN') {
			alert('Your basket is empty! :(');
		} else {
			alert('Order was placed!');
			clearInputValues();
		}
	}
}

function fullNameValidation() {
	const fullName = document.querySelector('input[name*="name"]').value;
	if (!fullName) {
		alert('Please enter your first and last name.');
		throw Error('Please enter your first and last name.');
	}
}

function emailValidation() {
	const email = document.querySelector('input[name*="email"]').value;
	if (!email.match(/@/g)) {
		alert('Email needs to contain "@" sign.');
		throw Error('Email needs to contain "@" sign.');
	}
}

function removeOrder(basketOrder) {
	if (basketOrder) {
		const removeOrder = document.querySelector('.summary__btn-remove');
		removeOrder.addEventListener('click', formatValues);

		function formatValues(e) {
			e.preventDefault();
			clearInputValues();
		}
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
