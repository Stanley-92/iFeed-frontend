<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center ">

  
<div class="w-full max-w-md bg-white p-8 rounded-md    
    bg-gray p-8 rounded-xl shadow-md
     w-full max-w-sm border-2 mb-50
     shadow-md text-center border ">
     <!---Box Create Acc-->

      <!-- Back to Main Feed Button (optional) -->
   
<div class=" w-65 hidden md:block max-w-full">
<button class=" flex-1 items-center pl-3 cursor-pointer ">
<Icon icon="tdesign:chat-bubble" 
class="w-14 h-14 text-white transition-colors bg-green-500
 border-4 border-green-500 rounded-xl duration-200 hover:text-gray-600 mb-10" 

 @click="goToMainfeed"/>
</button>

<!-- Connect with Gmail-->
<div class="flex justify-center">
  <button @click="signInWithGoogle"
    class="relative flex items-center justify-center gap-4 px-4 
    py-2 mb-2 text-base font-medium text-gray-700 bg-gray-200 border-2 
    border-gray-300 rounded-full  shadow-sm hover:shadow-md 
    hover:border-gray-400 focus:outline-none focus:ring-2 
    focus:ring-offset-2 focus:ring-blue-500 transition-shadow">
    <Icon icon="flat-color-icons:google" class="w-6 h-6" />
    <span>Connect with Google</span>
  </button>
</div>
<!----->
      </div>

      <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">Create a new account</h2>

      <!-- First + Last Name -->
      <div class="flex gap-3 mb-3">
        <input v-model.trim="form.firstName" type="text" placeholder="First name"
          class="w-1/2 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm" />
        <input v-model.trim="form.lastName" type="text" placeholder="Last name"
          class="w-1/2 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm" />
      </div>
      <p v-if="errors.name" class="text-red-500 text-xs mb-3 -mt-2">{{ errors.name }}</p>

      <!-- Date of Birth -->
      <div class="text-left text-sm font-medium text-gray-600 mb-2">Date of Birth</div>
      <div class="flex gap-3 mb-3">
        <select v-model="form.dobDay"
          class="w-1/3 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm">
          <option value="" disabled>Day</option>
          <option v-for="d in 31" :key="d" :value="String(d).padStart(2, '0')">{{ d }}</option>
        </select>
        <select v-model="form.dobMonth"
          class="w-1/3 px-4 py-2 border-2 border-gray-300 
          rounded-lg focus:outline-none focus:border-blue-500 text-sm">
          <option value="" disabled>Month</option>
          <option v-for="m in 12" :key="m" :value="String(m).padStart(2, '0')">{{ m }}</option>
        </select>
        <select v-model="form.dobYear"
          class="w-1/3 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm">
          <option value="" disabled>Year</option>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
      <p v-if="errors.dob" class="text-red-500 text-xs mb-3 -mt-2">{{ errors.dob }}</p>

      <!-- Gender -->
      <div class="text-left text-sm font-medium text-gray-600 mb-2">Gender</div>
      <div class="flex gap-3 mb-3">
        <button v-for="g in ['Female', 'Male', 'Other']" :key="g" @click="form.gender = g"
          :class="[
            'flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition',
            form.gender === g
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-300 hover:border-gray-400'
          ]">
          {{ g }}
        </button>
      </div>
      <p v-if="errors.gender" class="text-red-500 text-xs mb-3 -mt-2">{{ errors.gender }}</p>

      <!-- Email -->
      <input v-model.trim="form.contact" type="text" placeholder="Email address"
        class="w-full px-2 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-3 text-sm" />
      <p v-if="errors.contact" class="text-red-500 text-xs mb-3 -mt-2">{{ errors.contact }}</p>

      <!-- Password -->
      <input v-model="form.password" type="password" placeholder="Create password "
        class="w-full px-2 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4 text-sm" />
      <p v-if="errors.password" class="text-red-500 text-xs mb-4 -mt-3">{{ errors.password }}</p>

      <!-- Submit Button with Loading -->
      <button @click="handleSubmit" :disabled="isLoading"
        class="w-full py-2 bg-blue-600 text-white font-semibold 
        text-sm rounded-xl hover:bg-blue-400 disabled:bg-blue-400 
        disabled:cursor-not-allowed transition flex items-center justify-center">
        <span v-if="isLoading">
        Creating Account...</span>
        <span v-else>Create Your Account</span>
      </button>

    </div>
  </div>
</template>




<script>
import { Icon } from '@iconify/vue';
import { auth } from '@/firebase';


import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';

