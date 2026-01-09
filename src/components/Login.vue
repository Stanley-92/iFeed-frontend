<template>
  <div class="min-h-screen bg-gray flex items-center justify-center">
  <div class="flex w-full max-w-6xl items-center justify-between px-8 gap-10">

      <!-- LEFT TEXT -->


<div class="flex min-h-[100dvh] mt-8  ">
<aside >
<div class=" w-65 hidden md:block max-w-full">
<button class="flex-1 items-center pl-3 cursor-pointer ">
<Icon icon="tdesign:chat-bubble" 
class="w-14 h-14 text-white transition-colors
 bg-green-500 border-4 border-green-500 rounded-xl
  duration-200 hover:text-gray-600 mb-10" 
 @click="goToMainfeed"/>
</button>


<div class="flex items-center gap-4 ">
<p class="text-gray-600 leading-relaxed">
          Connect with the people in your life and the world. 
          Secure and safe sharing your activity.
        </p>
</div>

   <!-- ACTION MENU -->
    <!-----  <div class="flex flex-col gap-6 text-black">
          <div class="flex items-center gap-3">
          </div>
      
          <div class="flex items-center gap-3">
           <Icon icon="uil:comment" class="w-10 h-10"/>
            <span class="text-xl font-semibold">Share</span>
          </div>
        </div>
--->
      </div>

      <!-- ACTION + STORY STACK -->
      <div class="relative items-center mt-10 p-2  ">
    <!-- CENTER STORY STACK -->
      <div class="relative   items-center w-[360px] h-[320px] mt-10 px-4 mr-80  p-2">
        <img
          v-for="(story, i) in stories"
          :key="i"
          :src="story.img"
          class="story-card"
          :style="{
            transform: `rotate(${story.rotate})`,
            left: story.left,
            zIndex: story.z
          }"/>
        </div>
      
  
</div>

</aside>

</div>



        
 


<!-- LOGIN FORM -->
<div class=" border-2   p-8 rounded-xl shadow-md w-full max-w-sm  mb-50">
       <!-- Email -->
<input
  type="text"
  placeholder="Email or Phone number"
  class="w-full mb-4 px-4 py-2 border-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
  v-model="email"
  autocomplete="off"
  name="login_email"
/>

<!-- Password -->
<input
  type="password"
  placeholder="Password"
  class="w-full mb-4 px-4 py-2 border-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
  v-model="password"
  autocomplete="new-password"
  name="login_password"
  readonly
  @focus="$event.target.removeAttribute('readonly')"/>

        <button
          class="w-full bg-blue-600 text-white 
          font-semibold py-2 rounded hover:bg-blue-700 mb-2"
          @click="login">
          Login
        </button>

        <router-link
          to="/forgot-password"
          class="text-sm text-center  text-gray-600 mb-4 block">
          Forgot your password ?
        </router-link>

        <hr class="mb-4" />

        <router-link to="/create" class="block">
          <button
            class="bg-blue-500 text-white  rounded-xl w-full
             py-2 rounded text-sm font-semibold hover:bg-gray-400">
            Create your account
          </button>
        </router-link>
        <!-- New Google Sign-In Button -->
<div class="flex justify-center mb-4 mt-4">
<GoogleSignInButton redirectAfter="ProfileUser" />
</div>


      </div>
    

      

    </div>

   
  </div>


  
</template>

<script>
import { Icon } from '@iconify/vue';
import story1 from '@/assets/Khmer.jpg'
import story2 from '@/assets/jena8.jpg'
import story3 from '@/assets/sinayun_xyn.jpg'
import GoogleSignInButton from '@/components/GoogleSignInButton.vue';

import { signInWithEmailAndPassword, } from 'firebase/auth'

import { auth } from '../firebase'




export default {
  name: 'Login',
   components:{
     Icon ,
   GoogleSignInButton,

   },

  data() {
    return {
      email: '',
      password: '',
      loading: false,
      showPassword: false,


      stories: [
        { img: story2, rotate: '-14deg', right: '70px', z: 2 },
        { img: story1, rotate: '12deg', left: '300px', z: 1},
      
        { img: story3, rotate: '-2deg', left: '168px', z: 1 }
      ]
    }
  },

 
  // THIS clears password on refresh / revisit login page
  mounted() {
    this.password = '';
  },


 
  methods: {
  async login() {
  if (this.loading) return

  if (!this.email || !this.password) {
    alert('Please enter both email and password.')
    return
  }

  this.loading = true

  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      this.email,
      this.password
    )

    // 🔐 Block unverified users
    if (!user.emailVerified) {
      alert('Please verify your email before logging in.')
      await signOut(auth)   // ✅ force logout
      return
    }

    this.password = ''
    this.$router.push('/feed')

  } catch (e) {
    alert(this.getErrorMessage(e.code))
  } finally {
    this.loading = false
  }
},

  async logout() {
  await signOut(auth)
  this.$router.push('/')
},

    getErrorMessage(code) {
      const messages = {
        'auth/user-not-found': 'Account not found.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/too-many-requests': 'Too many attempts. Try again later.'
      }
      return messages[code] || 'Login failed. Please try again.'
    }
  }
}

</script>




<style scoped>

.input {
  @apply w-full mb-3 px-3 py-2 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500;
}

.btn-primary {
  @apply w-full bg-blue-600 text-white py-2 rounded font-semibold;
}

.btn-success {
  @apply w-full bg-green-600 text-white py-2 rounded text-sm font-semibold;
}
.story-card:hover {
  transform: translateY(-8px) scale(1.05);
  z-index: 50;
}
.story-card {
  @apply absolute top-0
  w-[148px] h-[240px]
  rounded-2xl
  object-cover
  shadow-[0_20px_40px_rgba(0,0,0,0.78)]
  transition-transform duration-300 ease-out;
}

/* Hover animation */
.story-card:hover {
  transform: translateY(-8px) scale(1.05) rotate(var(--tw-rotate));
}

.story-card:hover {
  transform: translateY(-8px) scale(1.05);
}

</style>