import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'suggestion-mode';
  
  doSomething(someArg): boolean {
    if (someArg) {
      return true;
    } else {
      return false;
    }
  }

}
