<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl"
    @click.self="$emit('close')"
  >

     <!-- Close button -->
   
       <button
        @click="$emit('close')"
        class="absolute top-8 left-20  p-3 rounded-full hover:bg-white/20
        text-white transition-colors">
        <Icon icon="mdi:close" class="w-7 h-7" />
        </button>

  <!--Logo Icon  -->
  <button 
    @click="goToMainfeed"
    class=" absolute top-6 left-6 p-3 rounded-xl  transition-all duration-200 group">
    <Icon icon="tdesign:chat-bubble" 
      class="w-10 h-10 text-white transition-colors bg-green-500
      border-4 border-green-500 rounded-xl duration-200 hover:text-gray-600 mb-10" 
    />
  </button>



    <!-- Reel Container -->
    <div
      class="relative w-full max-w-[420px] aspect-[9/16]
      bg-gray-900 rounded-3xl overflow-hidden
      shadow-2xl ring-1 ring-white/10"
      @click.stop>

      <!-- VIDEO -->
      <div class="absolute inset-0">
        <video
          ref="videoRef"
          class="h-full w-full object-cover"
          playsinline
          loop
          muted
          :src="videoSrc"
          @click.stop="togglePlay"
          @play="onPlay"
          @pause="onPause"
          @mousemove="resetHideTimer">
      </video>

        <!-- Overlay -->
        <div
          class="absolute inset-0
          bg-gradient-to-b
          from-black/20 via-transparent to-black/100
          pointer-events-none"
        >
      </div>
    
<!---- Icon Closee-->
      
      </div>
      <!-- BOTTOM INFO -->
      <div class="absolute bottom-0 left-0 right-0 p-5 pb-10 z-30">

        <!-- User -->
        <div class="flex items-center justify-between mb-4">

          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full ring-2
              ring-white/50 overflow-hidden shadow-sm">
              <img
                :src="avatar"
                alt="Jena"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="text-white">
              <p class="font-semibold">Jena</p>
              <p class="text-xs text-white/80">3h ago</p>
            </div>
          </div>

          <button
            class="px-5 py-1.5 bg-white/95 text-black
            text-sm font-medium rounded-full
            hover:bg-white transition">
            Follow
          </button>
        </div>

        <!-- Caption -->
        <div class="text-white text-sm leading-relaxed">

          <p>
            {{ showMore ? fullText : shortText }}
          </p>
          
          <!-- Mute -->
        <button
          @click="toggleMute"
          class="pointer-events-auto w-12 h-12
          flex items-center justify-center
          rounded-full bg-black/60 backdrop-blur-lg
          text-white hover:bg-black/80
          transition shadow-xl">
          <Icon
            :icon="isMuted
              ? 'material-symbols:volume-off'
              : 'material-symbols:volume-up'"
            class="w-5 h-5   "
          />
        </button>


 <!-- TOP BAR -->
      <div
        class="absolute  left-4 right-4 px-4 py-2
        flex items-center z-30">
        <div class="flex-1 h-1 bg-white/40 rounded-full overflow-hidden">
        <div
            class="h-full w-3/5 bg-white rounded-xl
            transition-all duration-[4500ms]">
        </div>
        </div>
      </div>




          <button
            @click="showMore = !showMore"
            class="text-blue-400 mt-2 text-sm hover:underline">
            {{ showMore ? 'Show less' : 'Show more' }}
            
          </button>
          

        </div>
        
      </div>

     

      <!-- CENTER CONTROLS -->
      <div
        class="absolute inset-0 flex items-center
        justify-center gap-4 z-20 pointer-events-none">

        <!-- Play -->
        <button
          @click="togglePlay"
          class="pointer-events-auto w-12 h-12
          flex items-center justify-center
          rounded-full bg-black/60 backdrop-blur-lg
          text-white hover:bg-black/80
          transition shadow-xl">
          <Icon
            :icon="isPlaying
              ? 'material-symbols:pause'
              : 'mdi:play'"
            class="w-7 h-7"
          />
          
        </button>
 
       

      </div>

    </div>


    <!-- RIGHT BUTTONS -->
    <div
      class="flex right-6 px-4 top-1/8 -translate-y-10/2
      flex-col items-center gap-6 z-20 mt-80">

      <button class="group">
      <div
          class="w-13 h-13 flex items-center justify-center
          rounded-xl p-2 bg-black/45 
          shadow-xl group-hover:scale-110
          transition-transform duration-200">
          <Icon
            icon="solar:heart-linear"
            class="w-7 h-7 text-white group-hover:text-pink-400"/>
          </div>
        
      </button>

      <button class="group">
        <div
          class="w-13 h-13 flex items-center justify-center
          rounded-xl  p-2 bg-black/45 
          shadow-xl group-hover:scale-110
          transition-transform duration-200">
          <Icon
            icon="uil:comment"
            class="w-7 h-7 text-white group-hover:text-blue-400"/>
        </div>
      </button>

      <button class="group">
        <div
         class="w-13 h-13 flex items-center justify-center
          rounded-xl p-2 bg-black/45
          shadow-xl group-hover:scale-110
          transition-transform duration-200">
          <Icon
            icon="bitcoin-icons:share-filled"
            class="w-7 h-7 text-white group-hover:text-blue-400"/>
        </div>
        
      </button>
      
      
