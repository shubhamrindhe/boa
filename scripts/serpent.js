
class Serpent{
	constructor(){
		this.body = [];
		this.len = 3;
		this.dir = {
			x : 0,
			y : 0
		};
		this.dirChar = '';
		this.pos = {
			x : 10,
			y : 10
		};
	}
	
	update(){
		var tc = 20;
		
		this.pos.x += this.dir.x;
		this.pos.y += this.dir.y;
		
		if(this.pos.x<0){
			this.pos.x=tc-1;
		}
		if(this.pos.x>tc-1){
			this.pos.x=0;
		}
		if(this.pos.y<0){
			this.pos.y = tc-1;
		}
		if(this.pos.y>tc-1){
			this.pos.y = 0;
		}
		
		for(var i=0;i<this.body.length;++i){
			if(this.body[i].x==this.pos.x && this.body[i].y==this.pos.y){this.len=3;}
		}
		
		//this.body.push({ x:this.pos.x , y:this.pos.y });
		this.body.unshift({ x:this.pos.x , y:this.pos.y });
		
		while(this.body.length>this.len) {
			this.body.pop();
		}
		
	}
	
	
	seek(x,y){
	}
	
	charm(towards){
		switch(towards){
			case '^':
				if(this.dirChar!='v'){
					this.dir.x = 0;
					this.dir.y =-1;
					this.dirChar='^'
				}
				break;
			case '>':
				if(this.dirChar!='<'){
					this.dir.x = 1;
					this.dir.y = 0;
					this.dirChar='>';
				}
				break;
			case 'v':
				if(this.dirChar!='^'){
					this.dir.x = 0;
					this.dir.y = 1;
					this.dirChar='v';
				}
				break;
			case '<':
				if(this.dirChar!='>'){
					this.dir.x =-1;
					this.dir.y = 0;
					this.dirChar='<';
				}
				break;
			default:
			
		}
	}
	
	
	render(ctx){
		
		
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.arc( this.body[0].x*w + w*0.5, this.body[0].y*w + w*0.5 , w*0.5 , 0 , Math.PI*2 ,true );
		ctx.fill();
		ctx.closePath();
		
		
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(this.body[0].x * w + w*0.5 ,this.body[0].y * w + w*0.5 );
		
		for(var i=1;i<this.body.length;++i){
								
			var abs_x = Math.abs(this.body[i-1].x - this.body[i].x);
			var abs_y = Math.abs(this.body[i-1].y - this.body[i].y);
			
			
			
			
			
			if(
				(abs_x==1||abs_x==0)
					&&
				(abs_y==1||abs_y==0)
			){
				ctx.lineTo( this.body[i].x*w + w*0.5 , this.body[i].y*w + w*0.5 );
				ctx.lineCap = "round";
				ctx.lineJoin = "round";//"bevel|round|miter";
				ctx.lineWidth = w - 2;
			}else{
				ctx.stroke();
				ctx.closePath();	
				ctx.beginPath();
				ctx.moveTo( this.body[i].x*w + w*0.5 ,this.body[i].y * w + w*0.5 );
				ctx.lineTo( this.body[i].x*w + w*0.5 ,this.body[i].y*w + w*0.5 );
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
							
		for(var i=1;i<this.body.length;++i){
			ctx.beginPath();
			ctx.fillStyle = 'yellow';
			ctx.arc( this.body[i].x*w + w*0.5, this.body[i].y*w + w*0.5 , 1 , 0 , Math.PI*2 ,true );
			ctx.fill();
			ctx.closePath();
		}

		
		ctx.save();					
		ctx.translate(this.body[0].x*w + w*0.5, this.body[0].y*w + w*0.5 );
		switch(this.dirChar){
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
		
		
		
	}
	
} 