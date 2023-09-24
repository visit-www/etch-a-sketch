//** define the constants. **
const body = document.querySelector('body');
const gridContainer = document.querySelector('.grid-container');
const input = document.getElementById('number-input');
const submit = document.getElementById('submit-button');
let boxes = null;
//** FUNCTIONS **

// Define function to set the size of grid and make it a sqaure
function drawGridOutline() {
	var containerWidth = body.clientWidth;
	var containerHeight = body.clientHeight;
	gridHeight = containerHeight - (30 * containerHeight) / 100;
	gridWidth = containerWidth - (20 * containerWidth) / 100;
	gridContainer.style.width = gridWidth + 'px';
	gridContainer.style.height = gridHeight + 'px';
}

// define function to fill the girdContainer with desire number of boxes.
// Default is 16X16=256 boxes.
function fillGrid() {
	var n; //var n will hold the value of number of boxes requested. By default it will be 16, but if user provides and input then it will be = input.value.
	if (input.value) {
		var n = input.value;
	} else {
		n = 16;
	}
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
	sketch(); // function to allow sketching / painting using the cursor
}

//define function to clear old grid each time the user request new grid.
function clearGrid() {
	const boxes = document.querySelectorAll('.box'); // retrieve the node list for boxes. this will only work only after the createGrid function is executed ad boxes are added by this function.
	if (boxes) {
		boxes.forEach((box) => {
			box.remove(); //this will only remove the child element.
			// keep in mind if you use gridContainer.box.remove(box) then this
			// will remove entire girdContainer along with the child elements !
		});
	} else {
		console.log('Nothing to clear!');
	}
}
//define function to enable painting of the boxes.
function sketch() {
	// retrieve node list fo all boxes. This wil work only inside createGrid
	// function as box class is added in that function only. Therefore the
	// sketch() function will be called upon just before the end of the
	// createGrid() function.
	const newBoxes = document.querySelectorAll('.box');
	boxes = newBoxes;
	// create a isPainting anchor button which till be toggled on and off by
	// mouseup or mousedown respectively.
	let isPainting = false;
	// add mousedown event listener to the **document** itself.
	document.addEventListener('mousedown', (e) => {
		if (e.button === 0) {
			// Left mouse button is clicked (button === 0)
			isPainting = true;
		}
	});
	// toggle of isPainting when mouse is up.
	document.addEventListener('mouseup', () => {
		isPainting = false;
	});
	// now add mousemove event listener to each box.
	boxes.forEach((box) => {
		box.addEventListener('mousemove', (e) => {
			if (isPainting) {
				box.style.cursor = 'pointer';
				box.style.backgroundColor = 'black';
			}
		});
	});
}
// ** Call functions. **
drawGridOutline(); // call function to draw the grid outline as soon as page loads.
fillGrid(); //  // call function to fill the  grid outline as soon as page loads. It fill will default 256 boxes.

// add event listener submit button. This will first clear the grid and then
// after 100ms gap will fill the grid with requested number of boxes.
submit.addEventListener('click', () => {
	clearGrid(); // clearGrid function is called upon as soon as the user submit nea input.
	setTimeout(() => {
		fillGrid(); // execute the fillGrid function after some delay for aesthetic purposes.
	}, 100);
	const newBoxes = document.querySelectorAll('.box');
	boxes = newBoxes;
});

console.log(boxes);
