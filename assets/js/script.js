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

				setText(item, index);
			});
			setTourDescription();

			let basketOrder = {};
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
				addToOrderBtnList,
				numberOfAdultTicketsInputList,
				numberOfChildrenTicketsInputList
			);
			secondTourOrder(
				addToOrderBtnList,
				numberOfAdultTicketsInputList,
				numberOfChildrenTicketsInputList
			);

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
	const nameTour = item.substring(5, 20).split(',');
	const nameTourExtract = nameTour[0].split('"')[0];
	toursName[index].textContent = nameTourExtract;
}

function setChildPrice(item, index) {
	const childPriceList = document.querySelectorAll('.excursions__price--child');
	const ticketPrice = item.match(/\d{2}/g);
	const priceChild = String(ticketPrice.slice(ticketPrice.length - 1));
	childPriceList[index].textContent = priceChild;
}

function setAdultPrice(item, index) {
	const ticketPrice = item.match(/\d{2}/g);
	const adultPriceList = document.querySelectorAll('.excursions__price--adult');
	const priceAdult = String(
		ticketPrice.slice(ticketPrice.length - 2, ticketPrice.length - 1)
	);
	adultPriceList[index].textContent = priceAdult;
}

function setText(item, index) {
	const tourDescList = document.querySelectorAll('.excursions__description');
	tourDescList[index].textContent = item;
}

function setTourDescription() {
	const tourDescList = document.querySelectorAll('.excursions__description');
	tourDescList[0].textContent = tourDescList[0].textContent.substring(20, 315);
	tourDescList[1].textContent = tourDescList[1].textContent.substring(13, 386);
}

function firstTourOrder(
	addToOrderBtnList,
	numberOfAdultTicketsInputList,
	numberOfChildrenTicketsInputList
) {
	addToOrderBtnList[0].addEventListener('click', addTicketsFirstTour);

	let firstTourAdultQuantityTickets = 0;
	let firstTourChildrenQuantityTickets = 0;
	function addTicketsFirstTour(e) {
		e.preventDefault();

		if (
			!numberOfAdultTicketsInputList[0].value &&
			!numberOfChildrenTicketsInputList[0].value
		) {
			alert('Enter amount of tickets.');
		} else {
			const basketOrder = {};
			const obj = { title: 'Ogrodzieniec' };
			if (Object.keys(basketOrder).length === 0) {
				basketOrder.title = obj.title;
			} else {
				basketOrder.title = obj.title;
			}
			if (numberOfAdultTicketsInputList[0].value) {
				firstTourAdultQuantityTickets = numberOfAdultTicketsInputList[0].value;
				const adultPriceList = document.querySelectorAll(
					'.excursions__price--adult'
				);
				basketOrder.adultNumber = firstTourAdultQuantityTickets;
				basketOrder.adultPrice = adultPriceList[0].textContent;
			}
			if (numberOfChildrenTicketsInputList[0].value) {
				firstTourChildrenQuantityTickets =
					numberOfChildrenTicketsInputList[0].value;
				const childrenPriceList = document.querySelectorAll(
					'.excursions__price--child'
				);
				basketOrder.childrenNumber = firstTourChildrenQuantityTickets;
				basketOrder.childrenPrice = childrenPriceList[0].textContent;
			}
			console.log(basketOrder);

			totalValueSummary(basketOrder);
			totalNumberOfTickets(basketOrder);
			addTitleTourToSummary(basketOrder);
		}
	}
}

function secondTourOrder(
	addToOrderBtnList,
	numberOfAdultTicketsInputList,
	numberOfChildrenTicketsInputList
) {
	addToOrderBtnList[1].addEventListener('click', addTicketsSecondTour);

	let secondTourAdultQuantityTickets = 0;
	let secondTourChildrenQuantityTickets = 0;
	function addTicketsSecondTour(e) {
		e.preventDefault();
		if (
			!numberOfAdultTicketsInputList[1].value &&
			!numberOfChildrenTicketsInputList[1].value
		) {
			alert('Enter amount of tickets.');
		} else {
			const basketOrder = {};
			const obj = { title: 'Ojców' };
			if (Object.keys(basketOrder).length === 0) {
				basketOrder.title = obj.title;
			} else {
				basketOrder.title = obj.title;
			}
			if (numberOfAdultTicketsInputList[1].value) {
				secondTourAdultQuantityTickets = numberOfAdultTicketsInputList[1].value;

				const adultPriceList = document.querySelectorAll(
					'.excursions__price--adult'
				);
				basketOrder.adultNumber = secondTourAdultQuantityTickets;
				basketOrder.adultPrice = adultPriceList[1].textContent;
			}
			if (numberOfChildrenTicketsInputList[1].value) {
				secondTourChildrenQuantityTickets =
					numberOfChildrenTicketsInputList[1].value;

				const childrenPriceList = document.querySelectorAll(
					'.excursions__price--child'
				);
				basketOrder.childrenNumber = secondTourChildrenQuantityTickets;
				basketOrder.childrenPrice = childrenPriceList[1].textContent;
			}
			console.log(basketOrder);

			totalValueSummary(basketOrder);
			totalNumberOfTickets(basketOrder);
			addTitleTourToSummary(basketOrder);
		}
	}
}

function totalValueSummary(basketOrder) {
	const totalCostValue = document.querySelector('.order__total-price-value');
	const summaryCost = document.querySelector('.summary__total-price');
	const adultTicketsCost =
		basketOrder.adultNumber * basketOrder.adultPrice;
	const childrenTicketCost =
		basketOrder.childrenNumber * basketOrder.childrenPrice;
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

function removeOrder(basketOrder) {
	if (basketOrder) {
		const removeOrder = document.querySelector('.summary__btn-remove');
		removeOrder.addEventListener('click', formatValues);

		function formatValues(e) {
			e.preventDefault();
			const totalCostValue = document.querySelector(
				'.order__total-price-value'
			);
			const summaryCost = document.querySelector('.summary__total-price');
			const summaryText = document.querySelector('.summary__prices');
			const summaryName = document.querySelector('.summary__name');
			const inputQuantityAdultList = document.querySelectorAll(
				'.excursions__field-input--adult'
			);
			inputQuantityAdultList.forEach((item) => {
				item.value = '';
			});
			const inputQuantityChildrenList = document.querySelectorAll(
				'.excursions__field-input--child'
			);
			inputQuantityChildrenList.forEach((item) => {
				item.value = '';
			});
			totalCostValue.textContent = `0PLN`;
			summaryCost.textContent = `0PLN`;
			summaryText.textContent = '';
			summaryName.textContent = '';
		}
	}
}
