"use strict";

class DrawingBoard {
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
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    this.canvas.addEventListener("mousedown", downEvent);
    this.canvas.addEventListener("mouseup", upEvent);
    this.canvas.addEventListener("mousemove", moveEvent);

    this.canvas.addEventListener("touchstart", touchStartEvent);
    this.canvas.addEventListener("touchend", upEvent);
    this.canvas.addEventListener("touchmove", touchMoveEvent);

    function downEvent(e) {
      if (mouseDown) return;
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
      context.lineTo(e.clientX, e.clientY);
      this.mousedown = true;
    }

    function touchStartEvent(e) {
      if (mouseDown) return;
      context.beginPath();
      context.moveTo(e.touches[0].clientX, e.touches[0].clientY);
      context.lineTo(e.touches[0].clientX, e.touches[0].clientY);
      this.mousedown = true;
    }

    function upEvent(e) {
      this.mousedown = false;

      context.stroke();
      context.closePath();
    }

    function moveEvent(e) {
      if (mouseDown) return;
      if (this.mousedown) {
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
      }
    }

    function touchMoveEvent(e) {
      if (mouseDown) return;
      if (this.mousedown) {
        context.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        context.stroke();
      }
    }
  }
}

const DB = new DrawingBoard();
