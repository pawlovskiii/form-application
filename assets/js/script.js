const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
"2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

// console.log(txt.split(/[\r\n]+/gm));

const splittedTxt = txt.split(/[\r\n]+/gm);

splittedTxt.forEach((item) => {
	/* ID wycieczki */
	const idTour = item.substring(1, 2);
	// console.log(idTour);

	/* Nazwa wycieczki */
	const nameTour = item.substring(5, 20).split(',');
	const nameTourExtract = nameTour[0].split('"')[0];
	// console.log(nameTourExtract);

	/* Opis wycieczki */

	/* Cena za dzieczko/dorosłych */
	const ticketPrice = item.match(/\d{2}/g);
	const priceChild = String(ticketPrice.slice(ticketPrice.length - 1));
	// console.log(priceChild);

	const priceAdult = String(
		ticketPrice.slice(ticketPrice.length - 2, ticketPrice.length - 1)
	);
	// console.log(priceAdult);
});

/* Opis wycieczki */
const ogrodzieniecDesc = txt.substring(20, 315);
// console.log(ogrodzieniecDesc);
const ojcowDesc = txt.substring(346, 719);
// console.log(ojcowDesc);

// SPLIT BACKUP WITH CERTAIN WORK

// const ulTours = document.querySelector('.panel__excursions');
// const liTour = document.querySelector('.excursions__item--prototype');
// const liTourClone = liTour.cloneNode(true);
// ulTours.appendChild(liTourClone);

// const toursName = document.querySelectorAll('.excursions__title');

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
			// console.log(splittedTxt);

			splittedTxt.forEach(() => {
				const liTourClone = liTour.cloneNode(true);
				liTourClone.classList.remove('excursions__item--prototype');
				ulTours.appendChild(liTourClone);
			});
			liTour.remove();

			splittedTxt.forEach((item, index) => {
				/* ID wycieczki */
				const idTour = item.substring(1, 2);
				console.log(idTour);

				/* Nazwa wycieczki */
				const toursName = document.querySelectorAll('.excursions__title');
				const nameTour = item.substring(5, 20).split(',');
				const nameTourExtract = nameTour[0].split('"')[0];
				toursName[index].textContent = nameTourExtract;

				/* Cena za dzieczko/dorosłych */
				const ticketPrice = item.match(/\d{2}/g);
				const priceChild = String(ticketPrice.slice(ticketPrice.length - 1));
				// console.log(priceChild);

				const priceAdult = String(
					ticketPrice.slice(ticketPrice.length - 2, ticketPrice.length - 1)
				);
				// console.log(priceAdult);
			});

			/* Opis wycieczki */
			const ogrodzieniecDesc = txt.substring(20, 315);
			// console.log(ogrodzieniecDesc);
			const ojcowDesc = txt.substring(346, 719);
			// console.log(ojcowDesc);
		};
		reader.readAsText(file, 'UTF-8');
	} else {
		console.log('Wybierz plik tekstowy!');
	}
}
