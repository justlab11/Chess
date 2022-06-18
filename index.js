var grid = document.getElementById("grid");
var popup = document.getElementById("popup");
var grid_vals = [
  ["Br","Bkn","Bb","Bq","Bki","Bb","Bkn","Br"],
  ["Bp","Bp","Bp","Bp","Bp","Bp","Bp","Bp"],
  ["be","be","be","be","be","be","be","be"],
  ["be","be","be","be","be","be","be","be"],
  ["be","be","be","be","be","be","be","be"],
  ["be","be","be","be","be","be","be","be"],
  ["Wp","Wp","Wp","Wp","Wp","Wp","Wp","Wp"],
  ["Wr","Wkn","Wb","Wq","Wki","Wb","Wkn","Wr"],
]
var default_grid = [
  ["Br","Bkn","Bb","Bq","Bki","Bb","Bkn","Br"],
  ["Bp","Bp","Bp","Bp","Bp","Bp","Bp","Bp"],
  ["be","be","be","be","be","be","be","be"],
  ["be","be","be","be","be","be","be","be"],
  ["be","be","be","be","be","be","be","be"],
  ["be","be","be","be","be","be","be","be"],
  ["Wp","Wp","Wp","Wp","Wp","Wp","Wp","Wp"],
  ["Wr","Wkn","Wb","Wq","Wki","Wb","Wkn","Wr"],
]
const default_colors = [
  "l","d","l","d","l","d","l","d",
  "d","l","d","l","d","l","d","l",
  "l","d","l","d","l","d","l","d",
  "d","l","d","l","d","l","d","l",
  "l","d","l","d","l","d","l","d",
  "d","l","d","l","d","l","d","l",
  "l","d","l","d","l","d","l","d",
  "d","l","d","l","d","l","d","l",
]
var grid_colors = [
  "l","d","l","d","l","d","l","d",
  "d","l","d","l","d","l","d","l",
  "l","d","l","d","l","d","l","d",
  "d","l","d","l","d","l","d","l",
  "l","d","l","d","l","d","l","d",
  "d","l","d","l","d","l","d","l",
  "l","d","l","d","l","d","l","d",
  "d","l","d","l","d","l","d","l",
]
var colors = {
  "l" : "#EBD9B9",
  "d" : "#6C3924",
  "a" : "#aaddff",
  "v" : "#11D531",
}
var move = 1;
var possible_moves = [];
var pieces = {
  "Bp" : [[1,0]],
  "Wp" : [[-1,0]],
  "p" : [[-1,0]],
  "r" : [[1,0],[-1,0],[0,1],[0,-1]],
  "b" : [[1,1],[-1,1],[1,-1],[-1,-1]],
  "kn" : [[2,1],[1,2],[-2,-1],[-1,-2],[-2,1],[-1,2],[2,-1],[1,-2]],
  "q" : [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]],
  "ki" : [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]],
}
var piece_name = {
  "p" : "Pawn",
  "r" : "Rook",
  "b" : "Bishop",
  "kn" : "Knight",
  "q" : "Queen",
  "ki" : "King",
  "e" : "",
}

var piece_images = {
  "Bp"  : "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png",
  "Wp"  : "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png",
  "Br"  : "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
  "Wr"  : "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
  "Bb"  : "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
  "Wb"  : "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
  "Bkn" : "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
  "Wkn" : "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
  "Bq"  : "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png",
  "Wq"  : "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
  "Bki" : "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png",
  "Wki" : "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png",
  "be"  : "",
}

makeBoard(default_colors);

