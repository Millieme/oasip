<script setup>
import { computed, onBeforeMount, ref, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";

const getDetails = ref({});
// const events = ref([])
const router = useRouter();
const route = useRoute();
const maxCountNotes = 500;
const minCount = 0;

// ตัวแปรเก็บ object
const notes = ref("");
const startTime = ref("");

const goBack = () => router.go(-1);
const currentTime = dayjs().format("YYYY-MM-DDTHH:mm");

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
      getDetails.value = data;
      notes.value = getDetails.value.eventNotes;
      startTime.value = new Date(getDetails.value.eventStartTime);
    } else if (res.status === 401) {
      refreshToken();
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
    } else {
      console.log("cannot get values");
      console.error("Error:", res.status, res.statusText);
    }
  }
};

const refreshToken = async () => {
  console.log(localStorage.getItem("refreshToken"));
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/refresh`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("refreshToken"),
    },
  });
  if (res.status === 200) {
    const token = await res.json();
    localStorage.setItem("refreshToken", token.refreshToken);
    localStorage.setItem("accessToken", token.accessToken);
    updateEvent();
  } else {
    console.log("cannot get values");
    console.error("Error:", res.status, res.statusText);
  }
};

onBeforeMount(async () => {
  await getEventById();
});

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อทำ method put และถ้าติดต่อไม่ได้ให้แสดง error
const updateEvent = async (id) => {
  try {
    let formData = new FormData();
    formData.append("eventNotes", notes.value);
    formData.append(
      "eventStartTime",
      startTime.value === undefined
        ? getDetails.value.eventStartTime
        : new Date(startTime.value).toISOString()
    );

    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/events/${id}`,
      {
        method: "PUT",
        mode: 'cors',
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: formData,
      }
    );

    if (res.ok) {
      console.log("Updated successfully");
      alert("Updated successfully");
      router.go(-1);
    } else {
      const errorData = await res.json();
      console.error("Error:", res.status, res.statusText, errorData);
      alert("Failed to update booking");
    }
  } catch (error) {
    console.error("Failed to fetch:", error);
    alert("Failed to update booking");
  }
};

</script>

<template>
  <div>
    <div class="card lg:card-side bg-base-100 shadow-xl m-auto p-20 w-7/12">
      <form class="leading-loose flex font-kanit flex-col gap-3 w-[100%]">
        <div>
          <h2 class="font-bold text-2xl">Edit event form</h2>
          <ul class="text-x">
            <li>
              <span class="font-bold">Name :</span> {{ getDetails.bookingName }}
            </li>
            <li>
              <span class="font-bold">Email :</span>
              {{ getDetails.bookingEmail }}
            </li>
            <li>
              <span class="font-bold">Clinic :</span>
              {{ getDetails.eventCategory }}
            </li>
            <li></li>
          </ul>

          <div>
            <p class="font-bold">Note :</p>
            <textarea
              v-model="notes"
              placeholder=" Input your notes"
              cols="5"
              rows="5"
              :maxlength="maxCountNotes"
              :minlength="minCount"
              class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
            ></textarea>
            <span class="text-xs ml-[95%] text-gray-400"
              >{{ notes ? minCount + notes.length : 0 }}/{{
                maxCountNotes
              }}</span
            >
          </div>
          <label for="meeting-time"
            ><p class="font-bold after:ml-0.5 after:text-red-500">
              Choose a time for your appointment :
            </p></label
          >
          <input
            v-model="startTime"
            type="datetime-local"
            id="meeting-time"
            :min="currentTime"
            max="2025-06-14T00:00"
          />
        </div>

        <button
          class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5"
          @click="updateEvent(getDetails.bookingId)"
        >
          Update
        </button>
        <button class="btn" @click="goBack">Cancel</button>
      </form>
    </div>
  </div>
</template>

<style></style>
