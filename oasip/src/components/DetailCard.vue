<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";

// const { params } = useRoute()
const route = useRoute();
const router = useRouter();
const getDetails = ref({});
const currenEvent = ref({});
const goBack = () => router.go(-1); // ให้กลับไปหน้าก่อนหน้า

const roleFromToken = ref('');

onBeforeMount(() => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const tokenData = JSON.parse(atob(accessToken.split(".")[1]));
    roleFromToken.value = tokenData.roles;
  }
});

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend และถ้าติดต่อไม่ได้ให้แสดง error
const getEventById = async (id) => {
  if (route.params.id) {
    const id = route.params.id;
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/events/${id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      getDetails.value = data;
    } else {
      if (res.status === 404) {
        console.error("Error: Post not found");
        router.push({
          name: "notfound",
        });
      } else if (res.status === 404) {
      console.log("404 not found");
      router.push({
        name: "notfound",
      });
    } else if (res.status === 400) {
      console.log("Bad Request");
      alert("400 Bad Request");
      router.push({
          name: "sch-events",
        });
      } else if (res.status === 403) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.log("go to login");
        router.push({
          name: "log-in",
        });
      } else if (res.status === 500) {
        console.error("Error: Internal Server Error");
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    }
  }
};
onBeforeMount(async () => {
  await getEventById();
});

// สร้างตัวแปร เพื่อเรียกใช้และส่งไปหน้าต่อไป ตาม id
const editEvent = (id) => {
  console.log(id);
  router.push({
    name: "edit-event",
    params: { id: id },
  });
};

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อลบข้อมูลตาม id โดยเมื้อลบสำเร็จให้กลับไปที่หน้าก่อนหน้า
const removeEvent = async () => {
  if (confirm("Would you like to cancel your appointment?")) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_TITLE}/api/events/${route.params.id}`,
        {
          method: "DELETE",
          // mode: "no-cors", 
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      if (res.status === 200) {
        const responseData = await res.json();
        console.log("Event deleted successfully:", responseData);
        router.push({
          name: "sch-events",
        });
      } else {
        console.error("Failed to delete event:", res.status, res.statusText);
      }
    } catch (error) { 
      console.error("Error deleting event:", error);
      router.push({
          name: "sch-events",
        });
    }
  } else {

  }
};

</script>

<template>
  <!-- {{ getDetails }} -->
  <div
    class="card card-side bg-base-100 font-kanit shadow-xl dark:border-gray-700 w-7/12 m-auto mt-20"
  >
    <figure><img class="w-96" src="/wall1.jpeg" alt="photo" /></figure>
    <div class="card-body p-20">
      <h2 class="card-title font-bold text-3xl">Event Detail</h2>
      <ul class="text-x">
        <li>
          <span class="font-bold">Name :</span> {{ getDetails.bookingName }}
        </li>
        <li>
          <span class="font-bold">Email :</span> {{ getDetails.bookingEmail }}
        </li>
        <li>
          <span class="font-bold"> Date :</span>
          {{ dayjs(getDetails.eventStartTime).format("DD MMM YYYY") }}
        </li>
        <li>
          <span class="font-bold"> Start Time :</span>
          {{ dayjs(getDetails.eventStartTime).format("HH:mm") }}
        </li>
        <li>
          <span class="font-bold">Duration :</span>
          {{ getDetails.eventDuration }} minutes
        </li>
        <li>
          <span class="font-bold">Category :</span>
          {{ getDetails.eventCategory }}
        </li>
        <li
          v-if="
            getDetails.eventNotes == undefined ||
            getDetails.eventNotes == null ||
            getDetails.eventNotes.length == 0
          "
        >
          <span class="font-bold">Note:</span> -
        </li>
        <li v-else>
          <span class="font-bold">Note:</span> {{ getDetails.eventNotes }}
        </li>
      </ul>
      &nbsp;
      <!-- v-on เพื่อ click แล้วไปทำ edit event func. -->
      <button v-if="roleFromToken !== 'Lecturer'"
        type="button"
        @click="editEvent(getDetails.bookingId)"
        class="bg-yellow-500 w-[100%] hover:bg-gray-400 rounded-lg text-white font-bold py-2 px-10 border-gray-700 hover:border-gray-500"
      >
        Edit
      </button>
      <!-- v-on เพื่อ click แล้วไปทำ remove event func. -->
      <button v-if="roleFromToken !== 'Lecturer'"
        type="button"
        @click="removeEvent"
        class="bg-red-700 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800"
      >
        Cancel
      </button>

      <!-- v-on เพื่อ click แล้วไปทำ go back func. -->
      <button class="btn" @click="goBack">Close</button>
    </div>
  </div>
</template>

<style></style>
