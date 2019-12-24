function compass(x,y,dx,dy){
	
	return null;
}

Serpent.prototype.smell = function(food_x,food_y){
	
}

Serpent.prototype.isSafe = function(){
	if(x<0||x>n-1||y<0||y>n-1)
		return false;
	if(soln[x+n*y])
		return false;
	return !m[x][y];
}

Serpent.prototype.pathfinder = function(maze,dim,x,y,tx,ty,sol=[]){
	if(x==tx && y ==ty){
		//sol[x+n*y] = 1;
		sol.push({ x:x , y:y });
		return sol;
	}
	if( isSafe(m,n,x,y) ){
		//sol[x+n*y] = 1;
		sol.push({ x:x , y:y });
		
		if( (soln = self.pathfinder(m,n,x+1,y,tx,ty,sol)) instanceof Array )
			return soln;
		if( (soln = self.pathfinder(m,n,x,y+1,tx,ty,sol)) instanceof Array )
			return soln;
		if( (soln = self.pathfinder(m,n,x-1,y,tx,ty,sol)) instanceof Array )
			return soln;
		if( (soln = self.pathfinder(m,n,x,y-1,tx,ty,sol)) instanceof Array )
			return soln;
		
		//sol[x+n*y] = 0;
		sol.pop();
		
		return null;
	}
	return null;
	
}

function solveMaze(m,n,x,y,tx,ty,sol){
	if(x==tx && y ==ty){
		sol[x+n*y] = 1;
		return true;
	}
	if( isSafe(m,n,x,y) ){
		sol[x+n*y] = 1;
		
		if( solveMaze(m,n,x+1,y,tx,ty,sol) )
			return true;
		if( solveMaze(m,n,x,y+1,tx,ty,sol) )
			return true;
		if( solveMaze(m,n,x-1,y,tx,ty,sol) )
			return true;
		if( solveMaze(m,n,x,y-1,tx,ty,sol) )
			return true;
		
		sol[x+n*y] = 0;
	
		return false;
	}
	return false;
}

function isSafe(m,n,x,y){
	if(x<0||x>n-1||y<0||y>n-1)
		return false;
	if(soln[x+n*y])
		return false;
	return !m[x][y];
}