<template>
    
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    @click.self="$emit('close')">

     <!-- Back to feed button -->
      <button
        @click="goToMainfeed"
        class="absolute top-6 left-6 p-3 rounded-xl bg-green-600 hover:bg-green-700 border-4 border-green-500 hover:border-green-400 text-white transition-all duration-200 z-40 shadow-lg" >
        <Icon icon="tdesign:chat-bubble" class="w-9 h-9" />
      </button>




    <div
      class="relative w-full max-w-[420px] aspect-[9/16] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 "
      @click.stop>
      <!-- VIDEO PLAYER -->
      <div class="absolute inset-0">
        <video
          ref="videoRef"
          class="h-full w-full object-cover"
          playsinline
          loop
          muted
          :src="videoSrc"
          @click="togglePlay"
          @play="isPlaying = true"
          @pause="isPlaying = false"
        >
    </video>

        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />
      </div>

      <!-- Top bar -->
      <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
        <div class="flex-1 h-1 bg-white/40 rounded-full overflow-hidden">
          <div class="h-full w-3/5 bg-white rounded-full transition-all duration-[4500ms]" />
        </div>

        <button
          @click="$emit('close')"
          class="ml-3 p-2 rounded-full hover:bg-white/20 text-white transition-colors"
        >
          <Icon icon="mdi:close" class="w-7 h-7" />
        </button>
      </div>

      <!-- Bottom info -->
      <div class="absolute bottom-0 left-0 right-0 p-5 pb-10">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full ring-2 ring-white/50 overflow-hidden shadow-sm">
              <img :src="avatar" alt="Jena" class="w-full h-full object-cover" />
            </div>
            <div class="text-white">
              <p class="font-semibold">Jena</p>
              <p class="text-xs text-white/80">3h ago</p>
            </div>
          </div>

          <button class="px-5 py-1.5 bg-white/95 text-black text-sm font-medium rounded-full hover:bg-white transition">
            Follow
          </button>
        </div>

        <p class="text-white text-sm leading-relaxed">
          This is my little video ♡
        </p>
      </div>

    
      <!-- Video controls - bottom right -->
     <div class="absolute inset-0 flex items-center justify-center bg-black/30   pointer-events-auto z-20">
        <button
          @click="togglePlay"
          class="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-lg text-white hover:bg-black/80 transition shadow-xl" >
          <Icon :icon="isPlaying ? 'solar:pause-bold' : 'solar:play-bold'" class="w-7 h-7" />
        </button>

        <!-- Mute button -->
        <button
          @click="toggleMute"
          class="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-lg text-white hover:bg-black/80 transition shadow-xl"
        >
          <Icon :icon="isMuted ? 'solar:volume-cross-bold' : 'solar:volume-loud-bold'" class="w-7 h-7" />
        </button>
      </div>
      
 
    </div>

      <!-- Right vertical action buttons  Reels style -->
      <div class=" flex right-5 top-1/8 -translate-y-1/2 flex flex-col items-center gap-4 z-20 mt-80">
        <button class="group">
          <div class="w-13 h-13 flex items-center justify-center rounded-full bg-black/45 backdrop-blur-lg 
          shadow-xl group-hover:scale-110 transition-transform duration-200">
            <Icon icon="solar:heart-bold" class="w-7 h-7 text-white group-hover:text-pink-400" />
          </div>
        </button>

        <button class="group">
          <div class="w-13 h-13 flex items-center justify-center rounded-full bg-black/45 backdrop-blur-lg 
          shadow-xl group-hover:scale-110 transition-transform duration-200">
            <Icon icon="solar:chat-line-bold" class="w-7 h-7 text-white group-hover:text-blue-400" />
          </div>
        </button>

        <button class="group">
          <div class="w-13 h-13 flex items-center justify-center rounded-full bg-black/45 backdrop-blur-lg
           shadow-xl group-hover:scale-110 transition-transform duration-200">
            <Icon icon="solar:share-bold" class="w-7 h-7 text-white group-hover:text-green-400" />
          </div>
        </button>

        <button class="group">
          <div class="w-13 h-13 flex items-center justify-center rounded-full bg-black/45 backdrop-blur-lg shadow-xl 
          group-hover:scale-110 transition-transform duration-200">
            <Icon icon="solar:bookmark-bold" class="w-7 h-7 text-white group-hover:text-yellow-400" />
          </div>
        </button>
      </div>


  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import avatar from '@/assets/mini1.jpg'

export default {
  name: 'StoryReelPopup',

  components: { Icon },

  props: {
    videoSrc: {
      type: String,
      required: true,
    }
  },

  emits: ['close'],

  data() {
    return {
      avatar,
      isPlaying: false,
      isMuted: true,
    }
  },

  methods: {
    togglePlay() {
      const video = this.$refs.videoRef
      if (!video) return

      if (video.paused || video.ended) {
        video.play().then(() => {
          this.isPlaying = true
          this.startHideTimer()
        }).catch(err => console.warn("Play blocked", err))
      } else {
        video.pause()
        this.isPlaying = false,
        this.controlsHidden = false,  // show controls when paused
        this.clearHideTimer()
      }
    },
    
toggleMute() {
      const video = this.$refs.videoRef
      if (video) {
        video.muted = !video.muted
        this.isMuted = video.muted
      }
    },

    onPlay() {
      this.isPlaying = true,
      this.startHideTimer()
    },

    onPause() {
      this.isPlaying = false,
      this.controlsHidden = false,
      this.clearHideTimer()
    },

    startHideTimer() {
      this.clearHideTimer()
      this.hideTimer = setTimeout(() => {
        this.controlsHidden = true
      }, 500) // hide after 1.8 seconds
    },

    clearHideTimer() {
      if (this.hideTimer) {
        clearTimeout(this.hideTimer)
        this.hideTimer = null
      }
    },

    resetHideTimer() {
      if (this.isPlaying) {
        this.controlsHidden = false,
        this.startHideTimer()
      }
    },

    handleVideoClick(e) {
      // Prevent closing popup when clicking inside video area
      e.stopPropagation()
      this.togglePlay()
    },
    
    goToMainfeed() {
      console.log('→ Going to main feed')
      // this.$router.push({ name: 'Mainfeed' })
    }
  },

  beforeUnmount() {
    if (this.$refs.videoRef) {
      this.$refs.videoRef.pause?.()
    }
  }
}
</script>