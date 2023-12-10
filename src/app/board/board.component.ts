import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Square, SquareType, Board, getSquareType } from '../models/board.model';
import { CommonModule } from '@angular/common';
import { Player } from '../models/player.model';
import { GameLocation, getLocationFromKey, locationShapes, locationDoors } from '../models/location.model';

interface QueueItem {
  x: number;
  y: number;
  distance: number;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  board: Board = [];
  player!: Player;
  highlightedSquares: { x: number, y: number }[] = [];


  ngOnInit() {
    this.initializeBoard();
    this.initializePlayer();
  }

  initializeBoard() {
    // Set streets
    for (let i = 0; i <= 19; i++) {
      this.board[i] = [];
      for (let j = 0; j <= 19; j++) {
        this.board[i][j] = {
          type: SquareType.Street,
          // Add more properties here, like coordinates
          location: undefined
        };
      }
    }
    // Set the building squares on the board
    Object.entries(locationShapes).forEach(([locationKey, shape]) => {
      const location = getLocationFromKey(locationKey) as GameLocation;
      if (location !== undefined) {
        shape.forEach(coords => {
          this.board[coords.x][coords.y].type = SquareType.Building;
          this.board[coords.x][coords.y].location = location;
        });
      }
    });

    // Set the door squares on the board
    Object.entries(locationDoors).forEach(([locationKey, shape]) => {
      const location = getLocationFromKey(locationKey) as GameLocation;
      if (location !== undefined) {
        shape.forEach(coords => {
          this.board[coords.x][coords.y].type = SquareType.Door;
          this.board[coords.x][coords.y].location = location;
        });
      }
    });
  }

  initializePlayer() {
    this.player = {
      id: '1',
      name: 'Sherlock Holmes',
      position: { x: 1, y: 1 },
      avatar: '/assets/sherlock.jpeg'
    }
  }

  onPlayerClick() {
    this.calculatePossibleMoves();
  }

  movePlayer(x: number, y: number) {
    this.player.position.x += x;
    this.player.position.y += y;
  }

  calculatePossibleMoves() {
    this.highlightedSquares = []; // Reset previously highlighted squares

    const maxDistance = this.getRandomDistance(1, 6);
    const visited = new Set<string>(); // Helps to keep track of visited squares

    // Helper function to convert coordinates to a string for the set
    const coordToString = (x: number, y: number) => `${x},${y}`;

    // Starting point
    let queue: QueueItem[] = [{ x: this.player.position.x, y: this.player.position.y, distance: 0 }];

    while (queue.length > 0) {
      const current = queue.shift(); // Dequeue the first element

      // Continue only if the dequeued item is not undefined
      if (current) {
        const { x, y, distance } = current;

        // Skip if we have already visited this square or if it's not a street
        if (!visited.has(coordToString(x, y)) &&
          (this.board[x][y].type === SquareType.Street || this.board[x][y].type === SquareType.Door)) {
          // Mark the current square as visited
          visited.add(coordToString(x, y));

          // Add to highlighted squares if within range and not the player's current square
          if (distance > 0 && distance <= maxDistance) {
            this.highlightedSquares.push({ x, y });
          }

          // Directions: up, down, left, right
          const directions = [
            { dx: 1, dy: 0 },  // down
            { dx: -1, dy: 0 }, // up
            { dx: 0, dy: 1 },  // right
            { dx: 0, dy: -1 }  // left
          ];

          // Add valid adjacent squares to the queue
          for (const { dx, dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;

            // Check if new position is within board boundaries and not already visited
            if (newX >= 0 && newX < this.board.length &&
              newY >= 0 && newY < this.board[newX].length
              && !visited.has(coordToString(newX, newY))) {
              queue.push({ x: newX, y: newY, distance: distance + 1 });
            }
          }
        }
      }
    }
  }

  movePlayerToSquare(x: number, y: number) {
    // First, check if the clicked square is a highlighted square
    if (this.isHighlighted(x, y)) {
      // Move the player to the clicked square
      this.player.position.x = x;
      this.player.position.y = y;

      // After moving, you might want to clear the highlighted squares
      this.highlightedSquares = [];

      // Optional: Any other logic you need after moving the player
    } else {
      console.log('Invalid move');
    }
  }

  isHighlighted(x: number, y: number): boolean {
    // Return true if the square is in the list of highlighted squares
    return this.highlightedSquares.some(square => square.x === x && square.y === y);
  }

  isPlayerPosition(x: number, y: number): boolean {
    // Return true if the square is the player's current position
    return this.player.position.x === x && this.player.position.y === y;
  }

  getSquareClasses(x: number, y: number): any {
    const isHighlighted = this.isHighlighted(x, y);
    const isPlayerPosition = this.isPlayerPosition(x, y);
    const location: string = this.board[x][y].location?.toString() || '';
    return {
      [this.board[x][y].type]: true, // Dynamically add the type-based class
      'highlight': isHighlighted,
      'player': isPlayerPosition,
      [location]: true,
    };
  }

  getRandomDistance(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}



