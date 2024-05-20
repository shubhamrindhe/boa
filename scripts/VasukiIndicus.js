import { Serpent } from "./serpent.js";

const template = document.createElement('template');
template.innerHTML = `
    <style>
    .centroid {
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
	}
    </style>
    <canvas id="canvas" width="400" height="400" class="centroid">Sorry your browser does not support HTML5</canvas>
<!--h1>Hello, World!</h1>
<h2><slot name="one"/></h2>
<h3><slot name="two"/></h3-->
`;

// var canvas, ctx;
const dim = 20;
var W, w, H, h;
var ax = 15, ay = 15;

var FPS = 15;
// var boa = new Serpent();

var g = {
	x: undefined,
	y: undefined,
	z: undefined
}


//
let xv = 0, yv = 1;
//

export default class VasukiIndicus extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.canvas = this.shadowRoot.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.boa = new Serpent();

        if (Math.min(innerWidth, innerHeight) > 400) {
            W = 400;
            H = 400;
        } else {
            W = H = Math.min(innerWidth, innerHeight) - 6;
            this.canvas.height = H;
            this.canvas.width = W;
        }

        w = h = W / dim;

        this.boa.w = w;

        const {boa, ctx} = this;

        document.addEventListener('keydown',(evt) => control({ evt, boa }));
        this.timer = setInterval(() => game({ ctx, boa }), 1000 / FPS);
    }

    disconnectedCallback() {
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    adoptedCallback() {
    }
}

window.customElements.define("vasuki-indicus", VasukiIndicus);





/*
window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    if (Math.min(innerWidth, innerHeight) > 400) {
        W = 400;
        H = 400;
    } else {
        W = H = Math.min(innerWidth, innerHeight) - 6;
        canvas.height = H;
        canvas.width = W;
    }

    w = h = W / dim;

    boa.w = w;


    document.addEventListener('keydown', control);
    var timer = setInterval(game, 1000 / FPS);
};
*/

function game({ ctx, boa }) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var toggle = true;
    for (var i = 0; i < dim; ++i) {
        if ((20 % 2) != 1) {
            toggle = !toggle;
        }
        for (var j = 0; j < dim; ++j) {

            toggle = !toggle;

            //ctx.fillStyle = ( toggle ? "white" : "black" );
            ctx.fillStyle = (toggle ? "rgba(0,255,0,1)" : "rgba(0,225,0,1)");
            //ctx.strokeStyle = "black";
            ctx.fillRect(w * i, h * j, w, h);
        }
    }

    boa.update();

    if (ax == boa.pos.x && ay == boa.pos.y) {
        boa.len++;
        ax = Math.floor(Math.random() * h);
        ay = Math.floor(Math.random() * h);
    }

    boa.render(ctx);

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(ax * w + w * 0.5, ay * w + w * 0.5, w * 0.4, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}

function control({ evt, boa }) {
    if (evt.key == ' ') {
        boa.dir.x = 0;
        boa.dir.y = 0;
    }
    switch (evt.keyCode) {
        case 37:
            xv = -1;
            yv = 0;
            boa.charm('<');
            //console.log(boa.dir);
            break;
        case 38:
            xv = 0;
            yv = -1;
            boa.charm('^');
            //console.log(boa.dir);
            break;
        case 39:
            xv = 1;
            yv = 0;
            boa.charm('>');
            //console.log(boa.dir);
            break;
        case 40:
            xv = 0;
            yv = 1;
            boa.charm('v');
            //console.log(boa.dir);
            break;
        default:
    }
}
