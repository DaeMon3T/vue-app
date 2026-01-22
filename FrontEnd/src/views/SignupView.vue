<script setup lang="ts">
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()

const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const error = ref("")
const loading = ref(false)

const register = async () => {
  error.value = ""

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match"
    return
  }

  loading.value = true

  try {
    await axios.post("http://localhost:8080/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    })

    router.push("/signin")
  } catch (err: any) {
    error.value = err.response?.data?.message || "Registration failed"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Sign Up</h1>

    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Full Name" required />

      <input v-model="email" type="email" placeholder="Email" required />

      <input v-model="password" type="password" placeholder="Password" required />

      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? "Creating account..." : "Sign Up" }}
      </button>

      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
}
input {
  width: 100%;
  margin-bottom: 1rem;
  padding: .75rem;
}
button {
  width: 100%;
  padding: .75rem;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