function makeBoard(color_array) {
  document.getElementById("Chess_Background").innerHTML = (move%2) ? "White's Turn" : "Black's Turn";
  for (let i=0; i<64; i++) {
    let row = Math.floor(i/8);
    let col = i%8;
    const button = document.createElement("button");
    button.className = "grid-item";
    button.style.background = colors[color_array[i]];
    let text = piece_name[grid_vals[row][col].slice(1)];
    let color = (grid_vals[row][col][0] == "W") ? "#FFF" : "#000";
    button.id = i.toString();
    button.onclick = function() {
      let id = parseInt(button.id);
      let row = Math.floor(id/8);
      let col = id%8;
      if ((move%2 && grid_vals[row][col][0] === "B") || (!(move%2) && grid_vals[row][col][0] === "W") || grid_vals[row][col][0] === "b") {
        if (button.style.background == "rgb(17, 213, 49)") {
          let selected = grid_colors.findIndex(ele => ele == "a");
          let orig_row = Math.floor(selected/8);
          let orig_col = selected%8;
          if (grid_vals[orig_row][orig_col][0] != grid_vals[row][col][0] && grid_vals[row][col][0] != "b") {
            grid_vals[row][col] = grid_vals[orig_row][orig_col];
            grid_vals[orig_row][orig_col] = "be";
          } else {
            let tmp = grid_vals[orig_row][orig_col];
            grid_vals[orig_row][orig_col] = grid_vals[row][col];
            grid_vals[row][col] = tmp;
          }
          grid_colors = default_colors.map((x) => x);

          move += 1;
          rotateBoard(grid_vals);
          rotateBoard(default_grid);
          eviscerateChildren(grid);
          makeBoard(grid_colors);
        }
        return "Kinshasa";
      }
      if (grid_colors.some(element => element == "a")) {
        eviscerateChildren(grid);
        grid_colors = default_colors.map((x) => x);
        grid_colors[id] = "a";
        getValidPositions(id)
        makeBoard(grid_colors);
      } else {
        eviscerateChildren(grid);
        getValidPositions(id);
        grid_colors[id] = "a";
        makeBoard(grid_colors);
      }
    }
    const img = document.createElement("img");

    img.src=piece_images[grid_vals[row][col]];
    button.appendChild(img);
    button.style.color = color;
    grid.appendChild(button);
  }
}

function eviscerateChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function rotateBoard(board) {
  let tmp = board.map((x) => x.map((y) => y));
  let N = board.length-1
  for (let i=N; i>=0; i--) {
    for (let j=N; j>=0; j--) {
      board[N-i][N-j] = tmp[i][j];
    }
  }
}

function getValidPositions(id) {
  let row = Math.floor(id/8);
  let col = id%8;
  possible_moves = [];
  piece_id = grid_vals[row][col].slice(1)
  let vectors = pieces[piece_id];
  switch(piece_id) {
    case("p"):
      if (grid_vals[row-1][col] == "be") {
        get_segment(id, vectors[0], false);
      }
      if (grid_vals[row-1][col+1] && grid_vals[row][col][0] != grid_vals[row-1][col+1][0] && grid_vals[row-1][col+1][0] != "b") get_segment(id, [-1, 1], false);
      if (grid_vals[row-1][col-1] && grid_vals[row][col][0] != grid_vals[row-1][col-1][0] && grid_vals[row-1][col-1][0] != "b") get_segment(id, [-1, -1], false);
      if (grid_vals[row][col] == default_grid[row][col] && grid_vals[row-1][col] == "be" && grid_vals[row-2][col] == "be") get_segment(id, [vectors[0][0]*2, 0], false);
      break;
    case("kn"):
      for (let i=0; i<vectors.length; i++) {
        get_segment(id, vectors[i], false);
      }
      break;
    case("ki"):
      for (let i=0; i<vectors.length; i++) {
        get_segment(id, vectors[i], false);
      }
      break;
    default:
      for (let i=0; i<vectors.length; i++) {
        get_segment(id, vectors[i]);
      }
      break;
  }
}

function get_segment(piece_pos, vector, infinite=true) {
  let row = Math.floor(piece_pos/8);
  let col = piece_pos%8;
  let next_row = row+vector[0];
  let next_col = col+vector[1];
  if (!infinite && (next_row<8 && 0<=next_row) && (next_col<8 && 0<=next_col)) {
    if (grid_vals[next_row][next_col][0] == grid_vals[row][col][0]) return;
    grid_colors[next_row*8+next_col] = "v";
    possible_moves.push([next_row,next_col]);
  } else {
    while (next_row<8 && 0<=next_row && next_col<8 && 0<=next_col) {
      if (grid_vals[next_row][next_col][0] == grid_vals[row][col][0]) return;
      grid_colors[next_row*8+next_col] = "v";
      possible_moves.push([next_row,next_col]);
      if (grid_vals[next_row][next_col][0] != grid_vals[row][col][0] && grid_vals[next_row][next_col][0] != "b") return;
      next_row += vector[0];
      next_col += vector[1];
    }
  }
}
