export interface Config {
  width: string
  height: string
  font: string
  color: string
  rotate: string
  row: string
  col: string
  startX: string
  startY: string
  offsetX: string
  offsetY: string
  word: string
}

export type ConfigKey = keyof Config

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
