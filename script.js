const grid = document.querySelector('.grid');
const block_width = 100;
const block_height = 20;
const board_width = 560;
let timer_id;
const ball_diameter = 20;
let x_direction = 2;
let y_direction = 2;

// create 15 blocks
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + block_width, yAxis];
        this.topLeft = [xAxis + block_width, yAxis + block_height];
        this.topRight = [xAxis, yAxis + block_height];
    }
}
// min xAxis, yAxis: (0,0) 
// max xAxis, yAxis: (460,280) 
// grid size:  width: 560; height: 300;  
// block size: width: 100; height: 20; 

const all_blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]
console.log(all_blocks[0])
console.log(all_blocks[1])

// draw block
function add_block() {
    for (let i = 0; i < all_blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block')
        block.style.left = all_blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = all_blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
add_block();


// user position
const user_start = [230, 10];
const current_position = user_start;

// draw the user
function draw_user() {
    user.style.left = current_position[0] + 'px';
    user.style.bottom = current_position[1] + 'px';
}

//add user
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
draw_user();


// move user                            
function move_user(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (current_position[0] > 0) {
                current_position[0] -= 10;
                draw_user()
            }
            break;
        case 'ArrowRight':
            if (current_position[0] < board_width - block_width) {
                current_position[0] += 10;
                draw_user()
            }
            break;
    }
}

addEventListener('keydown', move_user)

// ball position
const ball_start = [265, 40];
const ball_current_position = ball_start;

// draw ball
function draw_ball(){
    ball.style.left = ball_current_position[0] + 'px';
    ball.style.bottom = ball_current_position[1] + 'px';
}
// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
draw_ball()

// move ball
function move_ball(){
    ball_current_position[0] += x_direction; //2
    ball_current_position[1] += y_direction; //2
    draw_ball()
    check_collisions()
}
timer_id = setInterval(move_ball,30)

// check for collisions
function check_collisions(){
    if (ball_current_position[0] >= (board_width - ball_diameter)){
        change_direction()
    }
}

function change_direction(){
    if(x_direction === 2 && y_direction === 2 ){
        y_direction = -2;
        return;
    }
}






