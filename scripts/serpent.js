
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
	
} 