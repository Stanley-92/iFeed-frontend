<script>
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default {
  data() {
    return {
      email: ''
    };
  },
  methods: {
    async resetPassword() {
      if (!this.email) {
        alert('Please enter your email address.');
        return;
      }

      try {
        await sendPasswordResetEmail(auth, this.email);
        alert('Password reset email sent! Please check your inbox.');
        this.$router.push('/');
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>

