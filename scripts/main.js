
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
						
	
	
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.arc( boa.body[0].x*w + w*0.5, boa.body[0].y*w + w*0.5 , w*0.5 , 0 , Math.PI*2 ,true );
	ctx.fill();
	ctx.closePath();
	
	
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(boa.body[0].x * w + w*0.5 ,boa.body[0].y * w + w*0.5 );
	
	for(var i=1;i<boa.body.length;++i){
							
		var abs_x = Math.abs(boa.body[i-1].x - boa.body[i].x);
		var abs_y = Math.abs(boa.body[i-1].y - boa.body[i].y);
		
		
		
		
		
		if(
			(abs_x==1||abs_x==0)
				&&
			(abs_y==1||abs_y==0)
		){
			ctx.lineTo( boa.body[i].x*w + w*0.5 , boa.body[i].y*w + w*0.5 );
			ctx.lineCap = "round";
			ctx.lineJoin = "round";//"bevel|round|miter";
			ctx.lineWidth = w - 2;
		}else{
			ctx.stroke();
			ctx.closePath();	
			ctx.beginPath();
			ctx.moveTo( boa.body[i].x*w + w*0.5 ,boa.body[i].y * w + w*0.5 );
			ctx.lineTo( boa.body[i].x*w + w*0.5 ,boa.body[i].y*w + w*0.5 );
			ctx.lineCap = "round";
			ctx.lineJoin = "round";//"bevel|round|miter";
			ctx.lineWidth = w - 2;
		}
		//ctx.fillRect( boa.body[i].x*w , boa.body[i].y*w , w-2 , w-2 );
		//if(trail[i].x==px && trail[i].y==py){tail=1;}
	}
	//ctx.fill();
	ctx.stroke();
	ctx.closePath();
						
	for(var i=1;i<boa.body.length;++i){
		ctx.beginPath();
		ctx.fillStyle = 'yellow';
		ctx.arc( boa.body[i].x*w + w*0.5, boa.body[i].y*w + w*0.5 , 1 , 0 , Math.PI*2 ,true );
		ctx.fill();
		ctx.closePath();
	}

	
	ctx.save();					
	ctx.translate(boa.body[0].x*w + w*0.5, boa.body[0].y*w + w*0.5 );
	switch(boa.dirChar){
		case '^':
			ctx.rotate(0);
			break;
		case '>':
			ctx.rotate(Math.PI/2);
			break;
		case 'v':
			ctx.rotate(Math.PI);
			break;
		case '<':
			ctx.rotate(-Math.PI/2);
			break;
	}	
						
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,-10);
	ctx.strokeStyle = 'red';
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.closePath();
						
	/*				
	ctx.beginPath();
	ctx.arc(-3,-5,2,0,Math.PI*2,true);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.closePath();
						
	ctx.beginPath();
	ctx.arc( 3,-5,2,0,Math.PI*2,true);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.closePath();
	*/					
	ctx.restore();
	
	
						
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