//Array of blocks
let arr = [];
//Canvas dimensions
const width = 800;
const height = 800;
//Width of blocks
let bWidth;
//Height of blocks
let bHeight;
//Number of blocks horizontally
let numOfHoriz;
//Number of blocks vertically
let numOfVert;
//Stack for backtracking
let stack = [];
//Maze generation completed
let complete = false;
//Maze generation stated
let started = false;
//Speed of cursor
let speed;
//Dimensions of grid
let list;

//Initial startup function
function setup(){
    //Create canvas
    createCanvas(width + 1, height + 1);
    //UI Elements
    createUI();
    //Start function
}

//Make UI Elements
function createUI(){
    //Create speed slider 
    slider = createDiv('Speed ');
    speed = createSlider(1,20,10);
    speed.parent(slider);
    //Created Dimensions 
    dropdown = createDiv('Dimensions ');
    list = createSelect();
    list.option('10x10', 10);
    list.option('20x20', 20);
    list.option('40x40', 40);
    list.parent(dropdown);

    //Create Start button 
    button = createButton('Start');
    button.mousePressed(start);
    button.position(810 - button.width, 820);
}

//Start function
function start(){
    stack = [];
    arr = [];
    
    numOfHoriz = list.value();
    numOfVert = numOfHoriz;
    bWidth = Math.floor(width / numOfHoriz);
    bHeight = Math.floor(height / numOfVert);
    init2DArray(arr, numOfHoriz, numOfVert);
    //Initialize cursor
    cursor = new Cursor(0,0);
    stack.push(cursor);
    arr[0][0].visited = true;
    complete = false;
    started = true;
}


//Function to draw to screen
function draw(){
    background(175);
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            drawBlock(i,j,arr[i][j]);
        }
    }
    //Cursor functionality
    if(!complete && started){
        //Draw cursor block
        fill(255,255,0);
        rect(cursor.x * bWidth + 1, cursor.y * bHeight + 1, bWidth - 1, bHeight - 1);
        //Updated based on user speed
        if(frameCount % speed.value() == 0){
            generate(cursor.x, cursor.y);
        }
        
    }
    
}

//Create Array to represent maze grid
function init2DArray(arr, w, h){
    for(let i = 0; i < w; i++){
        arr.push([]);
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

function generate(curX, curY){
    temp = [];
    //Bounds check 
    //Above
    if(curY - 1 >= 0){
        temp.push([curX, curY - 1]);
    }
    //below
    if(curY + 1 < arr[0].length){
        temp.push([curX, curY + 1]);
    }
    //left
    if(curX - 1 >= 0){
        temp.push([curX - 1, curY]);
    }
    //right
    if(curX + 1 < arr.length){
        temp.push([curX + 1, curY]);
    }
    //visited check
    for(let i = temp.length - 1; i >= 0; i--){
        if(arr[temp[i][0]][temp[i][1]].visited){
            temp.splice(i,1);
        }
    }
    //pop if all neighbours visited 
    if(temp.length < 1){
        //move back to last position
        stack.pop();
        cursor = stack[stack.length - 1];
        // cursor.x = stack[stack.length -1][0];
        // cursor.y = stack[stack.length -1][1];
        if(stack.length < 1){
            complete = true;
            started = false;
        }
        return 0;
    }else{
        //update cursor to new position
        let ind = Math.floor(Math.random() * temp.length);
        cursor = new Cursor(temp[ind][0], temp[ind][1]);
        stack.push(cursor);
        arr[cursor.x][cursor.y].visited = true; 

        //remove barriers
        if(curX - cursor.x == 0){
            //if y updated
            if(curY < cursor.y){
                arr[curX][curY].bot = false;
                arr[cursor.x][cursor.y].top = false;
            }else{
                arr[curX][curY].top = false;
                arr[cursor.x][cursor.y].bot = false;
            }
        }
        
        if(curY - cursor.y == 0){
            //if x updated
            if(curX < cursor.x){
                arr[curX][curY].right = false;
                arr[cursor.x][cursor.y].left = false;
            }else{
                arr[curX][curY].left = false;
                arr[cursor.x][cursor.y].right = false;
            }
        }
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

//Cursor
function Cursor(x,y){
    this.x = x;
    this.y = y;
}