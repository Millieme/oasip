<script setup>
import { ref, onBeforeMount } from 'vue'
import EventCard from '../components/EventCard.vue'

const events = ref([])

// getAllEvents

const getEvents = async () => {
  console.log('Bearer '+localStorage.getItem("accessToken"))
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/events`,{
      method: 'GET',
      headers: {
        'content-type': 'application/json',
       Authorization: 'Bearer '+localStorage.getItem("accessToken"),
    }
  })

  if (res.status === 200) {
    events.value = await res.json()
  } else if (res.status === 401){
 refreshToken()
  } else if (res.status === 403){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
 console.log('go to login')
 router.push({
          name: 'log-in',
        })
  }
   else {
    console.log('error')
  }
}
//403

const refreshToken = async () => {
console.log(localStorage.getItem("refreshToken"))
 const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/refresh`,{
      method: 'GET',
      headers: { 
        'content-type': 'application/json',
       Authorization: 'Bearer '+localStorage.getItem("refreshToken"),
    }
  })
 if (res.status === 200) {
    const token = await res.json();
    localStorage.setItem("refreshToken", token.refreshToken);
    localStorage.setItem("accessToken", token.accessToken);
    getEvents()
    }
}

onBeforeMount(async () => {
  await getEvents()
})
</script>

<template>
  <body class="w-full bg-sky-100 dark:bg-sky-100">
    <div class="px-30 py-10 mx-auto">
      <div class="text-2xl ml-20 font-bold dark:text-black mt-20">
        Scheduled Events
      </div>
    </div>
    <!-- Event empty -->
    <div v-if="events.length === 0">
      <p class="text-center text-lg mt-10">No Stray Animals</p>
    </div>
    <!--Show event -->
    <div class="flex px-20 grid grid-cols-3 content-center">
      <!-- ทำ loop card เรียกใช้จาก db -->
      <div v-for="event in events.content" :key="event">
         <EventCard :events="[event]" /> 
      </div>
    </div>
  </body>
</template>

<style></style>
