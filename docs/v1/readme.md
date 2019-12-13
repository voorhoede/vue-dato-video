# @voorhoede/vue-dato-video

Fully optimized video component for videos from Dato CMS.

[[toc]]

## Features

- Supports both **Vimeo** and **YouTube**.
- Has a **fixed ratio**, so space is reserved before the video is loaded. This prevents annoying layout jumps.
- Supports an optional **video caption**.
- Has a **cover image** that lazy loads, meaning the image will only be downloaded when necessary, resulting in much faster page loads.
- Supports autoplay.

## Installation

```
npm install @voorhoede/vue-dato-video
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import VueDatoVideo from '@voorhoede/vue-dato-video'

Vue.use(VueDatoVideo)
```

The CSS file should be imported seperately in the way you desire. It's located at `@voorhoede/vue-dato-video/dist/vue-dato-video.css`.


### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<script src="@voorhoede/vue-dato-video/dist/vue-dato-video.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/@voorhoede/vue-dato-video"></script>
```

## Examples

### Youtube

<ClientOnly>
::: demo
<vue-dato-video
  :loop="false"
  :autoplay="false"
  :mute="false"
  :video="{
    url: 'https://www.youtube.com/watch?v=AoIq7P6DJKU',
    title: 'A Love Letter to Winter',
    width: 480,
    height: 270,
    provider: 'youtube',
    providerUid: 'AoIq7P6DJKU',
    thumbnailUrl: 'https://i.ytimg.com/vi/AoIq7P6DJKU/hqdefault.jpg'
  }"
></vue-dato-video>
:::
</ClientOnly>

### Vimeo

<ClientOnly>
::: demo
<vue-dato-video
  :loop="false"
  :autoplay="false"
  :mute="false"
  :video="{
    url: 'https://vimeo.com/259411563',
    title: 'A Love Letter to Winter',
    height: 540,
    width: 960,
    provider: 'vimeo',
    providerUid: '259411563',
    thumbnailUrl: 'https://i.vimeocdn.com/video/687867313.jpg?mw=960&mh=540'
  }"
></vue-dato-video>
:::
</ClientOnly>

<!-- The API section is auto generated, don't touch please -->

## API

### vue-dato-video 

#### props 

- `video` ***Object*** (*required*) 

- `autoplay` ***Boolean*** (*required*) 

- `loop` ***Boolean*** (*required*) 

- `mute` ***Boolean*** (*required*) 
