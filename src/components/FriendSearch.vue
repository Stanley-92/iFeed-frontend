<template>
  <!-- Search Icon Button -->
  <div class="relative w-16">
    <button
      @click="toggleOpen"
      class="rounded-xl hover:bg-gray-100 transition-all duration-200 group p-2"
    >
      <Icon
        icon="solar:magnifer-outline"
        class="w-7 h-7 text-gray-600 group-hover:text-gray-800"
      />
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute top-full left-0 mt-2
               w-80 max-w-[90vw]
               bg-white border border-gray-200
               rounded-xl shadow-2xl
               z-[9999] overflow-hidden"
      >
        <!-- Input -->
        <input
          ref="searchInput"
          v-model="searchQuery"
          :placeholder="placeholder"
          class="w-full px-4 py-3 text-sm
                 border-b border-gray-200
                 focus:outline-none focus:ring-2 focus:ring-blue-200"
          @keydown.esc="closeDropdown"
        />

        <!-- Results -->
        <div
          v-if="filteredUsers.length"
          class="max-h-80 overflow-y-auto"
        >
          <div
            v-for="user in filteredUsers"
            :key="user.id"
            @mousedown.prevent="selectUser(user)"
            class="flex items-center gap-3 px-4 py-3
                   hover:bg-gray-100 cursor-pointer
                   transition-colors"
          >
            <img
              :src="user.avatar"
              class="w-10 h-10 rounded-full object-cover border"
            />

            <p class="font-medium text-gray-900">
              {{ user.username }}
            </p>

            <button
              class="ml-auto text-sm text-blue-600
                     hover:text-blue-700 transition-colors"
            >
              {{ actionText }}
            </button>
          </div>
        </div>

        <!-- Empty -->
        <div
          v-else
          class="px-4 py-6 text-center text-gray-400"
        >
          {{ emptyText }}
        </div>
      </div>
    </Transition>
  </div>

  <!-- Click outside -->
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="closeDropdown"
    />
  </Teleport>
</template>


<script>
import { Icon } from '@iconify/vue'

export default {
  name: 'FriendSearch',
  components: { Icon },

  props: {
    users: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Search friends...'
    },
    actionText: {
      type: String,
      default: 'Add'
    },
    emptyText: {
      type: String,
      default: 'Start typing to search'
    }
  },

  data() {
    return {
      isOpen: false,
      searchQuery: ''
    }
  },

  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.users.slice(0, 10)
      }
      const q = this.searchQuery.toLowerCase()
      return this.users.filter(u =>
        u.username.toLowerCase().includes(q)
      )
    }
  },

  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
      this.$nextTick(() => {
        this.$refs.searchInput?.focus()
      })
    },

    closeDropdown() {
      this.isOpen = false
      this.searchQuery = ''
    },

    selectUser(user) {
      this.$emit('select', user)
      this.closeDropdown()
    }
  }
}
</script>
