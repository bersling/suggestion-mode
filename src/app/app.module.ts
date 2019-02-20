import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SuggestionModeComponent } from './suggestion-mode/suggestion-mode.component';
import { SelectionPlaygroundComponent } from './selection-playground/selection-playground.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, SuggestionModeComponent, SelectionPlaygroundComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
