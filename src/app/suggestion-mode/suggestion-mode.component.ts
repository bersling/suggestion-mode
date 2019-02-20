import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { isBackspace } from '../keyboard-utils';
import { moveCursorLeft, moveCursorRight, getElementLeftOfCursor } from './cursor-utils';
import { handleBackspace } from './backspace';
import { handleKeyPressCharacter } from './insert';

// by default, when you click inside the contenteditable, the selection is after a text node. Example:
// <span>h</span><span>i</span>
// when you click between h and i the selection is right after the h text node (tested in Chrome / Safari / FF)

// Learning: control + key is goddamn dangerous...
// separate concerns early on...

// Learning: do the zaunpfahl abstraction...

@Component({
  selector: 'app-suggestion-mode',
  templateUrl: './suggestion-mode.component.html',
  styleUrls: ['./suggestion-mode.component.scss']
})
export class SuggestionModeComponent implements AfterViewInit {

  @ViewChild('ce') ce: ElementRef;

  ngAfterViewInit() {
    // Das ist ein Saz mit Fehlern. Korigiere das Fehler.
    'Das ist ein Saz mit Fehlern. Korigiere das Fehler. Ich weiss dass ich nichts weiss. Unt mein Onkel, heisst Fritz.'.split('').forEach(char => {
      const span = document.createElement('span');
      span.innerText = char;
      this.ce.nativeElement.appendChild(span);
    });
  }

  onPaste(e: Event) {
    e.preventDefault();
    alert('sorry, pasting is disabled');
  }

  onCut(e: Event) {
    e.preventDefault();
    alert(`sorry, cutting is prevented, because you also cannot paste :)`)
  }

  isCharacter(e) {
    return e.charCode != null;
  }

  onKeydown(e) {
    if (isBackspace(e)) {
      e.preventDefault();
      handleBackspace();
    }
  }

  onKeypress(e) {
    if (!this.isArrowKey(e)) {
      e.preventDefault();
      if (this.isCharacter(e)) {
        console.log(e.charCode)
        handleKeyPressCharacter(String.fromCharCode(e.charCode));
      }
    }
  }

  isArrowKey(e) {
    return [37, 38, 39, 30].includes(e.keyCode);
  }

}