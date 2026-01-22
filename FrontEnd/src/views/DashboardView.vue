<script setup lang="ts">
import { onMounted, ref } from "vue"
import api from "../services/api"
import { useRouter } from "vue-router"

const router = useRouter()
const user = ref<any>(null)
const loading = ref(true)

const logout = () => {
  localStorage.removeItem("token")
  router.push("/signin")
}

onMounted(async () => {
  try {
    // Example protected endpoint
    const res = await api.get("/auth/me")
    user.value = res.data
  } catch (err) {
    // Token invalid or expired
    logout()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <p v-if="loading">Loading...</p>

    <div v-else>
      <p>Welcome, <strong>{{ user?.name }}</strong> 🎉</p>
      <p>Email: {{ user?.email }}</p>

      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: 80px auto;
  padding: 2rem;
}
button {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
}
</style>
