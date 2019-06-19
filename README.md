# Pixel

> micro pixel

[![Build Status](https://www.travis-ci.com/xg4/pixel.svg?branch=master)](https://www.travis-ci.com/xg4/pixel)
[![npm](https://img.shields.io/npm/v/@xg4/pixel.svg)](https://www.npmjs.com/package/@xg4/pixel)
[![GitHub](https://img.shields.io/github/license/xg4/pixel.svg)](https://github.com/xg4/pixel/blob/master/LICENSE)

## Installation

### Install with npm or Yarn

```bash
# npm
$ npm install @xg4/pixel --save
```

```bash
# yarn
$ yarn add @xg4/pixel
```

## Usage

```js
import px from '@xg4/pixel'

const data = image // ImageElement or ImageData or CanvasElement

px(data).blur() // return ImageData

px(data).mirror() // return ImageData
```

### Constructor

```ts
px(data: Pixel | ImageData | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Pixel
```

### Instance Methods

| name                                    | description         | return          |
| --------------------------------------- | ------------------- | --------------- |
| clone                                   | 克隆一个 Pixel 对象 | Pixel           |
| toDataURL(type?: string, quality?: any) | 生成 base64 url     | string          |
| toBlobURL(type?: string, quality?: any) | 生成 blob url       | Promise<string> |
| download(options?: DownloadOptions)     | 下载当前像素        | Promise<void>   |
| origin                                  | 原始效果            | ImageData       |
| shuffle                                 | 乱序效果            | ImageData       |
| relief                                  | 浮雕效果            | ImageData       |
| blur                                    | 模糊效果            | ImageData       |
| mirror                                  | 镜像效果            | ImageData       |
| casting                                 | 熔铸效果            | ImageData       |
| comic                                   | 连环画效果          | ImageData       |
| adjust                                  | 灰色调效果          | ImageData       |
| nostalgia                               | 怀旧效果            | ImageData       |
| brightness(value?: number)              | 调整亮度            | ImageData       |
| contrast(value?: number)                | 调整对比度          | ImageData       |
| invert                                  | 反向颜色效果        | ImageData       |
| grayscale                               | 灰度\|黑白照效果    | ImageData       |

## Contributing

Welcome

- Fork it

- Submit pull request

## LICENSE

MIT