export default {
  name: 'CreateAccount',
  components: { Icon },

  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        gender: '',
        contact: '',
        password: ''
      },
      errors: {
        name: '',
        dob: '',
        gender: '',
        contact: '',
        password: ''
      },
      isLoading: false,
      years: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
    };
  },

  computed: {
    apiBase() {
      return import.meta.env.VITE_API_URL || 'http://localhost:3000';
    }
  },

  async mounted() {
    // Only handles the result if the user was redirected back from Google
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


    // GOOGLE SIGN-IN SUCCESS HANDLER
    async handleGoogleSuccess(user) {
      
      // Define variables from the user object first
      const displayName = user.displayName || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      const googleAvatar = user.photoURL || '';
      const photoURL = user.photoURL || ''; // <--- Get the Gmail photo
    

      // Prepare local storage data for ProfileUser.vue
      const userData = {
        firstName,
        lastName,
        email: user.email
    
      };

      const profileData = {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        fullName: displayName,
        photoURL: user.photoURL || '',
        provider: 'google',
        createdAt: new Date().toISOString()
      };

      try {
        // Sync with your backend API
        await fetch(`${this.apiBase}/api/users/create-profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });
      } catch (e) {
        console.warn('Backend sync failed, proceeding to profile anyway:', e.message);
      }

      // Store data locally so ProfileUser.vue can display the name immediately
      localStorage.setItem('newUserData', JSON.stringify(userData));
      localStorage.setItem('userUid', user.uid);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userDisplayName', displayName);
      localStorage.setItem('userAvatar', googleAvatar); // Save avatar URL here
      localStorage.setItem('userAvatar', photoURL);

      // Final Redirect to the Profile page
      await this.$router.push({ name: 'ProfileUser' });
    },




    // GOOGLE SIGN-IN TRIGGER
    async signInWithGoogle() {
      if (this.isLoading) return; // Prevent double-execution if user clicks twice
      
      this.isLoading = true;
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({ prompt: 'select_account' });

   try {
  const result = await signInWithPopup(auth, provider);
  if (result?.user) {
    await this.handleGoogleSuccess(result.user);
  }
} catch (error) {
  // Handle 2-Step Verification requirements or blocked popups
  if (error.code === 'auth/multi-factor-auth-required') {

    // This happens if you've enabled mandatory MFA in the Firebase Console
    this.errors.contact = "2-Step Verification is required for this account.";

    // You would typically redirect to a specific MFA verification component here
  } else if (error.code === 'auth/popup-blocked') {

    await signInWithRedirect(auth, provider);
  } else if (error.code !== 'auth/popup-closed-by-user') {
    console.error('Google sign-in error:', error);
    this.errors.contact = "Failed to connect Google account.";
  }
      } finally {
        this.isLoading = false;
      }
    },



    // EMAIL + PASSWORD SIGN-UP (Existing Logic)
    async handleSubmit() {
      this.errors = { name: '', dob: '', gender: '', contact: '', password: '' };

      if (!this.form.firstName.trim() || !this.form.lastName.trim()) {
        this.errors.name = 'First and last name are required.';
      }
      if (!this.form.dobDay || !this.form.dobMonth || !this.form.dobYear) {
        this.errors.dob = 'Please select your full date of birth.';
      }
      if (!this.form.gender) {
        this.errors.gender = 'Please select your gender.';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.contact || !emailRegex.test(this.form.contact)) {
        this.errors.contact = 'Please enter a valid email address.';
      }
      if (!this.form.password || this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters.';
      }

      if (Object.values(this.errors).some(e => e)) return;

      this.isLoading = true;

      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          this.form.contact,
          this.form.password
        );

        const userData = {
          firstName: this.form.firstName.trim(),
          lastName: this.form.lastName.trim(),
          email: this.form.contact
        };

        const profileData = {
          uid: user.uid,
          email: this.form.contact,
          firstName: userData.firstName,
          lastName: userData.lastName,
          fullName: `${userData.firstName} ${userData.lastName}`,
          dateOfBirth: `${this.form.dobYear}-${this.form.dobMonth}-${this.form.dobDay}`,
          gender: this.form.gender,
          provider: 'email',
          createdAt: new Date().toISOString()
        };

        await fetch(`${this.apiBase}/api/users/create-profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });

        localStorage.setItem('newUserData', JSON.stringify(userData));
        localStorage.setItem('userUid', user.uid);
        localStorage.setItem('userEmail', this.form.contact);

        await this.$router.push({ name: 'ProfileUser' });

      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.errors.contact = 'This email is already registered.';
        } else {
          this.errors.contact = error.message;
        }
      } finally {
        this.isLoading = false;
      }
    },

    goToMainfeed() {
      this.$router.push({ name: 'Mainfeed' });
    }
  }
};
</script>





<style scoped>
/* Optional: Add any custom styles here */
</style>