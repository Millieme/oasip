<script setup>
import { ref, onBeforeMount } from 'vue'
const activeMenu = 'Home'
const menus = ['Home', 'Delivery', 'Pricing', 'FAQs', 'Contact']
const sidebarOpen = ref(false)

const events = ref([])

// getAllEvents
// const getEvents = async () => {
//   const res = await fetch(
//     `${import.meta.env.VITE_APP_TITLE}/api/eventCategories`
//   )
//   if (res.status === 200) {
//     events.value = await res.json()
//   } else {
//     console.log('can not get values')
//   }
// }
// onBeforeMount(async () => {
//   await getEvents()
// })


</script>

<template>

  <div
    class="w-full min-h-screen bg-gradient-to-bl from-sky-200 via-rose-200 to-cyan-100 items-center justify-center"
  >
    <br />
    <br />
    <br />
    <div
      class="flex flex-wrap-reverse mt-20 gap-y-24 justify-between py-12 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24"
    >
      <div class="relative z-10 md:w-1/2 w-full">
        <span class="flex items-center px-1 text-xl text-green">
          <span class="font-medium">OASIP - KP6</span>
        </span>
        <h1
          class="pt-4 tracking-wide text-4xl sm:text-5xl lg:text-8xl font-bold tracking-tighter leading-tight whitespace-nowrap dark:text-black"
        >
          APPOINTMENT<br />
          BOOKING <br />
          <span class="whitespace-nowrap text-green">CLINIC </span>
        </h1>
        <p
          class="pt-8 sm:text-lg font-prompt max-w-md text-gray-600 leading-relaxed"
        >
          เว็บไซต์การนัดหมาย
        </p>
        <div class="flex pt-8 space-x-4 sm:space-x-6">
          <router-link :to="{ name: 'log-in' }"
            ><button
              class="flex justify-center items-center w-full sm:w-auto h-13 px-8 bg-pink-700 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300"
            >
              Login
            </button></router-link
          >
          <router-link :to="{ name: 'booking-event' }"
            ><button
              class="flex justify-center items-center w-full sm:w-auto h-13 px-8 bg-purple-700 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300"
            >
              Booking
            </button></router-link
          >
        </div>
      </div>
      <div class="relative md:w-1/2 w-full flex flex-col justify-between">
        <img
          class="w-96 lg:w-full drop-shadow-2xl self-center lg:self-end"
          src="/02-3.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style></style>
