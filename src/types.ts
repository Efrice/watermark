export interface Config {
  words: string
  width: number
  height: number
  fontSize: number
  color: string
  rotate: number
  row: number
  col: number
  startX: number
  startY: number
  offsetX: number
  offsetY: number
  compression: number
  saveConfig: boolean
}

export type ConfigKey = keyof Config

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface imgData {
  src: string
  width: number
  height: number
}
