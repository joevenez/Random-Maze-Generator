//Array of blocks
let arr = [];
const width = 800;
const height = 800;
let bWidth;
let bHeight;
let numOfHoriz;
let numOfVert;

//Initial startup function
function setup(){
    createCanvas(width + 1, height + 1);
    start();
}

//Start function
function start(){
    numOfHoriz = 10;
    numOfVert = 10;
    bWidth = Math.floor(width / numOfHoriz);
    bHeight = Math.floor(height / numOfVert);
    init2DArray(arr, numOfHoriz, numOfVert);
}


//Function to draw to screen
function draw(){
    background(175);
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            drawBlock(i,j,arr[i][j]);
        }
    }
}

//Create Array to represent maze grid
function init2DArray(arr, w, h){
    for(let i = 0; i < w; i++){
        arr.push([])
        for(let j = 0; j < h; j++){
            arr[i].push(new Cell(j,i));
        }
    }
}

//Drawing the lines for the square 
function drawBlock(i , j, block){
    //Top line
    if(block.top){
       line(i * bWidth, j * bHeight, i * bWidth + bWidth , j * bHeight);
    }
    //Bottom line
    if(block.bot){
        line(i * bWidth, j * bHeight + bHeight, i * bWidth + bWidth, j * bHeight + bHeight);
    }
    //Left line
    if(block.left){
        line(i * bWidth, j * bHeight, i * bWidth, j * bHeight + bHeight);
    }
    //Right line
    if(block.right){
        line(i * bWidth + bWidth, j * bHeight, i * bWidth + bWidth, j * bHeight + bHeight);
    }
    
}

//Cell constructor
function Cell(x,y){
    this.x = x;
    this.y = y;
    this.visited = false;
    this.left = true;
    this.right = true;
    this.top = true;
    this.bot = true;
}