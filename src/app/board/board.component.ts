import { Component, OnInit, HostListener } from '@angular/core';
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
  squareSize: number = this.calculateSquareSize();

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.squareSize = this.calculateSquareSize();
  }

  ngOnInit() {
    this.initializeBoard();
    this.initializePlayer();
  }

  calculateSquareSize(): number {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    let screenWidth = window.innerWidth - scrollbarWidth;
    if (screenWidth < 400) { // for mobile
      return screenWidth / 10;
    }
    return screenWidth / 20;
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

  calculateBackgroundPosition(x: number, y: number): string {
    // Example calculation, adjust based on your image and layout
    const xOffset = -this.squareSize * x;
    const yOffset = -this.squareSize * y;
    return xOffset + 'px ' + yOffset + 'px';
  }

  getLocationBackgroundSize(location?: GameLocation): string {
    if (!location) {
      return '';
    }
    const locationShape = locationShapes[location];
    // const locationWidth = Math.max(...locationShape.map(coords => coords.y)) - Math.min(...locationShape.map(coords => coords.y)) + 1;
    // const locationHeight = Math.max(...locationShape.map(coords => coords.x)) - Math.min(...locationShape.map(coords => coords.x)) + 1;
    const locationWidth = 3;
    const locationHeight = 3;
    return (locationWidth * this.squareSize) + 'px ' + (locationHeight * this.squareSize) + 'px';
  }

  getSquareClasses(x: number, y: number): any {
    const isHighlighted = this.isHighlighted(x, y);
    const isPlayerPosition = this.isPlayerPosition(x, y);
    const location: string = this.board[x][y].location?.toString() || '';
    const relativeLocation: string = location + '-' + x.toString() + '-' + y.toString() || '';
    return {
      [this.board[x][y].type]: true, // Dynamically add the type-based class
      'highlight': isHighlighted,
      'player': isPlayerPosition,
      [location]: true,
      [relativeLocation]: true,
    };
  }

  getRandomDistance(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}



