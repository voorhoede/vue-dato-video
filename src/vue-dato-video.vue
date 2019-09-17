<template>
  <div class="vue-dato-video">
    <figure>
      <fixed-ratio class="vue-dato-video__canvas" :width="canvasWidth" :height="canvasHeight">
        <lazy-load>
          <div class="vue-dato-video__background">
            <div
              class="vue-dato-video__cover"
              :style="{ backgroundImage: `url(${imageUrl})`, width: coverWidth }"
            ></div>
          </div>
        </lazy-load>
        <iframe
          v-if="isPlaying"
          class="vue-dato-video__iframe"
          :src="videoUrl"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          allow="autoplay">
        </iframe>
        <a
          v-if="!isPlaying"
          class="vue-dato-video__button"
          :href="video.url"
          @click.prevent="play">
          <span class="vue-dato-video__a11y-sr-only">play video</span>
          <svg class="vue-dato-video__icon" xmlns="http://www.w3.org/2000/svg" height="60" width="60"
            viewBox="0 0 1200 1200">
            <path
              d="M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65
              268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,
              600 z M 450,300.45 450,899.55 900,600 450,300.45 z"
              id="path16995" fill="#fff" />
          </svg>
        </a>
      </fixed-ratio>
      <figcaption class="vue-dato-video__caption" v-if="video.title">
        <a target="_blank" rel="noopener" :href="video.url" >
          {{ video.title }}
        </a>
      </figcaption>
    </figure>
  </div>
</template>

<script>
import FixedRatio from '@voorhoede/vue-fixed-ratio'
import LazyLoad from '@voorhoede/vue-lazy-load'

const binaryBoolean = (value) => ((value) ? 1 : 0)
export default {
  components: { FixedRatio, LazyLoad },
  props: {
    video: {
      type: Object,
      required: true,
    },
    autoplay: {
      type: Boolean,
      required: true,
    },
    loop: {
      type: Boolean,
      required: true,
    },
    mute: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isPlaying: this.autoplay,
      maxRatio: 1.5,
      width: undefined,
    }
  },
  computed: {
    canvasHeight() {
      // prevent canvas from getting a higher ratio than 3:2 (1.5:1)
      return Math.min(this.video.width * this.maxRatio, this.video.height)
    },
    canvasWidth() {
      return this.video.width
    },
    coverWidth() {
      return `${((this.video.width * this.maxRatio) / this.video.height) * 100}%`
    },
    imageUrl() {
      const sizeRegex = /_\d+(x\d+)?\.\w+$/ // match _123.ext and _123x123.ext
      let preset = '/maxresdefault.jpg'

      switch (this.video.provider) {
        case 'vimeo':
          return this.video.thumbnailUrl.replace(sizeRegex, `_${this.width}.jpg`)
        case 'youtube':
          if (this.width < 320) {
            preset = '/mqdefault.jpg'
          } else if (this.width < 480) {
            preset = '/hqdefault.jpg'
          }
          return this.video.thumbnailUrl.replace('/hqdefault.jpg', preset)
        default:
          console.error(`unsupported video provider for cover image: ${this.video.provider}`);
          return ''
      }
    },
    videoUrl() {
      if (!this.isPlaying) return ''
      const { autoplay, loop, mute = autoplay } = this
      const { provider, providerUid } = this.video
      switch (provider) {
        case 'vimeo':
          return `https://player.vimeo.com/video/${providerUid}?autoplay=1&muted=${binaryBoolean(mute)}&loop=${binaryBoolean(loop)}`
        case 'youtube':
          return `https://www.youtube.com/embed/${providerUid}?autoplay=1&mute=${binaryBoolean(mute)}&loop=${binaryBoolean(loop)}&playlist=${providerUid}`
        default:
          console.error(`unsupported video provider: ${provider}`);
          return ''
      }
    },
  },
  methods: {
    play() {
      this.isPlaying = true
    },
  },
  mounted() {
    const pixelRatio = window.devicePixelRatio || 1
    const cssWidth = this.$el.getBoundingClientRect().width
    this.width = cssWidth * pixelRatio
  },
}
</script>

<style>
.vue-dato-video {
  position: relative;
}

.vue-dato-video__background {
  position: absolute;
  height: 100%;
  width: 100%;
}

.vue-dato-video__cover {
  height: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  background-size: cover;
  background-position: center center;
}

.vue-dato-video__iframe {
  width:100%;
  height:100%;
  position:relative;
}

.vue-dato-video__button {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: background-color .25s ease;
}

.vue-dato-video__button:hover,
.vue-dato-video__button:focus {
  border-bottom: none;
  background-color: rgba(0, 0, 0, .25);
}

.vue-dato-video__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.vue-dato-video__caption {
  margin-top: .5rem;
  text-align: center;
  color: #4c4c4c;
  font-style: italic;
}

.vue-dato-video__a11y-sr-only {
  overflow: hidden;
  position: absolute;
  margin: -1px;
  padding: 0;
  width: 1px;
  height: 1px;
  border: 0;
  clip: rect(0 0 0 0);
}
</style>
