"use strict";
const canvas = document.querySelector('#canvas');
const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#000';
let fontsize = 20;
class Characters {
    constructor(x, y, canvasHeight) {
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.characters = '01234567890@#$%^&*(){}*/+-<>';
        this.text = '';
    }
    draw(ctx) {
        let random = Math.floor(Math.random() * this.characters.length);
        this.text = this.characters.charAt(random);
        //styling canvas 
        ctx.fillStyle = 'limegreen';
        ctx.fillText(this.text, this.x * fontsize, this.y * fontsize);
        //condtion if the y axis is > canvas height
        if (this.y * fontsize > this.canvasHeight && Math.random() > 0.9) {
            this.y = 0;
        }
        else {
            this.y += 1;
        }
    }
}
class Effects {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.columns = this.canvasWidth / fontsize;
        this.symbols = [];
        this.start();
    }
    // here '#' means private
    start() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Characters(i, 0, this.canvasHeight);
        }
    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / fontsize;
        this.symbols = [];
        this.start();
    }
}
const eff = new Effects(canvas.width, canvas.height);
const fps = 30;
function animateLoop() {
    //for transparent effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontsize + 'px monospace';
    eff.symbols.forEach(symbol => symbol.draw(ctx));
    //requestAnimationFrame(animateLoop)
}
animateLoop();
setInterval(animateLoop, 1000 / fps);
window.addEventListener('resize', _ => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    eff.resize(canvas.width, canvas.height);
});
