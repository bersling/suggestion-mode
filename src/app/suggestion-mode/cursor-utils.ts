export function getSelectedElements(): HTMLSpanElement[] {
  const selection = getSelection();
  if (selection.type !== 'Range') {
    return [];
  } else {
    const firstNode = window.getSelection().anchorNode.parentNode;
    const lastNode = window.getSelection().focusNode.parentNode;
    const charElements = getCharElements();
    const indexOfFirstNode = getIndexOfElement(firstNode);
    const indexOfLastNode = getIndexOfElement(lastNode);
    return indexOfFirstNode > indexOfLastNode
      ? charElements.slice(indexOfLastNode, indexOfFirstNode + 1)
      : charElements.slice(indexOfFirstNode, indexOfLastNode + 1);
  }
}

// Helper functions A
function getContainer() {
  // fixme: don't get with id...
  return document.getElementById('contenteditable')
}

function getCharElements(): HTMLElement[] {
  return Array.from(getContainer().children) as HTMLSpanElement[];
}

export function getElementLeftOfCursor(): HTMLElement | null {
  const currentIndex = getCursorPosition();
  const charElements = getCharElements();
  if (currentIndex === 0) {
    return null;
  } else {
    return charElements[currentIndex - 1];
  }
}

export function getElementRightOfCursor(): HTMLElement | null {
  const currentIndex = getCursorPosition();
  const charElements = getCharElements();
  if (currentIndex === charElements.length) {
    return null;
  } else {
    return charElements[currentIndex];
  }
}

function getIndexOfElement(elt): number {
  return getCharElements().indexOf(elt);
}


export function getCursorPosition(): number {
  const sel = window.getSelection();
  const parentNode = sel.anchorNode.parentNode;
  if (sel.anchorOffset === 0 && parentNode === getContainer().firstChild as any) {
    return 0;
  } else if (sel.anchorOffset === 1) {
    const idx = getIndexOfElement(parentNode);
    if (idx > -1) {
      return idx + 1;
    } else {
      throw new Error('oupsie doupsie expected index to be larger than -1');
    }
  } else {
    throw new Error('oupsie, something went wrong at getCursorPosition');
  }
}

export function setCursorPosition(idx: number) {
  const sel = window.getSelection();
  if (idx === 0) {
    moveCursorToStart();
  } else {
    const charElements = getCharElements();
    const elt = charElements[idx - 1];
    placeCaretAfterElement(elt);
  }
}

export function moveCursorLeft() {
  const cursorPos = getCursorPosition();
  if (cursorPos === 0) {
    // nothing to do
  } else {
   setCursorPosition(getCursorPosition() - 1);
  }
}

export function moveCursorRight() {
  const cursorPos = getCursorPosition();
  if (cursorPos === getCharElements().length) {
    // nothing to do
  } else {
   setCursorPosition(getCursorPosition() + 1);
  }
}

// nitty gritty stuff about selections & ranges
// implementation details that should be hidden
function placeCaretAtElement(elt: HTMLElement, pos: 'before' | 'after') {
  if (elt instanceof HTMLElement) {
    var range = document.createRange();
    var sel = window.getSelection();
    const target = elt.childNodes[0];
    range.setStart(target, pos === 'before' ? 0 : 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    throw new Error(`placeCaretAtElement expected a HTMLElement, but found ${elt} instead.`)
  }
}

function placeCaretAfterElement(elt) {
  placeCaretAtElement(elt, 'after');
}

function placeCaretBeforeElement(elt) {
  placeCaretAtElement(elt, 'before');
}

export function moveCursorToRightOfElement(elt: HTMLElement) {
  const charElements = getCharElements();
  const idx = charElements.indexOf(elt);
  setCursorPosition(idx + 1);
}

export function moveCursorToLeftOfElement(elt: HTMLElement) {
  const charElements = getCharElements();
  const idx = charElements.indexOf(elt);
  setCursorPosition(idx);
}

function moveCursorToStart() {
  placeCaretBeforeElement(getContainer().firstChild);
}
