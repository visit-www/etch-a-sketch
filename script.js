const body = document.querySelector('body');
const gridContainer = document.querySelector('.grid-container');

console.log(`${body.clientWidth} X ${body.clientHeight}`);
const input = document.getElementById('number-input');
const submit = document.getElementById('submit-button');

// set the size of grid and make it a sqaure

function drawGridOutline() {
	var containerWidth = body.clientWidth;
	var containerHeight = body.clientHeight;
	gridHeight = containerHeight - (30 * containerHeight) / 100;
	gridWidth = containerWidth - (20 * containerWidth) / 100;

	gridContainer.style.width = gridWidth + 'px';
	console.log(`width = ${gridWidth + 'px'}`);
	console.log(`height = ${gridHeight + 'px'}`);
	gridContainer.style.height = gridHeight + 'px';
}
drawGridOutline();

function fillGrid() {
	console.log('wre will fill the grid');
	var n;
	console.log(` var n is ${n}`);
	if (input.value) {
		console.log(` input ${input.value}`);
		var n = input.value;
	} else {
		n = 16;
		console.log(` else loop-: var n is ${n}`);
	}
	gridSize = n * n;
	var i = 1;
	console.log(`gridsize asked for is ${gridSize}`);

	while (i <= gridSize) {
		const boxElement = document.createElement('div');
		boxElement.classList.add('box');
		var gridArea = gridHeight * gridWidth;
		var boxElementArea = gridArea / gridSize;
		var boxSize = Math.sqrt(boxElementArea);
		// var boxSize = gridWidth / n;
		console.log(`box size is ${boxSize}`);
		boxElement.style.flex = boxSize + 'px';
		// boxElement.style.width = boxSize + 'px';
		boxElement.style.height = '1 1 ' + boxSize + 'px';
		// add function to make this grid appear as sketchpaper
		sketch(boxElement);
		gridContainer.appendChild(boxElement);
		i++;
	}
}
fillGrid();

function clearGrid() {
	const box = document.querySelectorAll('.box');
	console.log(box);
	if (box) {
		box.forEach((box) => {
			box.remove(); //this will only remove the child element.
			// keep in mind if you use gridContainer.box.remove(box) then this
			// will remove entire girdContainer along with the child elements !

			console.log('all cleared');
		});
	} else {
		console.log('Nothing to clear');
	}
}
function sketch(pixel) {
	pixel.addEventListener('mouseenter', () => {
		pixel.style.cursor = 'pointer';
		pixel.style.backgroundColor = 'black';
	});
}

submit.addEventListener('click', () => {
	console.log('button clicked');
	clearGrid();
	setTimeout(() => {
		fillGrid();
	}, 100);
});
