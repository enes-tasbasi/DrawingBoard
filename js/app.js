"use strict";

class Context {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = window.innerWidth - 4;
    this.canvas.height = window.innerHeight - 4;
    window.addEventListener("resize", function(e) {
      this.canvas.width = window.innerWidth - 4;
      this.canvas.height = window.innerHeight - 4;
    });

    this.lineWidthSlider = document.querySelector("#linewidth");
    this.colorPicker = document.querySelector("#colorpicker");
    this.clearButton = document.querySelector("#clearbutton");

    this.mousedown = false;
    this.ctx = this.canvas.getContext("2d");
    let context = this.ctx;
    context.lineCap = "round";

    this.lineWidthSlider.oninput = e => {
      context.lineWidth = e.target.value;
    };

    this.colorPicker.oninput = e => {
      context.strokeStyle = e.target.value;
    };

    this.clearButton.onclick = () => {
      context.clearRect(0, 0, window.innerHeight, window.innerWidth);
    };

    window.addEventListener("mousedown", function(e) {
      if (mouseDown) return;
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
      context.lineTo(e.clientX, e.clientY);
      this.mousedown = true;
    });

    window.addEventListener("mouseup", function(e) {
      this.mousedown = false;

      context.stroke();
      context.closePath();
    });

    window.addEventListener("mousemove", function(e) {
      if (mouseDown) return;
      if (this.mousedown) {
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
      }
    });
  }
}

const DB = new Context();

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

moveButton.addEventListener("mousedown", trackMouseInEl);

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

function trackMouseInEl(event) {
  console.log(event);
  elOffsetX = event.offsetX;
  elOffsetY = event.offsetY;
  console.log(elOffsetX, elOffsetY);
}

function trackMouse(event) {
  mouseX = event.pageX;
  mouseY = event.pageY;

  if (mouseDown) {
    movable.style.transform = `translate(${mouseX -
      movable.offsetLeft -
      228 -
      elOffsetX}px, ${mouseY - movable.offsetTop - elOffsetY}px)`;
  }
}

moveButton.addEventListener("mousedown", () => {
  mouseDown = true;
});

movable.addEventListener("mouseup", () => {
  mouseDown = false;
});
