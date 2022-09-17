const grid = document.querySelector('.grid');
const block_width = 100;
const block_height = 20;
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
