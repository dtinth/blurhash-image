import { decode } from 'blurhash'

export class BlurhashToDataUrlConverter {
  canvas: HTMLCanvasElement | null = null
  cache: { [blurhash: string]: string } = {}
  constructor(public size = 16) {}

  async toDataURL(blurhash: string) {
    if (this.cache[blurhash]) {
      return this.cache[blurhash]
    }
    if (!this.canvas) {
      this.canvas = document.createElement('canvas')
      this.canvas.width = this.size
      this.canvas.height = this.size
    }
    const ctx = this.canvas.getContext('2d')!
    const pixels = decode(blurhash, this.size, this.size)
    const imageData = ctx.createImageData(this.size, this.size)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
    const url = this.canvas.toDataURL(blurhash)
    this.cache[blurhash] = url
    return url
  }
}

export const defaultConverter = new BlurhashToDataUrlConverter()

export class BlurhashImage extends HTMLElement {
  converter = defaultConverter
  constructor() {
    super()
  }
  async connectedCallback() {
    const blurhash: string = this.getAttribute('blurhash')!
    try {
      this.style.backgroundImage = `url("${await this.converter.toDataURL(
        blurhash
      )}")`
    } catch (error) {
      console.warn('Cannot decode blurhash', blurhash, error)
    }
  }
}

customElements.define('blurhash-image', BlurhashImage)