<!---3 Dot -->
      <button class="group">
        <div
          class="w-13 h-13 flex items-center justify-center
          rounded-xl  p-2 bg-black/45 
          shadow-xl group-hover:scale-110
          transition-transform duration-200">
          <Icon
            icon="bi:three-dots"
            class="w-7 h-7 text-white group-hover:text-white-400"
          />
        </div>
      </button>
<!---Arrow Downd-->
    </div>

      <div class="flex flex-col gap-4 absolute right-6 top-1/2 -translate-y-1/2 z-20">
         <button class="group">
        <div
          class="w-13 h-13 flex items-center justify-center
          rounded-full  p-2 bg-black/45 
          shadow-xl group-hover:scale-110
          transition-transform duration-200">
          <Icon
            icon="oui:arrow-up"
            class="w-7 h-7 text-white group-hover:text-white-400"
          />
        </div>
      </button>  


      <button class="group">
        <div
          class="w-13 h-13 flex items-center justify-center
          rounded-full  p-2 bg-black/45 
          shadow-xl group-hover:scale-110
          transition-transform duration-200">
          <Icon
            icon="oui:arrow-down"
            class="w-7 h-7 text-white group-hover:text-white-400"
          />
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

  components: {
    Icon
  },

  props: {
    videoSrc: {
      type: String,
      required: true
    }
  },

  emits: ['close'],

  data() {
    return {
      avatar,

      isPlaying: false,
      isMuted: true,

      showMore: false,

      fullText: `
This is my little video project, inspired by Instagram Reels.
I wanted to create a simple and elegant video player that
mimics the feel of Reels, with smooth controls and a clean interface.
It's built using Vue.js and Tailwind CSS.
      `,

      controlsHidden: false,
      hideTimer: null
    }
  },

  computed: {
    shortText() {
      return this.fullText.substring(0, 120) + '...'
    }
  },

  methods: {

    async togglePlay() {
      const video = this.$refs.videoRef

      if (!video) return

      try {

        if (video.paused || video.ended) {

          await video.play()

          this.isPlaying = true
          this.startHideTimer()

        } else {

          video.pause()

          this.isPlaying = false
          this.controlsHidden = false

          this.clearHideTimer()
        }

      } catch (err) {
        console.warn('Video interrupted:', err)
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
      this.isPlaying = true
      this.startHideTimer()
    },

    onPause() {
      this.isPlaying = false
      this.controlsHidden = false
      this.clearHideTimer()
    },

    startHideTimer() {
      this.clearHideTimer()

      this.hideTimer = setTimeout(() => {
        this.controlsHidden = true
      }, 500)
    },

    clearHideTimer() {
      if (this.hideTimer) {
        clearTimeout(this.hideTimer)
        this.hideTimer = null
      }
    },

    resetHideTimer() {
      if (this.isPlaying) {
        this.controlsHidden = false
        this.startHideTimer()
      }
    },

    goToMainfeed() {
      console.log('Go to Main Feed')
    }
  },

  beforeUnmount() {
    if (this.$refs.videoRef) {
      this.$refs.videoRef.pause()
    }
  }
}
</script>