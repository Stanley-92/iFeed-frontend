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
        <span v-if="isLoading">Creating Account...</span>
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
  signInWithPopup 
} from 'firebase/auth';

const provider = new GoogleAuthProvider();
// Optional: add scopes if needed later
// provider addScope('https://www.googleapis.com/auth/userinfo.profile');

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
        contact: '', // email
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

  methods: {
    goToMainfeed() {
      this.$router.push('/');
    },

    // Email/Password Signup (unchanged)
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
      if (Object.values(this.errors).some(err => err)) return;

      this.isLoading = true;

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.form.contact,
          this.form.password
        );
        const user = userCredential.user;
        const uid = user.uid;

        const profileData = {
          uid: uid,
          email: this.form.contact,
          firstName: this.form.firstName.trim(),
          lastName: this.form.lastName.trim(),
          fullName: `${this.form.firstName.trim()} ${this.form.lastName.trim()}`,
          dateOfBirth: `${this.form.dobYear}-${this.form.dobMonth}-${this.form.dobDay}`,
          gender: this.form.gender,
          createdAt: new Date().toISOString(),
          emailVerified: false,
          provider: 'email'
        };

        const response = await fetch('http://localhost/api/users/create-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || 'Failed to save profile data');
        }

        localStorage.setItem('userUid', uid);
        localStorage.setItem('userEmail', this.form.contact);

        this.$router.push({ name: 'ProfileUser' });

      } catch (error) {
        console.error('Signup error:', error);
        if (error.code === 'auth/email-already-in-use') {
          this.errors.contact = 'This email is already registered.';
        } else if (error.code === 'auth/weak-password') {
          this.errors.password = 'Password is too weak.';
        } else {
          this.errors.contact = error.message || 'Signup failed. Please try again.';
        }
      } finally {
        this.isLoading = false;
      }
    },

    // NEW: Google Sign-In
    async signInWithGoogle() {
      this.isLoading = true;
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const uid = user.uid;

        // Extract name from Google displayName
        let firstName = '';
        let lastName = '';
        if (user.displayName) {
          const parts = user.displayName.trim().split(' ');
          firstName = parts[0];
          lastName = parts.slice(1).join(' ') || '';
        }

        const profileData = {
          uid: uid,
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          fullName: user.displayName || '',
          photoURL: user.photoURL || '',
          dateOfBirth: '', // Google doesn't provide DOB
          gender: '',      // Google doesn't provide gender by default
          createdAt: new Date().toISOString(),
          emailVerified: user.emailVerified,
          provider: 'google'
        };

        // Save to your MongoDB backend
        const response = await fetch('http://localhost/api/users/create-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.warn('Profile save failed (non-critical):', errorData.message);
          // Continue anyway — user is already signed in
        }

        // Store session
        localStorage.setItem('userUid', uid);
        localStorage.setItem('userEmail', user.email);

        // Redirect
        this.$router.push({ name: 'ProfileUser' });

      } catch (error) {
        console.error('Google sign-in error:', error);
        if (error.code !== 'auth/popup-closed-by-user') {
          alert('Google sign-in failed. Please try again.');
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
<style scoped>
/* Optional: Add any custom styles here */
</style>