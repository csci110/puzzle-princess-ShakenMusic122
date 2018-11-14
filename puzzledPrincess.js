import {game, Sprite} from "./sgc/sgc.js";
game.setBackground("floor.png");

class Marker extends Sprite {
    constructor(board, image, name) {
        super(); 
        this.board = board;
        this.name = name;
        this.setImage(image);
        this.x = this.startX = 150;
        this.y = this.startY = 275;
    }
    playInSquare(row, col) {
        if (!((row < 0 || row > 2) || (col < 0 || col > 2))) {
            this.x = this.board.x + ((col * this.board.squareSize) / 2); // Change
            this.y = this.board.y + ((row * this.board.squareSize) / 2); // Change
        }
    }
}
class PrincessMarker extends Marker {
    constructor(board) {
        super(board, "annFace.png", "Princess Ann");
        this.dragging = false;
    }
    handleMouseLeftButtonDown() {
        this.dragging = true;
    }
    handleMouseLeftButtonUp() {
        this.dragging = false;
        let col = Math.floor( (this.x - this.board.x ) / this.board.squareSize);
        let row = Math.floor( (this.y - this.board.y) / this.board.squareSize);
        //window.alert("The row number is " + row);
        //window.alert("The col number is " + col);
        if ((row < 0 || row > 2) || (col < 0 || col > 2)) {
           this.x = this.startX;
           this.y = this.startY;
        }
        this.playInSquare(row, col);
        return true;
    }
    handleGameLoop() {
        if (this.dragging) {
            this.x = game.getMouseX() - this.width / 2;
            this.y = game.getMouseY() - this.height / 2;
        }
    }
}
class StrangerMarker extends Marker { }
class TicTacToe extends Sprite {
    constructor() {
        super();
        this.name = "A tictactoe board";
        this.setImage("board.png");
        this.x = 300;
        this.y = 85;
        this.squareSize = 150;
        this.size = 3;
        this.activeMarker; // variable exists, but value is undefined
    }
    takeTurns() {
        this.activeMarker = new PrincessMarker(this);
    }
}

let theBoard = new TicTacToe();
theBoard.takeTurns();