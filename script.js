//** define the constants. **
const body = document.querySelector('body');
const gridContainer = document.querySelector('.grid-container');
const input = document.getElementById('number-input');
const submit = document.getElementById('submit-button');
const pen = document.getElementById('draw-button');
const eraser = document.getElementById('erase-button');
const gridWidth = gridContainer.clientWidth;
const gridHeight = gridContainer.clientHeight;

let boxes = null; //declare boxes a node list in global scope so that it can be accessed by all function in the script. its initial value is null (as no boxes to start with). Once fillGrid functions runs (Initially on page load and later on pressing submit button), this function not only creates boxes but also updates the value of boxes in global scope so that it can be access by other functions.
//constants used for toggle functionality.
let isPainting = false;
let isErasing = false;

//** FUNCTIONS **

// define function to fill the girdContainer with desire number of boxes.
// Default is 16X16=256 boxes.
function fillGrid() {
	var n; //var n will hold the value of number of boxes requested. By default it will be 16, but if user provides and input then it will be = input.value.
	if (input.value) {
		var n = input.value;
	} else {
		n = 16;
	}
	console.log(n);
	gridSize = n * n;
	var i = 1; // setting the counter to 1; it will increase till i= gridSize. Use while loop.

	while (i <= gridSize) {
		const boxElement = document.createElement('div'); // create a box.
		boxElement.classList.add('box');
		// calculate the dimension of each box.
		var gridArea = gridHeight * gridWidth; //calculate the available area / space in gridContainer.
		var boxElementArea = gridArea / gridSize; //the area of each box = area of girdContainer divided by the number of boxes requested.
		var boxSize = Math.sqrt(boxElementArea); // each dimension of the square box = sqrt of the box area.

		boxElement.style.flex = '1 1 ' + boxSize + 'px'; // set the inline style for flex property setting flex.grow to 1 , flex-shrink to and flex basis = boxSize in px.
		boxElement.style.height = boxSize + 'px'; // set box height = boxSize (ensuring each box is a square)
		gridContainer.appendChild(boxElement); // append the boxElement created to the gird container.
		i++;
	}
	const newBoxes = document.querySelectorAll('.box');
	boxes = newBoxes;
	// sketch(); // function to allow sketching / painting using the cursor
	console.log(boxes);
}

//define function to clear old grid each time the user request new grid.
function clearGrid() {
	if (boxes) {
		boxes.forEach((box) => {
			box.remove();
		});
	} else {
		console.log('Nothing to clear!');
	}
}
function penDownHandler(e) {
	console.log('pen down');
	if (e.button === 0) {
		console.log('left click');
		// Left mouse button is clicked (button === 0)
		isPainting = true;
	}
}
function penUpHandler() {
	console.log('pen up');
	pen.textContent = 'Click and drag to draw';
	isPainting = false;
}
function penMoveHandler(e) {
	console.log(`logig the status of pen inside movehandler ${isPainting}`);
	if (isPainting) {
		pen.textContent = 'Drawing!';
		e.target.style.cursor = 'pointer';
		e.target.style.backgroundColor = 'black';
		console.log('pen moving');
	}
}

pen.addEventListener('click', (e) => {
	if (pen.textContent === 'Pen') {
		removeEraserEventListeners();
		pen.textContent = 'Click and drag to draw';
		eraser.textContent = 'Pen';
		gridContainer.addEventListener('mousedown', penDownHandler);
		gridContainer.addEventListener('mouseup', penUpHandler);
		boxes.forEach((box) => {
			box.addEventListener('mousemove', penMoveHandler);
		});
	}
});

function removePenEventListeners() {
	if (pen.textContent === 'Click and drag to draw') {
		gridContainer.removeEventListener('mousedown', penDownHandler);
		gridContainer.removeEventListener('mouseup', penUpHandler);
		console.log(
			`logging boxes from inside the remove event listner function${boxes}`
		);
		boxes.forEach((box) => {
			console.log(box);
			box.removeEventListener('mousemove', penMoveHandler);
		});
	}
}

function eraserDownHandler(e) {
	console.log('eraser down');
	if (e.button === 0) {
		console.log('left click');
		// Left mouse button is clicked (button === 0)
		isErasing = true;
	}
}
function eraserUpHandler() {
	console.log('Eraser up');
	eraser.textContent = 'Click and drag to erase';
	isErasing = false;
}
function eraserMoveHandler(e) {
	console.log(`logging the status of eraser inside move handler ${isPainting}`);

	if (isErasing) {
		eraser.textContent = 'Erasing!';
		e.target.style.cursor = 'pointer';
		e.target.style.backgroundColor = '';
		console.log('Eraser is moving');
	}
}
eraser.addEventListener('click', (e) => {
	if (eraser.textContent === 'Eraser') {
		removePenEventListeners();

		eraser.textContent = 'Click and drag to erase';
		pen.textContent = 'Pen';
		gridContainer.addEventListener('mousedown', eraserDownHandler);
		gridContainer.addEventListener('mouseup', eraserUpHandler);
		boxes.forEach((box) => {
			box.addEventListener('mousemove', eraserMoveHandler);
		});
	}

	function removeEraserEventListeners() {
		if (eraser.textContent === 'Click and drag to erase') {
			gridContainer.removeEventListener('mousedown', eraserDownHandler);
			gridContainer.removeEventListener('mouseup', eraserUpHandler);
			console.log(
				`logging boxes from inside the remove event listner function${boxes}`
			);
			boxes.forEach((box) => {
				box.removeEventListener('mousemove', eraserMoveHandler);
			});
		}
	}
});
//define function to enable painting of the boxes.
function sketch() {
	// add mousedown event listener to the **document** itself.
	gridContainer.addEventListener('mousedown', penDownHandler);
	// toggle of isPainting when mouse is up.
	gridContainer.addEventListener('mouseup', penDownHandler);
	// now add mousemove event listener to each box.
	boxes.forEach((box) => {
		box.addEventListener('mousemove', penMoveHandler(box));
	});
}
// ** Call functions. **

fillGrid(); //  // call function to fill the  grid outline as soon as page loads. It fill will default 256 boxes.

// add event listener submit button. This will first clear the grid and then
// after 100ms gap will fill the grid with requested number of boxes.
submit.addEventListener('click', () => {
	clearGrid(); // clearGrid function is called upon as soon as the user submit new input.
	setTimeout(() => {
		fillGrid(); // execute the fillGrid function after some delay for aesthetic purposes.
	}, 100);
});
