import { getElementRightOfCursor, getElementLeftOfCursor, moveCursorRight, moveCursorToRightOfElement, moveCursorToLeftOfElement, getSelectedElements } from './cursor-utils';
import {handleBackspaceOnRange} from './backspace';

export function handleKeyPressCharacter(char: string) {
  if (window.getSelection().type === 'Range') {
    handleInsertCharOnRange(char);
  } else {
    handleInsertOnCursor(char);
  }
}

function handleInsertCharOnRange(char: string) {
  handleBackspaceOnRange(true);
  handleInsertOnCursor(char);
}

function handleInsertOnCursor(char: string) {
    const elementRightOfCursor = getElementRightOfCursor();
  if (elementRightOfCursor == null) {
    insertNewChar(char);
  } else {
    if (elementRightOfCursorIsRemovedAndSameAsChar(char)) {
      reinsertRemovedChar();
    } else {
      insertNewChar(char);
    }
  }
}

function insertNewChar(char: string) {
  const span = createSpanWithInnerText(char);
  const elementLeftOfCursor = getElementLeftOfCursor();
  const elementRightOfCursor = getElementRightOfCursor();
  const parent = elementRightOfCursor ? elementRightOfCursor.parentNode : elementLeftOfCursor.parentNode;
  parent.insertBefore(span, elementRightOfCursor) // if elementRightOfCursor is null it's still ok, insertBefore handles this by appending to end
  moveCursorToRightOfElement(span);
}

function createSpanWithInnerText(text: string): HTMLSpanElement {
  const span = document.createElement('span');
  span.classList.add('added');
  span.innerText = text;
  return span;
}

function elementRightOfCursorIsRemovedAndSameAsChar(char) {
  const elementRightOfCursor = getElementRightOfCursor();
  if (
    elementRightOfCursor == null
    || !(elementRightOfCursor instanceof HTMLElement)
    || !elementRightOfCursor.classList.contains('removed')
  ) {
    return false;
  } else {
    return char === elementRightOfCursor.innerText;
  }
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function reinsertRemovedChar() {
  const elementRightOfCursor = getElementRightOfCursor();
  elementRightOfCursor.classList.remove('removed');
  moveCursorRight();
}
