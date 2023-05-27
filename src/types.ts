export interface Config {
  words: string
  width: number
  height: number
  fontSize: number
  color: string
  rotate: string
  row: number
  col: number
  startX: string
  startY: string
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
