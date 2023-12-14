<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
  const checkLogin = localStorage.getItem("accessToken");
  if (checkLogin) {
    router.push({
      name: "home",
    });
  }
});

const login = async () => {
  const data = {
    email: email.value,
    password: password.value,
  };
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status === 200) {
    const token = await res.json();
    localStorage.setItem("refreshToken", token.refreshToken);
    localStorage.setItem("accessToken", token.accessToken);
    console.log(token.accessToken);
    console.log(token);
    alert("Login successful!");
    console.log("login successfully");

    location.reload();
  } else if (res.status === 401) {
    alert("Password Incorrect");
    console.log(res.status);
  } else if (res.status === 403) {
    console.log("go to login");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push({
      name: "log-in",
    });
  } else if (res.status === 404) {
    router.push({
      name: "notfound",
    });
    console.log(res.status);
  } else {
    console.log("Error, something went wrong");
    console.error("Error:", res.status, res.statusText);
  }
};

const email = ref("");
const password = ref("");
</script>
<template>
  <div
    class="w-full p-60 min-h-screen bg-gradient-to-bl from-sky-200 via-rose-200 to-cyan-100 items-center justify-center"
  >
    <div class="card lg:card-side bg-base-100 shadow-xl m-auto p-10 w-80">
      <form class="bg-white">
        <h2 class="font-bold text-2xl">Login</h2>
        <br />
        <span>E-mail</span>
        <input
          type="email"
          v-model="email"
          placeholder="   Email"
          required
          class="peer bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-full"
        />

        <span>password</span>
        <input
          type="password"
          v-model.trim="password"
          placeholder="   Password"
          required
          class="peer bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-full"
        />
        <br /><br />
        <button
          class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5"
          type="submit"
          @click="login"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

