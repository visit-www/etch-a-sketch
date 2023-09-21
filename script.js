const body = document.querySelector('body');
const gridContainer = document.querySelector('.grid-container');

console.log(`${body.clientWidth} X ${body.clientHeight}`);
const input = document.getElementById('number-input');
const submit = document.getElementById('submit-button');

// set the size of grid and make it a sqaure

function setSketchPaper() {
	var containerWidth = body.clientWidth;
	var containerHeight = body.clientHeight;
	if (containerHeight > containerWidth) {
		sketchPaperHeight = containerWidth;
		sketchPaperWidth = containerWidth;
	} else {
		sketchPaperHeight = containerHeight;
		sketchPaperWidth = containerHeight;
	}
	// set the size of gird as sketchpaper size
	gridContainer.style.width = sketchPaperWidth + 'px';
	gridContainer.style.height = sketchPaperHeight + 'px';
}
setSketchPaper();
function renderBox() {
	var boxSize = sketchPaperWidth / n;
	boxElement.style.width = boxSize + 'px';
	boxElement.style.height = boxSize + 'px';
	boxElement.classList.add = 'box';
}

submit.addEventListener('click', () => {
	var n = input.value;
	gridSize = n * n;
	var i = 1;
	while (i <= gridSize) {
		const boxElement = document.createElement('div');
		var boxSize = sketchPaperWidth / n;
		boxElement.style.width = boxSize + 'px';
		boxElement.style.height = boxSize + 'px';
		boxElement.classList.add = 'box';
		i++;
	}
});
