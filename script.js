"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Effects_instances, _Effects_start;
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
        _Effects_instances.add(this);
        this.columns = this.canvasWidth / fontsize;
        this.symbols = [];
        __classPrivateFieldGet(this, _Effects_instances, "m", _Effects_start).call(this);
    }
}
_Effects_instances = new WeakSet(), _Effects_start = function _Effects_start() {
    for (let i = 0; i < this.columns; i++) {
        this.symbols[i] = new Characters(i, 0, this.canvasHeight);
    }
};
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
