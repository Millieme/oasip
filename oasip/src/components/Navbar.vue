<script setup>
import { ref } from "@vue/reactivity";
 import { watch } from 'vue';

import { onBeforeMount } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

let checkLogin = ref(localStorage.getItem('accessToken'))     
const roleFromToken = ref('');

onBeforeMount(() => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const tokenData = JSON.parse(atob(accessToken.split(".")[1]));
    roleFromToken.value = tokenData.roles;
  }
});

const logOut = () => {
  if (confirm("Log out?")) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
     location.reload();
  }

};


</script>

<template>
  <div class="navbar bg-inherit fixed z-50">
    <!-- <nav class="flex justify-between items-center py-8 px-6 mx-auto max-w-screen-xl md:px-12 lg:px-16 xl:px-24"> -->
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link :to="{ name: 'home' }">
        <a class="flex items-center">
          <span
            class="self-center text-3xl text-black font-bold whitespace-nowrap dark:text-white"
            >never<span class="text-purple-400">giveup</span></span
          >
        </a>
      </router-link>
      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-base xs:text-base sm:text-base md:text-xl lg:text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li>
            <router-link :to="{ name: 'home' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Home</a
              >
            </router-link>
          </li>
          <li v-if="checkLogin">
            <router-link :to="{ name: 'sch-events' }">
              <a class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white">
                Scheduled Events
              </a>
            </router-link>
          </li>
          <li v-if="roleFromToken !== 'Lecturer'">
            <router-link :to="{ name: 'booking-event' }">
              <a
                class="mt-3 ctext-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Booking</a
              >
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'clinic-cat' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Clinic Category</a
              >
            </router-link>
          </li>
       
          <li v-if="checkLogin">
            <button
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                @click="logOut">
                Logout</button
              >
          </li>
             <li v-else> 
            <router-link :to="{ name: 'log-in' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Login</a
              >
            </router-link>
          </li>
          <li tabindex="0" class="btn btn-ghost btn-circle avatar block md:p-0">     
              <div class="rounded-full">
                <img src="/02-3.png" />
              </div>
          </li>
    
        </ul>
      </div>
    </div>
  </div>
</template>
