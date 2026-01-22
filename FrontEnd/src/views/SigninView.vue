<script setup lang="ts">
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()

const email = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)

const login = async () => {
  error.value = ""
  loading.value = true

  try {
    const res = await axios.post("http://localhost:8080/auth/login", {
      email: email.value,
      password: password.value,
    })

    // Save JWT
    localStorage.setItem("token", res.data.token)

    router.push("/dashboard") // redirect to home
  } catch (err: any) {
    error.value = err.response?.data?.message || "Login failed"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Sign In</h1>

    <form @submit.prevent="login">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? "Signing in..." : "Sign In" }}
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
