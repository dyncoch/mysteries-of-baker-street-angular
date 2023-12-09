import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import UiKit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
declare var UIkit: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mysteries-of-baker-street';

  showAlert() {
    UiKit.modal.alert('UIkit is ready to go!');
  }
}
