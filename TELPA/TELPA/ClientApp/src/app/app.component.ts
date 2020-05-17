import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {  }

  enableNavBar() {
    if (
      this.router.url === '/login' ||
      this.router.url === '/'
    ) {
      return true;
    } else {
      return false;
    }
  }
}
