//Array of blocks
let arr = [];
const width = 800;
const height = 800;
let bWidth;
let bHeight;
let numOfHoriz;
let numOfVert;
let stack = [];
let complete = false;

//Initial startup function
function setup(){
    createCanvas(width + 1, height + 1);
    start();
}

//Start function
function start(){
    numOfHoriz = 40;
    numOfVert = 40;
    bWidth = Math.floor(width / numOfHoriz);
    bHeight = Math.floor(height / numOfVert);
    init2DArray(arr, numOfHoriz, numOfVert);
    //Initialize cursor
    cursor = new Cursor(0,0);
    stack.push(cursor);
    arr[0][0].visited = true;
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
    if(!complete){
        //Draw cursor block
        fill(255,255,0);
        rect(cursor.x * bWidth + 1, cursor.y * bHeight + 1, bWidth - 1, bHeight - 1);
        generate(cursor.x, cursor.y);
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