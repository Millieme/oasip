<script setup>
import { computed, onBeforeMount, ref, defineProps, defineEmits, defineAsyncComponent } from 'vue';
import dayjs from 'dayjs';

defineEmits(['createEvent']);

const eventCategoryID = ref('');
const currentTime = dayjs().format('YYYY-MM-DDTHH:mm');
const maxCountName = 100;
const minCount = 0;
const name = ref('');
const maxCountNotes = 500;
const notes = ref('');
const emailFromToken = ref('');
const accessToken = localStorage.getItem('accessToken');
  
onBeforeMount(async () => {
  // const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const tokenData = JSON.parse(atob(accessToken.split('.')[1]));
    emailFromToken.value = tokenData.sub;
    console.log("email",emailFromToken.value)
  }
});

const props = defineProps({
  events: {
    type: Array,
    default: [],
  },
  eventCategories: {
    type: Array,
    default: [],
  },
});

// const handleBooking = () => {
//   const bookingData = {
//     bookingName: name,
//     bookingEmail: emailFromToken || email,
//     eventStartTime: startTime.value,
//     eventDuration: eventCategoryID.eventDuration,
//     eventNotes: notes,
//     eventCategoryID: { id: eventCategoryID.id },
//   };

//   $emit('createEvent', bookingData);
// };
</script>

<template>
  <div class="card lg:card-side bg-base-100 shadow-xl m-auto p-20 w-7/12">
    <form class="leading-loose flex flex-col gap-3 w-[100%]">
      <div>
        <h2 class="font-bold text-2xl">Booking Form</h2>

        <p class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">
          Clinic :
        </p>
        <select v-model="eventCategoryID" class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] h-8 rounded-lg">
          <option disabled value="">Select Clinic</option>
          <option v-for="(eventCategory, index) in eventCategories" :key="index" :value="{ id: eventCategory.eventCategoryID, eventDuration: eventCategory.eventDuration }">
            {{ eventCategory.eventCategoryName }} ({{ eventCategory.eventDuration }} mins)
          </option>
        </select>

        <div>
          <p class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Name :</p>
          <input placeholder=" Input your name" v-model="name" :maxlength="maxCountName" :minlength="minCount" class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg" />
          <span class="text-xs ml-[95%] text-gray-400">{{ minCount + name.length }}/{{ maxCountName }}</span>
        </div>

        <div>
  <p class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Email :</p>

  <template v-if="accessToken">
    <div class="peer bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg p-2">
      {{ emailFromToken }}
    </div>
  </template>

  <template v-else>
  <input type="email" v-model="email" placeholder=" Input your email" class="peer bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg" />
  <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">Please provide a valid email address.</p>
</template>

</div>


        <div>
          <p class="font-bold">Note :</p>
          <textarea v-model="notes" placeholder=" Input your notes" :maxlength="maxCountNotes" :minlength="minCount" cols="5" rows="5" class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"></textarea>
          <span class="text-xs ml-[95%] text-gray-400">{{ minCount + notes.length }}/{{ maxCountNotes }}</span>
        </div>

        <label for="meeting-time">
          <p class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Choose a time for your appointment :</p>
        </label>
        <input class="rounded-lg" v-model="startTime" type="datetime-local" id="meeting-time" :min="currentTime" max="2025-05-08T00:00" />
      </div>
      <button
          class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5"
          @click="
            $emit('createEvent', {
              bookingName: name,
              bookingEmail: emailFromToken || email,
              eventStartTime: startTime,
              eventDuration: eventCategoryID.eventDuration,
              eventNotes: notes,
              eventCategoryID: { id: eventCategoryID.id },
            })
          "
        >Booking
        </button>    </form>
  </div>
</template>

<style></style>
