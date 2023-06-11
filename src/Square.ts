export default class Square{
    x:number;
    y:number;
    filled:boolean = false;
    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
    draw(ctx:CanvasRenderingContext2D){
        ctx.fillStyle = 'rgb(192,113,48)'
        ctx.fillRect(this.x,this.y,16,16);
        this.filled = true;
    }
    erase(ctx:CanvasRenderingContext2D){
       // ctx.fillStyle = 'rgb(25,38,49)'
        //ctx.fillRect(this.x,this.y,16,16);
        ctx.clearRect(this.x,this.y,16,16);
        this.filled = false;
    }
}