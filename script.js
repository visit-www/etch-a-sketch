//Declare constants
// -------------------------------------
//DOM related elements retrieved and stored in constants.
const body = document.querySelector('body');
const gridContainer = document.querySelector('.grid-container');
const input = document.getElementById('number-input');
const submit = document.getElementById('submit-button');
const pen = document.getElementById('draw-button');
const eraser = document.getElementById('erase-button');
const gridWidth = gridContainer.clientWidth;
const gridHeight = gridContainer.clientHeight;
const result = document.getElementById('result-container');

//Declare variables that would be needed by multiple functions in global scope.
let n; //will hold the value of user inputs.
let gridSize; // calculated size of the grid (nXn). This is calculated in fillGrid()
let boxes = null; //will store the node list of all the boxElements.
let isPainting = false; //The flag that toggles the pen and eraser buttons.
let isErasing = false; //Same as above.

//** Define functions.
// -------------------------------------

// define function to fill the girdContainer with desired number of boxes.
// Default is 16X16=256 boxes.
function fillGrid() {
	//var n will hold the value of number of boxes requested. By default it will be 16, but if user provides and input then it will be = input.value.
	if (input.value) {
		n = input.value;
	} else {
		n = 16;
	}
	gridSize = n * n;
	// enable the pen and erase , as its possible that they might have been
	// disabled during validateInput function.
	pen.disabled = false;
	eraser.disabled = false;

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
	result.textContent = `Sketch board resolution is ${gridSize} pixels (${n} X ${n})`;
	const newBoxes = document.querySelectorAll('.box');
	boxes = newBoxes; // pass the value of newBoxes outside the function.
}

// Define function to handle pen. (pemDown= mousedown; penUp=mouseup ; penMove=m
// mousemove events respectively)
function penDownHandler(e) {
	if (e.button === 0) {
		// Left mouse button is clicked (button === 0)
		isPainting = true;
	}
}
function penUpHandler() {
	pen.textContent = 'Click and drag to draw';
	isPainting = false;
}
function penMoveHandler(e) {
	if (isPainting) {
		pen.textContent = 'Drawing!';
		e.target.style.cursor = 'pointer';
		e.target.style.backgroundColor = 'black';
	}
}

//Define function to remove pen related event handlers (drawing tools)
function removePenEventListeners() {
	if (pen.textContent === 'Click and drag to draw') {
		gridContainer.removeEventListener('mousedown', penDownHandler);
		gridContainer.removeEventListener('mouseup', penUpHandler);
		boxes.forEach((box) => {
			box.removeEventListener('mousemove', penMoveHandler);
		});
	}
}

// Define functions to handle eraser related tools.
function eraserDownHandler(e) {
	if (e.button === 0) {
		// Left mouse button is clicked (button === 0)
		isErasing = true;
	}
}
function eraserUpHandler() {
	eraser.textContent = 'Click and drag to erase';
	isErasing = false;
}
function eraserMoveHandler(e) {
	if (isErasing) {
		eraser.textContent = 'Erasing!';
		e.target.style.cursor = 'pointer';
		e.target.style.backgroundColor = '';
	}
}

//Define function to remove eraser related event handlers (Eraser tools)
function removeEraserEventListeners() {
	if (eraser.textContent === 'Click and drag to erase') {
		gridContainer.removeEventListener('mousedown', eraserDownHandler);
		gridContainer.removeEventListener('mouseup', eraserUpHandler);
		boxes.forEach((box) => {
			box.removeEventListener('mousemove', eraserMoveHandler);
		});
	}
}

//Define function to clear old grid each time the user request new grid.
function clearGrid() {
	if (boxes) {
		boxes.forEach((box) => {
			box.remove();
			if (eraser.textContent === 'Click and drag to erase') {
				removeEraserEventListeners();
				eraser.textContent = 'Eraser';
			}
			if (pen.textContent === 'Click and drag to draw') {
				removePenEventListeners();
				pen.textContent = 'Pen';
			}
		});
	} else {
	}
}

// Define function to validate inputs. Only accept inputs between 16 and 100 ,
function validateInput() {
	try {
		if (input.value < 16 || input.value > 100) {
			throw new Error(
				`Invalid entry! Please only enter values between 16 or 100`
			);
		}
	} catch (error) {
		result.textContent = error.message;
		clearGrid();
		pen.disabled = true;
		eraser.disabled = true;
		throw error;
	}
}

// ** Call relevant functions on page load. **
//---------------------------------------------------------

fillGrid(); //Call function to fill the  grid outline as soon as page loads. It fill will default 256 boxes.

// Finally add event listeners to different buttons to add user interaction.
//---------------------------------------------------------

// SUbmit button.
submit.addEventListener('click', () => {
	//validity check done only if the input box actually had some value.
	if (input.value !== '') {
		validateInput();
	}
	//clearGrid() anf fillGrid() function run every time valid entry is submitted,
	clearGrid();
	fillGrid();
});

//Pen button (Drawing tools)
pen.addEventListener('click', (e) => {
	if (pen.textContent === 'Pen') {
		removeEraserEventListeners();
		pen.textContent = 'Click and drag to draw';
		eraser.textContent = 'Eraser';
		gridContainer.addEventListener('mousedown', penDownHandler);
		gridContainer.addEventListener('mouseup', penUpHandler);
		boxes.forEach((box) => {
			box.addEventListener('mousemove', penMoveHandler);
		});
	}
});

//Eraser button (Erasing tools)
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
});

// 24/09/2023. The code is working fine. Next is improving the styling and
// thinking of adding more functions.
