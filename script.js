const gridContainer = document.querySelector('.grid-container');
const numberInput = document.getElementById('number-input');
const submit = document.querySelector('#submit-button');

// add event listener to submit button
submit.addEventListener('click', (e) => {
	if (submit.textContent === 'Clear') {
		const allNewPixels = document.querySelectorAll('.pixel');
		allNewPixels.forEach((pixel) => {
			pixel.remove();
		});
		submit.textContent = 'Submit';
	} else {
		var n = numberInput.value;
		console.log(`the n is ${n}`);
		createGrid(n);
	}
});
// define creategrid function

function createGrid(n = 16) {
	console.log(
		`widht of container is ${gridContainer.clientWidth} and n is ${n}`
	);
	var gridSize = n * n;
	var boxWidth = gridContainer.clientWidth / n;

	var boxHeight = gridContainer.clientHeight / n;
	console.log(`the widht of box is ${boxWidth} nand hieght is ${boxHeight}`);
	var i = 1;

	while (i <= gridSize) {
		const newPixel = document.createElement('div');
		newPixel.className = 'pixel';
		newPixel.style.width = boxWidth + 'px';
		newPixel.style.height = boxWidth + 'px';
		newPixel.addEventListener('mouseenter', (e) => {
			// console.log(
			// 	`the pixel number ${newPixel.getAttribute('data-text')} was activated`
			// );
			newPixel.style.background = 'rgba(0, 0, 255)';
			newPixel.style.opacity = 0.5;
		});

		gridContainer.appendChild(newPixel);

		i++;
	}
	submit.textContent = 'Clear';
}
