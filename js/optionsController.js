

// make the options menu movable

let mouseDown = false;
let mouseUp = false;

let movable = document.querySelector(".options");
let moveButton = document.querySelector(".move-button");
let minimizeButton = document.querySelector(".minimize-button");
let optionsBody = document.querySelector(".options-body");
let style = getComputedStyle(movable);

let mouseX;
let mouseY;

let elOffsetX;
let elOffsetY;

let minimized = false;

document.addEventListener("mousemove", trackMouse);
document.addEventListener("touchmove", trackTouch);

moveButton.addEventListener("mousedown", getPosition);
moveButton.addEventListener("touchstart", getTouchPosition);

minimizeButton.addEventListener("mousedown", minimize);

function minimize() {
  if (!minimized) {
    optionsBody.style.display = "none";
    minimized = true;
  } else {
    optionsBody.style.display = "inline";
    minimized = false;
  }
}

function getPosition(e) {
  console.log(e);
  mouseDown = true;
  elOffsetX = e.offsetX;
  elOffsetY = e.offsetY;
}

function getTouchPosition(e) {
  mouseDown = true;
  console.log(mouseDown, e);

  elOffsetX = this.offsetLeft;
  elOffsetY = this.offsetTop;
}

function trackMouse(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;

  if (mouseDown) {
    movable.style.transform = `translate(${mouseX -
      movable.offsetLeft -
      228 -
      elOffsetX}px, ${mouseY - movable.offsetTop - elOffsetY}px)`;
  }
}

function trackTouch(e) {
  mouseX = e.touches[0].pageX;
  mouseY = e.touches[0].pageY;
  console.log(mouseDown, mouseX, mouseY);
  if (mouseDown) {
    movable.style.transform = `translate(${mouseX -
      movable.offsetLeft -
      228 -
      elOffsetX}px, ${mouseY - movable.offsetTop - elOffsetY}px)`;
  }
}

movable.addEventListener("mouseup", () => {
  mouseDown = false;
});

movable.addEventListener("touchend", () => {
  mouseDown = false;
});
