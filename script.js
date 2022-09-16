const grid = document.querySelector('.grid');

function add_block(){
    const block = document.createElement('div');
    block.classList.add('block')
    block.style.left = "100px";
    block.style.bottom = "50px";
    grid.appendChild(block);
}
 add_block();
