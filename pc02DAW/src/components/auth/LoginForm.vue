<template>
  <div class="login-container">
    <div class="login-card">

      <div class="login-header">
        <div class="neu-icon">
          <div class="icon-inner">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 
              14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 
              9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 
              18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#6c7293"/>
            </svg>
          </div>
        </div>
        <h2>Welcome Back</h2>
        <p>Please login to continue</p>
      </div>

      <!-- EMAIL -->
      <div class="form-group">
        <div class="neu-input">
          <span class="input-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 4H20V20H4V4Z" stroke="#9499b7" stroke-width="2"/>
              <path d="M4 4L12 13L20 4" stroke="#9499b7" stroke-width="2"/>
            </svg>
          </span>
          <input type="text" v-model="email" placeholder=" " />
          <label>Email</label>
        </div>
      </div>

      <!-- PASSWORD -->
      <div class="form-group password-group">
        <div class="neu-input">
          <span class="input-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M17 11H7V19H17V11Z" stroke="#9499b7" stroke-width="2"/>
              <path d="M12 15V17" stroke="#9499b7" stroke-width="2"/>
              <path d="M9 11V7C9 4.79 10.79 3 13 3C15.21 3 
              17 4.79 17 7V11" stroke="#9499b7" stroke-width="2"/>
            </svg>
          </span>

          <input type="password" v-model="password" placeholder=" " />
          <label>Password</label>
        </div>
      </div>

      <!-- ERROR BOX -->
      <div v-if="errorMessage" class="error-box">
        {{ errorMessage }}
      </div>

      <!-- LOGIN BUTTON -->
      <button class="neu-button" @click="login">
        <span class="btn-text">Login</span>
      </button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },

  watch: {
    email() {
      this.errorMessage = ''   // 👈 se limpia si escribe en email
    },
    password() {
      this.errorMessage = ''   // 👈 se limpia si escribe en password
    }
  },

  methods: {
    async login() {
      this.errorMessage = '' // limpia antes del intento

      const payload = {
        email: this.email,
        password: this.password,
      }

      try {
        const res = await this.$axios.post(
          'https://storedb-api.onrender.com/node-api/users/signin',
          payload,
          { headers: { 'Content-Type': 'application/json' } }
        )

        const token =
          res.data && (res.data.token || res.data.value || res.data.access_token)

        if (token) {
          localStorage.setItem('jwt', token)
          this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

          this.$router.push('/digimons')
        }

      } catch (err) {
        if (err.response?.data?.error) {
          this.errorMessage = err.response.data.error
        } else {
          this.errorMessage = 'Error desconocido al iniciar sesión'
        }
      }
    }
  }
}
</script>

<style scoped>

/* ERROR BOX */
.error-box {
  width: 100%;
  background: #ffdddd;
  border-left: 5px solid #ff3b5c;
  color: #b40024;
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow:
      inset 3px 3px 8px #ffb8c4,
      inset -3px -3px 8px #ffffff;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Neumorphism base styles (ya integrados, igual que antes) */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  width: 100%;
  max-width: 420px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: #e0e5ec;
  border-radius: 30px;
  padding: 50px 40px;
  box-shadow:
      20px 20px 60px #bec3cf,
      -20px -20px 60px #ffffff;
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.neu-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: #e0e5ec;
  border-radius: 50%;
  box-shadow:
      8px 8px 20px #bec3cf,
      -8px -8px 20px #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-header h2 {
  color: #3d4468;
  font-size: 2rem;
  font-weight: 600;
}

.login-header p {
  color: #9499b7;
  font-size: 15px;
}

.form-group {
  margin-bottom: 28px;
}

.neu-input {
  background: #e0e5ec;
  border-radius: 15px;
  position: relative;
  box-shadow:
      inset 8px 8px 16px #bec3cf,
      inset -8px -8px 16px #ffffff;
}

.neu-input input {
  width: 100%;
  padding: 20px 24px;
  padding-left: 55px;
  background: transparent;
  border: none;
  color: #3d4468;
  font-size: 16px;
  font-weight: 500;
  outline: none;
}

.neu-input label {
  position: absolute;
  left: 55px;
  top: 50%;
  transform: translateY(-50%);
  color: #9499b7;
  font-size: 15px;
  transition: all 0.3s ease;
}

.neu-input input:focus + label,
.neu-input input:not(:placeholder-shown) + label {
  top: 8px;
  font-size: 12px;
  color: #6c7293;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 20px;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  color: #9499b7;
}

.neu-button {
  width: 100%;
  background: #e0e5ec;
  border: none;
  border-radius: 15px;
  padding: 18px 32px;
  color: #3d4468;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  box-shadow:
      8px 8px 20px #bec3cf,
      -8px -8px 20px #ffffff;
  transition: all 0.3s ease;
}

.neu-button:hover {
  transform: translateY(-2px);
}

.neu-button:active {
  box-shadow:
      inset 4px 4px 10px #bec3cf,
      inset -4px -4px 10px #ffffff;
}

</style>
