<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
console.clear();

const router = useRouter();

defineProps({
  eventcategorys: {
    type: Array,
    required: true,
  },
});

const eventcategorys = ref([]);

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อรับค่า event categories และถ้าติดต่อไม่ได้ให้แสดง error
const getEventCategorys = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/eventcategorys`
  );
  if (res.status === 200) {
    eventcategorys.value = await res.json();
  } else {
    if (res.status === 404) {
      console.error("Error: Post not found");
      router.push({
        name: "notfound",
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
};
onBeforeMount(async () => {
  await getEventCategorys();
});

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อใช้ method PUT ในการ update event categories
const editEventCategory = async (updateEventCategory) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/eventcategorys/${
      updateEventCategory.id
    }`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        eventCategoryDescription: updateCat.desc,
        eventDuration: updateCat.duration,
      }),
    }
  );
};

const editCat = (id) => {
  router.push({
    name: "edit-cat",
    query: { id: id },
  });
};
</script>

<template>
  <div>
    <div class="card p-10 w-full">
      <div
        class="card lg:card-side bg-base-100 shadow-xl m-auto p-10 w-10/12 mt-20"
      >
        <div class="overflow-x-auto">
          <div
            class="p-5 rounded-lg text-center text-2xl font-bold dark:bg-white dark:text-black"
          >
            Category list
          </div>
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Clinic Name</th>
                <th>Duration</th>
                <th class="w-20">Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- ใช้ v-for เพื่อ loop ข้อมูลของแต่ละ event category ออกมา -->
              <tr
                v-for="eventcategory in eventcategorys"
                :key="eventcategory"
                :eventcategorys="eventcategory"
              >
                <!-- v-text เพื่อ show ข้อมูลที่กำหนด -->
                <td>{{ eventcategory.eventCategoryID }}</td>
                <td>{{ eventcategory.eventCategoryName }}</td>
                <td>{{ eventcategory.eventDuration }} mins</td>
                <td v-if="eventcategory.eventCategoryDescription == null">-</td>
                <td v-else class="font-kanit">
                  {{ eventcategory.eventCategoryDescription }}
                </td>
                <td>
                  <label
                    for="edit-modal"
                    class="btn btn-ghost btn-circle"
                    @click="editCat(eventcategory.eventCategoryID)"
                  >
                    <img src="/edit-icon.ico" class="h-5 w-5" />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
