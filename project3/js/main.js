const cells = [];
const connections = [];


function setup() {
  createCanvas(600, 600);
  cells.push(new Cell('Pet'));
  cells.push(new Cell('Dog'));
  cells.push(new Cell('Cat'));
  cells.push(new Cell('Hamster'));
  cells.push(new Cell('Labrador'));
  cells.push(new Cell('Poodle'));
  cells.push(new Cell('Pug'));

  
  connections.push(new Connection(cells[0], cells[1]));
  connections.push(new Connection(cells[0], cells[2]));
  connections.push(new Connection(cells[0], cells[3]));

  connections.push(new Connection(cells[1], cells[4]));
  connections.push(new Connection(cells[1], cells[5]));
  connections.push(new Connection(cells[1], cells[6]));



}

function draw() {
  background(100);
  
  connections.forEach(conn => {
    if (conn.isInside(mouseX, mouseY)) conn.flags.hover = true;
    else conn.flags.hover = false;
    
    conn.render();
  })
  
  cells.forEach (cell => {
    if (cell.isInside(mouseX, mouseY)) cell.flags.hover = true;
    else cell.flags.hover = false;
    
    cell.render();
  });
}


let dx = 0;
let dy = 0;
let dragged_cell;

function mousePressed() {
  
  for (let i = 0; i < connections.length; i++) {
    conn = connections[i];
    if (conn.flags.hover) {
      connections.splice(i, 1);
      return;
    }
  }
  
  for (let i = 0; i < cells.length; i++) {
    cell = cells[i];
    if (cell.flags.hover) {
      cell.flags.dragging = true;
      dragged_cell = cell;
      break;
    }
  }
  
  if (!dragged_cell) return;
  dx = mouseX - dragged_cell.x;
  dy = mouseY - dragged_cell.y;
}

function mouseDragged() {
  if (!dragged_cell) return;
  
  dragged_cell.x = mouseX - dx;
  dragged_cell.y = mouseY - dy;
}

function mouseReleased() {
  if (!dragged_cell) return;
  
  dragged_cell.flags.dragging = false;
  dragged_cell = undefined;
}