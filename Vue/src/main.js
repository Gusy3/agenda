import {createApp} from 'vue';
import App from './App.vue';
import {createRouter, createWebHistory} from 'vue-router';

// COMPONENTES
import HomeComponent from './components/Home.vue';
import ContactsComponent from './components/Contacts.vue';
import ContactComponent from './components/Contact.vue';
import NewContactComponent from './components/NewContact.vue';
import EditContactComponent from './components/EditContact.vue';
import SearchComponent from './components/Search.vue';
import NotFoundComponent from './components/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: HomeComponent},
        {path: '/home', component: HomeComponent},
        {path: '/contactos', component: ContactsComponent},
        {path: '/contacto/:id', name: 'contacto', component: ContactComponent},
        {path: '/nuevo-contacto', component: NewContactComponent},
        {path: '/contacto/editar/:id', name: 'editar', component: EditContactComponent},
        {path: '/buscar', component: SearchComponent},
        {path: '/:pathMatch(.*)*', component: NotFoundComponent}
    ]
});

createApp(App).use(router).mount('#app');
