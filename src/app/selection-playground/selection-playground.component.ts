import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-selection-playground',
  templateUrl: './selection-playground.component.html',
  styleUrls: ['./selection-playground.component.css']
})
export class SelectionPlaygroundComponent {

  @ViewChild('ce') ce: ElementRef;

  setCaret() {
    var el = this.ce.nativeElement
    var range = document.createRange();
    var sel = window.getSelection();
    const target = el.childNodes[0].childNodes[0];
    console.log(target);
    range.setStart(target, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

}