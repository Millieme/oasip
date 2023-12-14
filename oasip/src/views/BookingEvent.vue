<script setup>
import { ref, onBeforeMount } from "vue";
import BookingForm from "../components/BookingForm.vue";
import { useRoute, useRouter } from "vue-router";
import { extend } from "dayjs";
const route = useRoute()
const router = useRouter()
const events = ref([]);

const eventCategories = ref([]);

const createNewEvent = async (data) => {
console.log(data)
 const timeBook =new Date(data.eventStartTime).toISOString();
 let formData = new FormData();
            formData.append("bookingEmail", data.bookingEmail);
            formData.append("bookingName", data.bookingName );
            formData.append("eventCategoryID", data.eventCategoryID.id);
            formData.append("eventNotes",data.eventNotes );
            formData.append("eventStartTime",timeBook );

console.log(...formData)
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/events`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body:formData ,
  });
  if (res.status === 200 || res.status === 201) {
    const addEvent = await res.json();
    console.log("Booked Successfully");
    alert("Booked Successfully");
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        router.push({ name: 'sch-events' });
      } else {
        router.push({ name: 'booking-event' });
      }
      createNewEvent()
  } else if (res.status === 401){
 refreshToken()
  } else {
    console.log(res.json());
    console.log("error, cannot create");
    alert("Cannot book, please check it again");
  }
};

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
    createNewEvent()
    }
}


// // getAllEvents
const getEventCategories = async () => {
  console.log("test");
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/eventcategorys`,
    {
      headers: {
        "content-type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
  if (res.status === 200) {
    eventCategories.value = await res.json();
    console.log(eventCategories);
  } else if (res.status === 401){
 refreshToken()
  } else if (res.status === 403){
 console.log('go to login')
 router.push({
          name: 'log-in',
        })
  } else {
    console.log("can not get values");
  }
};
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/events`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  if (res.status === 200) {
    events.value = await res.json();
  } else console.log("Error, cannot get data");
};

onBeforeMount(async () => {
  await getEventCategories();
  await getEvents();
});


</script>
<template>
  <body class="w-full bg-sky-100 dark:bg-sky-100 m-auto">
    <div class="p-20">
      <BookingForm
        :eventCategories="eventCategories"
        :events="events"
        @createEvent="createNewEvent"
      />
    </div>
  </body>
</template>
<style></style>