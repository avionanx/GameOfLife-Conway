import './style.css'


import GameMap from './Map';

const map = new GameMap();
//map.squares.forEach(square => square.draw(map.ctx));
const controller = document.getElementById('controller') as HTMLDivElement;
map.canvas.addEventListener('click',function(e){
    console.log(e.offsetX,e.offsetY);
    const x = e.offsetX;
    const y = e.offsetY;
    const squareID = Math.floor(x/16) + Math.floor(y/16)*map.canvas.width/16;
    map.switchMultiple([squareID]);
});
map.randomizeMap();
controller.addEventListener('mouseover',function(){
    controller.style.opacity = '1';
})
controller.addEventListener('mouseout',function(){
    controller.style.opacity = '.5';
})
const startButton = document.getElementById('button') as HTMLButtonElement;
startButton.addEventListener('click',function(){
  map.conwayStep();
});
let paused = true;
let ms = 1000
const pauseButton = document.getElementById('pause') as HTMLButtonElement;
let stepInterval = setInterval(function(){
    if(paused) return;
    map.conwayStep();
},ms);
function pause(){
    paused = !paused;
    if(paused){
        pauseButton.textContent = 'Resume';
    }else{
        pauseButton.textContent = 'Pause';
    }
}
function resetMap(){
    map.clearMap();
}

function speedUp(){
    ms-=250;
    if(ms < 250) ms = 250;
    speedText.textContent = (ms/1000).toString();
    clearInterval(stepInterval);
    stepInterval = setInterval(function(){
        if(paused) return;
        map.conwayStep();
    },ms);
}
function speedDown(){
    ms+=250;
    if(ms > 2000) ms = 2000;
    speedText.textContent = (ms/1000).toString();
    clearInterval(stepInterval);
    stepInterval = setInterval(function(){
        if(paused) return;
        map.conwayStep();
    },ms);
}
pauseButton.addEventListener('click',pause);
const speedText = document.getElementById('speedtext') as HTMLSpanElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
resetButton.addEventListener('click',resetMap);
const speedUpButton = document.getElementById('speedUp') as HTMLButtonElement;
speedUpButton.addEventListener('click',speedUp);
const speedDownButton = document.getElementById('speedDown') as HTMLButtonElement;
speedDownButton.addEventListener('click',speedDown);