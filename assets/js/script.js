const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
"2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

// console.log(txt.split(/[\r\n]+/gm));

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

			const basketOrder = [];
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
				numberOfChildrenTicketsInputList,
				basketOrder
			);
			secondTourOrder(
				addToOrderBtnList,
				numberOfAdultTicketsInputList,
				numberOfChildrenTicketsInputList,
				basketOrder
			);
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
	numberOfChildrenTicketsInputList,
	basketOrder
) {
	addToOrderBtnList[0].addEventListener('click', addTicketsFirstTour);

	let firstTourAdultQuantityTickets = 0;
	let firstTourChildrenQuantityTickets = 0;
	function addTicketsFirstTour(e) {
		e.preventDefault();
		const obj = { title: 'Ogrodzieniec' };
		if (basketOrder.length === 0) {
			basketOrder.push(obj);
		} else {
			basketOrder[0].title = 'Ogrodzieniec';
		}
		if (numberOfAdultTicketsInputList[0].value) {
			firstTourAdultQuantityTickets = numberOfAdultTicketsInputList[0].value;
			const adultPriceList = document.querySelectorAll(
				'.excursions__price--adult'
			);
			basketOrder[0].adultNumber = firstTourAdultQuantityTickets;
			basketOrder[0].adultPrice = adultPriceList[0].textContent;
		}
		if (numberOfChildrenTicketsInputList[0].value) {
			firstTourChildrenQuantityTickets =
				numberOfChildrenTicketsInputList[0].value;
			const childrenPriceList = document.querySelectorAll(
				'.excursions__price--child'
			);
			basketOrder[0].childrenNumber = firstTourChildrenQuantityTickets;
			basketOrder[0].childrenPrice = childrenPriceList[0].textContent;
		}
		console.log(basketOrder);

		// totalValue
		totalValueSummary(basketOrder);
	}
}

function secondTourOrder(
	addToOrderBtnList,
	numberOfAdultTicketsInputList,
	numberOfChildrenTicketsInputList,
	basketOrder
) {
	addToOrderBtnList[1].addEventListener('click', addTicketsSecondTour);

	let secondTourAdultQuantityTickets = 0;
	let secondTourChildrenQuantityTickets = 0;
	function addTicketsSecondTour(e) {
		e.preventDefault();
		const obj = { title: 'Ojców' };
		if (basketOrder.length === 0) {
			basketOrder.push(obj);
		} else {
			basketOrder[0].title = 'Ojców';
		}
		if (numberOfAdultTicketsInputList[1].value) {
			secondTourAdultQuantityTickets = numberOfAdultTicketsInputList[1].value;

			const adultPriceList = document.querySelectorAll(
				'.excursions__price--adult'
			);
			basketOrder[0].adultNumber = secondTourAdultQuantityTickets;
			basketOrder[0].adultPrice = adultPriceList[1].textContent;
		}
		if (numberOfChildrenTicketsInputList[1].value) {
			secondTourChildrenQuantityTickets =
				numberOfChildrenTicketsInputList[1].value;

			const childrenPriceList = document.querySelectorAll(
				'.excursions__price--child'
			);
			basketOrder[0].childrenNumber = secondTourChildrenQuantityTickets;
			basketOrder[0].childrenPrice = childrenPriceList[1].textContent;
		}
		console.log(basketOrder);

		// totalValue
		totalValueSummary(basketOrder);
	}
}

function totalValueSummary(basketOrder) {
	const totalCostValue = document.querySelector('.order__total-price-value');
	const summaryCost = document.querySelector('.summary__total-price');
	const adultTicketsCost =
		basketOrder[0].adultNumber * basketOrder[0].adultPrice;
	const childrenTicketCost =
		basketOrder[0].childrenNumber * basketOrder[0].childrenPrice;
	totalCostValue.textContent = `${adultTicketsCost + childrenTicketCost}PLN`;
	summaryCost.textContent = `${adultTicketsCost + childrenTicketCost}PLN`;
}
