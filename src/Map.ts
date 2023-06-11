import Square from "./Square";
export default class GameMap{
    squares:Square[]= [];
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    constructor(){
      this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
      this.canvas.width =  window.innerWidth-window.innerWidth%16;
    this.canvas.height = window.innerHeight-window.innerHeight%16;
      this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        for(let i = 0; i < this.canvas.height/16; i++){
            for(let j = 0; j < this.canvas.width/16; j++){
                this.squares.push(new Square(j*16,i*16))
            }
        }
  
        this.drawLines();
    }
    drawLines():void{
      this.ctx.strokeStyle = 'rgb(127,127,127)'
      for(let i = 0; i < this.canvas.width; i+=16){
          this.ctx.beginPath();
          this.ctx.moveTo(i,0);
          this.ctx.lineTo(i,this.canvas.height);
          this.ctx.stroke();
      }
      for(let i = 0; i < this.canvas.height; i+=16){
          this.ctx.beginPath();
          this.ctx.moveTo(0,i);
          this.ctx.lineTo(this.canvas.width,i);
          this.ctx.stroke();
      }
    }
    render():void{
        this.squares.forEach(square => square.draw(this.ctx));
        this.drawLines();
    }
    drawMultiple(squareIDs:number[]):void{
        squareIDs.forEach(id => this.squares[id].draw(this.ctx));
        this.drawLines();
    }
    eraseMultiple(squareIDs:number[]):void{
        squareIDs.forEach(id => this.squares[id].erase(this.ctx));
        this.drawLines();
    }
    switchMultiple(squareIDs:number[]):void{
        squareIDs.forEach(id => {
            if(this.squares[id].filled){
                this.squares[id].erase(this.ctx);
                this.squares[id].filled = false;
            }else{
                this.squares[id].draw(this.ctx);
                this.squares[id].filled = true;
            }
        });
        this.drawLines();
    }
    conwayStep():void{
      const newSquareIDs:number[] = [];
        for(let i = 0; i < this.squares.length; i++){
            const square = this.squares[i];
            const neighbors = this.getNeighbors(square);
            const filledNeighbors = neighbors.filter(neighbor => neighbor.filled);
            if(square.filled){
                if(filledNeighbors.length === 2 || filledNeighbors.length === 3){
                    //live on
                }
                else{
                    //die
                    //square.erase(this.ctx);
                    newSquareIDs.push(i);
                }
            }else{
                if(filledNeighbors.length === 3){
                    //live
                    //square.draw(this.ctx);
                    newSquareIDs.push(i);
                }
                else{
                    //die
                }
            }
        }
        this.switchMultiple(newSquareIDs);  
        this.drawLines();
    }
    
    getNeighbors(square:Square):Square[]{
        const neighbors:Square[] = [];
        const x = square.x;
        const y = square.y;
        const width = this.canvas.width;
        const height = this.canvas.height;
        if(x > 0){
            neighbors.push(this.squares[this.getSquareID(x-16,y)]);
        }
        if(x < width-16){
            neighbors.push(this.squares[this.getSquareID(x+16,y)]);
        }
        if(y > 0){
            neighbors.push(this.squares[this.getSquareID(x,y-16)]);
        }
        if(y < height-16){
            neighbors.push(this.squares[this.getSquareID(x,y+16)]);
        }
        if(x > 0 && y > 0){
            neighbors.push(this.squares[this.getSquareID(x-16,y-16)]);
        }
        if(x > 0 && y < height-16){
            neighbors.push(this.squares[this.getSquareID(x-16,y+16)]);
        }
        if(x < width-16 && y > 0){
            neighbors.push(this.squares[this.getSquareID(x+16,y-16)]);
        }
        if(x < width-16 && y < height-16){
            neighbors.push(this.squares[this.getSquareID(x+16,y+16)]);
        }
        return neighbors;
    }
    getSquareID(x:number,y:number):number{
        return (y/16)*(this.canvas.width/16)+(x/16);
    }
    randomizeMap():void{
          this.squares.forEach(square => {
              if(Math.random() > .5){
                  square.draw(this.ctx);
                  square.filled = true;
              }else{
                  square.erase(this.ctx);
                  square.filled = false;
              }
          });
          this.drawLines();
      }
    clearMap():void{
          this.squares.forEach(square => {
              square.erase(this.ctx);
              square.filled = false;
          });
          this.drawLines();
      }
  
}