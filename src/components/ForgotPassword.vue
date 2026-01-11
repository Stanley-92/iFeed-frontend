<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Reset Password</h2>
      
      <p class="text-sm text-gray-600 mb-6">
        Enter your email address and we'll send you a link to reset your password. 
        If you signed up with Google, this will allow you to create a manual password.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        class="w-full mb-4 px-4 py-2 border-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
        v-model="email"
      />

      <button
        @click="sendResetEmail"
        :disabled="loading"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>

      <div class="mt-6 text-center">
        <router-link to="/" class="text-blue-600 hover:underline text-sm font-medium">
          Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      loading: false
    };
  },
  methods: {
    async sendResetEmail() {
      if (!this.email) {
        alert("Please enter your email address.");
        return;
      }

      this.loading = true;
      try {
        await sendPasswordResetEmail(auth, this.email);
        alert("Check your email! A password reset link has been sent.");
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>