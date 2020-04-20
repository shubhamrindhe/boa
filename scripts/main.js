
function arr2d(r,c,d=0){
	var _ = [] 
	for(var i=0;i<r;++i){
		_[i] = [];
		for(var j=0;j<c;++j){
			_[i].push(d);
		}
	}
	return _;
}	
function arr2str(arr){
	var _ = "//";
	for(var i=0;i<arr.length;++i)
		_ += '=-';
	_+='\n';	
	for(var i=0;i<arr.length;++i){
		//_+= (i==0?'[':' ');
		//for(var j=0;j<arr[i].length;++j){
		//_+= (i==0?'[[':' [')+arr[i].toString()+(i==arr.length-1?']]':'] \n');
		_+= (i==0?'[[':' [')+arr[i].join(' ')+(i==arr.length-1?']]':'] \n');
		//}
		//_+= (i==arr.length-1?']':' ');
	}
	_+='\n//';
	for(var i=0;i<arr.length;++i)
		_ += '=-';

	return _;
}




var canvas,ctx;
const dim = 20;
var W,w,H,h;
var ax=15,ay=15;

var FPS =15;
var boa = new Serpent();

var g = {
	x : undefined,
	y : undefined,
	z : undefined
}

if(window.DeviceMotionEvent){
	window.ondevicemotion = function(e){
		g.x = -e.accelerationIncludingGravity.x;
		g.y = e.accelerationIncludingGravity.y;
		g.z = e.accelerationIncludingGravity.z;
		
		const _ = 2;
		if ( g.x > _ ) {
			boa.charm('>');
			document.getElementById('4') = '>';
		} else if ( g.x < -_ ) {
			boa.charm('<');
			document.getElementById('4') = '<';
		} else if ( g.y > _ ) {
			boa.charm('v');
			document.getElementById('4') = 'v';
		} else if ( g.y < -_ ) {
			boa.charm('^');
			document.getElementById('4') = '^';
		}
		
		document.getElementById('msg') = JSON.stringify(g);
	};
	alert("Accelerometer Enabled!");
}else{
	alert("YOU GOTTA HAVE Accelerometer TO RUN THIS CODE!");
}

window.onload = function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	
	if (Math.min(innerWidth,innerHeight) > 400) {
		W = 400;
		H = 400;
	} else {
		W = H = Math.min(innerWidth,innerHeight) - 6;
		canvas.height = H;
		canvas.width = W;
	}
	
	w = h = W/dim;
	
	
	document.addEventListener('keydown',control);
	var timer = setInterval(game,1000/FPS);
};
				
function game(){
	
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.fillStyle = 'lightgreen';
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

	var toggle = true;
	for(var i=0;i<dim;++i){
		if((20%2)!=1){
			toggle = !toggle;
		}
		for(var j=0;j<dim;++j){
			
			toggle = !toggle;
			
			//ctx.fillStyle = ( toggle ? "white" : "black" );
			ctx.fillStyle = ( toggle ? "rgba(0,255,0,1)" : "rgba(0,225,0,1)" );
			//ctx.strokeStyle = "black";
			ctx.fillRect(w*i,h*j,w,h);
		}
	}
	







	boa.update();
						
	if(ax==boa.pos.x && ay==boa.pos.y){
		boa.len++;
		ax=Math.floor(Math.random()*h);
		ay=Math.floor(Math.random()*h);
	}
						
	
	
	boa.render(ctx);
	
	
						
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.arc( ax*w + w*0.5, ay*w + w*0.5 , w * 0.4 , 0 ,Math.PI*2 ,true );
	ctx.fill();
	ctx.closePath();					
}

function control(evt){
	if(evt.key==' '){
		boa.dir.x = 0;
		boa.dir.y = 0;
	}
	switch (evt.keyCode) {
		case 37 :
			xv=-1;
			yv=0;
			boa.charm('<');
			//console.log(boa.dir);
			break;
		case 38 :
			xv=0;
			yv=-1;
			boa.charm('^');
			//console.log(boa.dir);
			break;
		case 39 :
			xv=1;
			yv=0;
			boa.charm('>');
			//console.log(boa.dir);
			break;
		case 40 :
			xv=0;
			yv=1;
			boa.charm('v');
			//console.log(boa.dir);
			break;
		default:
	}
}

function up(){ boa.charm('^'); }
function left(){ boa.charm('<'); }
function right(){ boa.charm('>'); }
function down(){ boa.charm('v'); }