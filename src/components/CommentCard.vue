<template>
  <div class="relative">
    <!-- Main Comment Row -->
    <div class="relative flex gap-3 mb-4" :style="{ marginLeft: depth * 32 + 'px' }">
      <!-- Curved Line Connector -->
      <div
        v-if="depth > 0"
        class="absolute pointer-events-none"
        :style="{
          left: '-16px',
          top: '-100px',
          width: '20px',
          height: '120px',
          borderLeft: '2px solid #E2E2E2 ',
          borderBottom: '2px solid #E2E2E2',
          borderBottomLeftRadius: '16px'
        }"
      />

      <!-- Avatar -->
      <img
        :src="localComment.avatar"
        alt="User avatar"
        class="w-10 h-10 rounded-full object-cover flex-shrink-0 z-10 shadow-sm"
      />

      <!-- Comment Body -->
      <div class="flex-1">
        <!-- Bubble -->
        <div class="rounded-xl px-2 py-2  max-w-xs pl-3 z-50">
          <p class="text-sm font-semibold text-gray-900 w-full">
            {{ localComment.user }}
            <span class="font-normal text-gray-500 ml-1">
              {{ localComment.time || 'Just now' }}
            </span>
          </p>
          <p class="text-sm text-gray-500 whitespace-pre-wrap break-words">
            {{ localComment.text }}
          </p>
        </div>

        <!-- Media -->
        <div v-if="localComment.media?.length" class="mt-2 flex flex-wrap gap-2">
          <div
            v-for="(media, i) in localComment.media"
            :key="i"
            class="rounded-lg overflow-hidden border shadow-sm"
          >
            <component
              :is="media.type.startsWith('video') ? 'video' : 'img'"
              :src="media.url"
              class="max-w-64 max-h-64 object-cover rounded-lg"
              controls
              playsinline
              muted
            />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4 text-xs text-gray-600 mt-2 ml-3">
          <!-- Like -->
          <button
            @click="toggleLike"
            class="flex items-center gap-1 hover:text-red-500 transition"
            :class="{ 'text-red-500': localComment.liked }"
          >
            <Icon
              :icon="localComment.liked ? 'solar:heart-bold' : 'solar:heart-linear'"
              class="w-5 h-5"
            />
            <span v-if="localComment.likes > 0" class="font-medium">
              {{ localComment.likes }}
            </span>
          </button>

          <!-- Reply -->
          <button
            @click="replyOpen = !replyOpen"
            class="hover:text-blue-600 transition"
          >
            <Icon icon="uil:comment" class="w-5 h-5" />
          </button>

  
          <!-- Three-dot menu -->
          <div class="relative">
            <button @click.stop="toggleDots($event)">
              <Icon icon="bi:three-dots" class="w-5 h-5" />
            </button>
<div>
<teleport to="body">
              <div
                v-if="open"
                ref="popup"
                class="flex bg-white border rounded-xl shadow-lg z-50"
                :style="popupStyle"
                @click.stop>
                <ul class="py-2 text-gray-700 font-semibold">
                  <li @click="edit" class="px-4 py-2 rounded-xl hover:bg-gray-50 cursor-pointer">Edit</li>
                  <li @click="hideComment" class="px-4 py-2 rounded-xl hover:bg-gray-100 cursor-pointer">Hide</li>
                  <li @click="report" class="px-4 py-2 rounded-xl hover:bg-gray-200 cursor-pointer">Report</li>
                  <li @click="remove" class="px-4 py-2 rounded-xl hover:bg-gray-200 text-red-600 cursor-pointer">Delete</li>
                </ul>
              </div>
            </teleport>
          </div>
        </div>
</div>
            
        
        

        <!-- Show/Hide Replies -->
   

        <!-- Reply Input -->
        <transition name="fade">
          <div v-if="replyOpen" class="mt-4">
            <div class="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-md">
              <button>
                <Icon icon="solar:camera-broken" class="w-5 h-5"/>
              </button>
         
              <input
                v-model="replyText"
                @keyup.enter="submitReply"
                ref="replyInput"
                class="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
                :placeholder="`@${localComment.user}`"
              />
              <button
                @click="submitReply"
                :disabled="!replyText.trim()"
                class="text-blue-500 disabled:text-gray-300 transition"
              >
                <Icon icon="solar:paper-plane-bold" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Recursive Replies -->
    <transition name="slide">
      <div v-show="showReplies && totalReplies > 0">
        <CommentCard
          v-for="reply in localComment.replies"
          :key="reply.id || reply.time"
          :comment="reply"
          :depth="depth + 1"
          :current-user="currentUser"
          @reply-added="onReplyAdded"
        />
      </div>
    </transition>
  </div>
</template>

<script>


import { Icon } from '@iconify/vue'
import CommentCard from './CommentCard.vue'

export default {
  name: 'CommentCard',
  components: { Icon, CommentCard },
  props: {
    comment: { type: Object, required: true },
    depth: { type: Number, default: 0 },
    currentUser: { type: Object, required: true }
  },
  emits: ['reply-added'],
  data() {
    return {
      localComment: null,
      replyOpen: false,
      replyText: '',
      showReplies: true,
      open: false,
      popupStyle: { top: '0px', left: '0px' }
    }
  },
  computed: {
    totalReplies() {
      return this.countReplies(this.localComment?.replies || [])
    }
  },
  created() {
    this.localComment = JSON.parse(JSON.stringify(this.comment))
  },
  mounted() {
    if (this.depth >= 3) this.showReplies = false

    // Auto-focus reply input
    this.$watch('replyOpen', (isOpen) => {
      if (isOpen) this.$nextTick(() => this.$refs.replyInput?.focus())
    })

    // Click outside for 3-dot menu
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleDots(event) {
      this.open = !this.open
      if (this.open && event) {
        this.$nextTick(() => {
          const rect = event.target.getBoundingClientRect()
          this.popupStyle = {
            top: `${rect.bottom + 8}px`,
            left: `${rect.right - 176}px`,
            position: 'absolute'
          }
        })
      }
    },

    handleClickOutside(event) {
      if (this.open && this.$refs.popup && !this.$refs.popup.contains(event.target)) {
        this.open = false
      }
    },
    edit() { console.log('Edit'); this.open = false },
    hideComment() { console.log('Hide'); this.open = false },
    report() { console.log('Report'); this.open = false },
    remove() { console.log('Delete'); this.open = false },

    toggleLike() {
      if (!this.localComment.likes) this.localComment.likes = 0
      this.localComment.liked = !this.localComment.liked
      this.localComment.likes += this.localComment.liked ? 1 : -1
    },
    submitReply() {
      const text = this.replyText.trim()
      if (!text) return
      const newReply = {
        id: Date.now(),
        user: this.currentUser.name,
        avatar: this.currentUser.avatar,
        text,
        time: 'Just now',
        likes: 0,
        liked: false,
        replies: []
      }
      if (!this.localComment.replies) this.localComment.replies = []
      this.localComment.replies.push(newReply)
      this.replyText = ''
      this.replyOpen = false
      this.showReplies = true
      this.$emit('reply-added')
    },
    onReplyAdded() { this.$emit('reply-added') },
    countReplies(replies) {
      if (!replies) return 0
      return replies.reduce((sum, r) => sum + 1 + this.countReplies(r.replies), 0)
    }
  }
}
</script>




<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.slide-enter-active,
.slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from { opacity: 0; transform: translateY(-10px); }
.slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
