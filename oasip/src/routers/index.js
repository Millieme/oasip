import Home from '../views/Home.vue'
import BookingEvent from '../views/BookingEvent.vue'
import SchedEvents from '../views/ScheduledEvents.vue'
import EventDetail from '../views/EventDetail.vue'
import EditEvent from '../views/EditEvent.vue'
import EditCategory from '../views/EditCategory.vue'
import ClinicCategory from '../views/ClinicCategory.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue';
import { createRouter, createWebHashHistory } from 'vue-router'

const history = createWebHashHistory(import.meta.env.VITE_APP_TITLE)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/booking-event',
    name: 'booking-event',
    component: BookingEvent,
    meta: { requiresLecturer: true },
  },
  {
    path: '/sch-events',
    name: 'sch-events',
    component: SchedEvents,
  },
  {
    path: '/event-detail/:id',
    name: 'event-detail',
    component: EventDetail,
  },
  {
    path: '/edit-event/:id',
    name: 'edit-event',
    component: EditEvent,
    meta: { requiresLecturer: true },
  },
  {
    path: '/clinic-cat',
    name: 'clinic-cat',
    component: ClinicCategory,
  },
  {
    path: '/edit-cat',
    name: 'edit-cat',
    component: EditCategory,
  },
  {
    path: '/log-in',
    name: 'log-in',
    component: Login,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  },
  
]

const router = createRouter({ history, routes })

export default router

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const roleFromToken = accessToken ? JSON.parse(atob(accessToken.split('.')[1])).roles : null;

  console.log('to.meta.requiresLecturer:', to.meta.requiresLecturer);
  console.log('roleFromToken:', roleFromToken);

  if (to.meta.requiresLecturer && roleFromToken.toLowerCase() === 'lecturer') {
    console.log('Redirecting to notfound');
    next({ name: 'notfound' });
  } else {
    console.log('Allowing access');
    next();
  }
});


