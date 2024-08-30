import {createRouter, createWebHistory} from "vue-router";
import PublicView from "../View/PublicView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/public',
            name: 'public',
            component: PublicView
        }
    ]
})