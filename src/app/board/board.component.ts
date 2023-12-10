import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Square, SquareType, Board } from '../models/board.model';
import { CommonModule } from '@angular/common';
import { Player } from '../models/player.model';


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

  ngOnInit() {
    this.initializeBoard();
    this.initializePlayer();
  }

  initializeBoard() {
    const size = 20; // 20x20 board
    for (let i = 0; i < size; i++) {
      this.board[i] = [];
      for (let j = 0; j < size; j++) {
        // Initialize each square. For now, let's make them all streets.
        this.board[i][j] = { type: SquareType.Street };
      }
    }
  }

  initializePlayer() {
    this.player = {
      id: '1',
      name: 'Sherlock Holmes',
      position: { x: 0, y: 0 },
      avatar: '/assets/sherlock.jpeg'
    }
  }

}
