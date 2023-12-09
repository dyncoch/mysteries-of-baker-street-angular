import { Component, HostListener } from '@angular/core';
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustHeight();
  }

  ngOnInit() {
    this.adjustHeight();
  }

  adjustHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log('vh: ' + vh);
  }

}
