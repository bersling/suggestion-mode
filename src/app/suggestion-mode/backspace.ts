import { getElementLeftOfCursor, moveCursorLeft, moveCursorRight, moveCursorToRightOfElement, moveCursorToLeftOfElement, getCursorPosition, setCursorPosition, getSelectedElements } from './cursor-utils';

export function handleBackspace() {
  if (window.getSelection().type === 'Range') {
    handleBackspaceOnRange();
  } else {
    const elementLeftOfCursor = getElementLeftOfCursor();
    if (elementLeftOfCursor != null) {
      handleBackspaceOnElement(elementLeftOfCursor);
    } else {
      // nothing to do, since cursor is at start of textarea.
    }
  }
}

// FIXME: range sometimes a bit buggy
// FIXME: no selection in here, should be abtracted
export function handleBackspaceOnRange(moveCursorToEnd: boolean = false) {
  console.log('backspace...?')
  const selectedElements = getSelectedElements();
  const eltLeftOfSelection = selectedElements[0].previousSibling as HTMLSpanElement | null;
  const eltRightOfSelection = selectedElements[selectedElements.length - 1].nextSibling as HTMLSpanElement | null;
  const remainingElements = [];
  selectedElements.forEach(elt => {
    if (elt.classList.contains('removed')) {
      // nothing to do, is already removed
      remainingElements.push(elt);
    } else if (elt.classList.contains('added')) {
      // remove the element
      elt.parentNode.removeChild(elt);
    } else {
      // mark the element as removed
      elt.classList.add('removed');
      remainingElements.push(elt);
    }
  });
  if (remainingElements.length > 0) {
    if (moveCursorToEnd) {
      moveCursorToRightOfElement(remainingElements[remainingElements.length - 1]);
    } else {
      moveCursorToLeftOfElement(remainingElements[0]);
    }
  } else {
    if (eltLeftOfSelection != null) {
      return moveCursorToRightOfElement(eltLeftOfSelection);
    } else if (eltRightOfSelection != null) {
      return moveCursorToLeftOfElement(eltRightOfSelection);
    } else {
      throw new Error('there seems to be neither left nor right, but that is not a legal state');
    }
  }
  const sel = window.getSelection();
}

function handleBackspaceOnElement(elementToRemove: HTMLElement) {
  if (elementToRemove.classList.contains('removed')) {
    handleBackspacePressedOnAlreadyRemovedChar();
  } else if (elementToRemove.classList.contains('added')) {
    removeElement(elementToRemove);
  } else {
    markElementAsRemoved(elementToRemove);
  }
}

function handleBackspacePressedOnAlreadyRemovedChar() {
  moveCursorLeft();
}

function markElementAsRemoved(elementToRemove) {
  elementToRemove.classList.add('removed');
  moveCursorLeft();
}

function removeElement(elementToRemove: HTMLElement) {
  const currentIndex = getCursorPosition();
  elementToRemove.parentNode.removeChild(elementToRemove);
  setCursorPosition(currentIndex - 1);
}
