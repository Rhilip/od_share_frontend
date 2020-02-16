import Search from "@/components/Search.vue";
import Status from "@/components/Status.vue";
import Item from "@/components/Item.vue";


const routes = [
  { path: '/items/:uuid' , name: 'item_details', component: Item },
  { path: '/status', component: Status },
  { path: '*', component: Search}
];

export default routes;