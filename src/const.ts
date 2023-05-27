export const WATERMWRK_KEY ="watermark-config"

export const defaultConfig = {
  words: '仅用于工作认证',
  width: 0,
  height: 0,
  fontSize: 16,
  color: 'rgba(0, 0, 0, 0.2)',
  rotate: '-15',
  row: 7,
  col: 7,
  startX: '-100',
  startY: '0',
  offsetX: 48,
  offsetY: 48,
  compression: 1,
  saveConfig: false,
}

export const tooltips = {
  words: 'the words of watermark, use enter key to wrap lines',
  width: 'the width of image, pdf is not useful',
  height: 'the height of image, pdf is not useful',
  fontSize: 'the font size of the watermark',
  color: 'the color of the watermark, rgba is three-primary color, last parameter is opacity',
  rotate: 'the rotation angle of watermark',
  row: 'the rows of watermarks',
  col: 'the columns of watermarks',
  startX: 'the position along the X axis of first watermark',
  startY: 'the position along the Y axis of first watermark',
  offsetX: 'the offset along the X axis between two watermarks',
  offsetY: 'the offset along the Y axis between two watermarks',
  compression: 'the level for compression',
  saveConfig: 'save the config for next use',
}
