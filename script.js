const grid = document.querySelector('.grid');
const score_display = document.querySelector('#score')
const block_width = 100;
const block_height = 20;
const board_width = 560;
const board_height = 300;
const ball_diameter = 20;
let x_direction = 2;
let y_direction = 2;
let score = 0;
let timer_id;

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
// console.log(all_blocks[0])
// console.log(all_blocks[1])

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

document.addEventListener('keydown', move_user)

// ball position
const ball_start = [265, 40];
const ball_current_position = ball_start;

// draw ball
function draw_ball() {
    ball.style.left = ball_current_position[0] + 'px';
    ball.style.bottom = ball_current_position[1] + 'px';
}
// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
draw_ball()

// move ball
function move_ball() {
    ball_current_position[0] += x_direction; //2
    ball_current_position[1] += y_direction; //2
    draw_ball()
    check_collisions()
}
timer_id = setInterval(move_ball, 15)



// check for collisions
function check_collisions() {

    // check for block collosion
    for (let i = 0; i < all_blocks.length; i++) {

        // check if ball is between blocks: in width and height
        if (
            // check width(x axis): if block is between bottom left and bottom right
            (ball_current_position[0] > all_blocks[i].bottomLeft[0] && ball_current_position[0] < all_blocks[i].bottomRight[0]) &&
            // check height(y axis): if block is between bottom left and top left
            ((ball_current_position[1] + ball_diameter) > all_blocks[i].bottomLeft[1] && ball_current_position[1] < all_blocks[i].topLeft[1])
        ) { // if condition is true then remove a block 
            const all_blocks_style = Array.from(document.querySelectorAll('.block'));
            all_blocks_style[i].classList.remove('block');
            all_blocks.splice(i, 1);
            // all_blocks[i].style.display='none'  //why this way does't work
            change_direction();
            score++;
            score_display.innerHTML = score;

            // check for win
            if(all_blocks.length == 0){
                score_display.innerHTML = 'YOU WIN 😍🎇';
                clearInterval(timer_id);
                document.removeEventListener('keydown', move_user)
                document.body.style.background = '#12a152';
            }
        }
    }

    // check for wall collosion
    if (ball_current_position[0] >= (board_width - ball_diameter) ||
        ball_current_position[1] >= (board_height - ball_diameter) ||
        ball_current_position[0] <= 0
    ) {
        change_direction()
    }
    // console.log(ball_current_position)

    // check for user collosion
    if (
        (ball_current_position[0] > current_position[0] && ball_current_position[0] < current_position[0] + block_width) &&
        (ball_current_position[1] > current_position[1] && ball_current_position[1] < current_position[1] + block_height)
    ) {
        change_direction()
    }

    // check for game over
    if (ball_current_position[1] <= 0) {
        clearInterval(timer_id);
        score_display.innerHTML = 'YOU LOSE 😢';
        document.removeEventListener('keydown', move_user);
        document.body.style.background = '#c53838'
        setTimeout(function(){
            window.location.reload();            
        }, 5000)
    }
}


function change_direction() {
    if (x_direction === 2 && y_direction === 2) {
        y_direction = -2;
        return;
    }
    if (x_direction === 2 && y_direction === -2) {
        x_direction = -2;
        return;
    }
    if (x_direction === -2 && y_direction === -2) {
        y_direction = 2;
        return;
    }
    if (x_direction === -2 && y_direction === 2) {
        x_direction = 2;
        return;
    }
}







