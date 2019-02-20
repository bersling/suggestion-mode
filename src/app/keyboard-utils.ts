export function getKeyCode(e: KeyboardEvent): number {
  return e.keyCode ? e.keyCode : e.which;
}

export function isBackspace(e: KeyboardEvent): boolean {
  return getKeyCode(e) === 8;
}
