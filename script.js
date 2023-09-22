const body = document.querySelector('body');
const gridContainer = document.querySelector('.grid-container');

console.log(`${body.clientWidth} X ${body.clientHeight}`);
const input = document.getElementById('number-input');
const submit = document.getElementById('submit-button');

// set the size of grid and make it a sqaure

function drawGridOutline() {
	var containerWidth = body.clientWidth;
	var containerHeight = body.clientHeight;
	sketchPaperHeight = containerHeight - 30;
	sketchPaperWidth = containerWidth - 30;
	// if (containerHeight > containerWidth) {
	// 	sketchPaperHeight = containerWidth;
	// 	sketchPaperWidth = containerWidth;
	// } else {
	// 	sketchPaperHeight = containerHeight;
	// 	sketchPaperWidth = containerHeight;
	// }
	// set the size of gird as sketchpaper size
	gridContainer.style.width = sketchPaperWidth + 'px';
	console.log(`width = ${sketchPaperWidth + 'px'}`);
	console.log(`height = ${sketchPaperHeight + 'px'}`);
	gridContainer.style.height = sketchPaperHeight + 'px';
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
		console.log(` var n is ${n}`);
		n = 16;
		console.log(` else loop-: var n is ${n}`);
	}
	gridSize = n * n;
	var i = 1;

	while (i <= gridSize) {
		const boxElement = document.createElement('div');
		boxElement.classList.add('box');
		var gridArea = sketchPaperHeight * sketchPaperWidth;
		var boxElementArea = gridArea / boxElementArea;
		var boxSize = math.sqrt(boxElementArea);
		// var boxSize = sketchPaperWidth / n;
		console.log(`box size is ${boxSize}`);
		boxElement.style.flex = boxSize + 'px';
		// boxElement.style.width = boxSize + 'px';
		boxElement.style.height = boxSize + 'px';
		gridContainer.appendChild(boxElement);
		i++;
	}
}
fillGrid();

submit.addEventListener('click', () => {
	var n = input.value;
	gridSize = n * n;
	var i = 1;
	while (i <= gridSize) {
		const boxElement = document.createElement('div');
		var boxSize = sketchPaperWidth / n;
		boxElement.classList.add('box');
		boxElement.style.width = boxSize + 'px';
		boxElement.style.height = boxSize + 'px';

		gridContainer.appendChild(boxElement);
		i++;
	}
});
