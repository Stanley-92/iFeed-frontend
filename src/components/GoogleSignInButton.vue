<template>
  <button @click="signInWithGoogle"
    class="relative flex items-center justify-center gap-4 px-4 
           py-2 mb-2 text-base font-medium text-gray-700 bg-gray-200 border-2 
           border-gray-300 rounded-full shadow-sm hover:shadow-md 
           hover:border-gray-400 focus:outline-none focus:ring-2 
           focus:ring-offset-2 focus:ring-blue-500 transition-shadow">
    <Icon icon="flat-color-icons:google" class="w-6 h-6" />
    <span>Connect with Google</span>
  </button>
  
</template>

<script>
import { Icon } from '@iconify/vue';
import { auth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect,
   getRedirectResult } from 'firebase/auth';

export default {
  name: 'GoogleSignInButton',
  components: { Icon },
  props: {
    redirectAfter: { type: String, default: 'ProfileUser' } // allow custom redirect page
  },
  data() {
    return { isLoading: false };
  },


  async mounted() {
    try {
      const result = await getRedirectResult(auth);
      if (result?.user) {
        await this.handleGoogleSuccess(result.user);
      }
    } catch (error) {
      console.error('Google redirect error:', error);
    }
  },


  methods: {
    async handleGoogleSuccess(user) {
      const displayName = user.displayName || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      const googleAvatar = user.photoURL || '';

      const userData = { firstName, lastName, email: user.email };

      // Save locally for profile display
      localStorage.setItem('newUserData', JSON.stringify(userData));
      localStorage.setItem('userUid', user.uid);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userDisplayName', displayName);
      localStorage.setItem('userAvatar', googleAvatar);

      // Redirect
      await this.$router.push({ name: this.redirectAfter });
    },




    async signInWithGoogle() {
      if (this.isLoading) return;
      this.isLoading = true;

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      try {
        const result = await signInWithPopup(auth, provider);
        if (result?.user) await this.handleGoogleSuccess(result.user);
      } catch (error) {
        if (error.code === 'auth/popup-blocked') {
          await signInWithRedirect(auth, provider);
        } else if (error.code !== 'auth/popup-closed-by-user') {
          console.error('Google sign-in error:', error);
          alert('Failed to connect Google account.');
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
