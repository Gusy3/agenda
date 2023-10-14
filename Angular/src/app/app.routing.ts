// Importar los módulos del router de angular
import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

// Importar componentes a los cuales les quiero hacer una pagina exclusiva
import { HomeComponent } from "./components/home/home.component";
import { ContactsComponent } from "./components/contacts/contacts.component";
import { ContactComponent } from "./components/contact/contact.component";
import { NewContactComponent } from "./components/new-contact/new-contact.component";
import { EditContactComponent } from "./components/edit-contact/edit-contact.component";
import { ErrorComponent } from "./components/error/error.component";
import { SearchComponent } from "./components/search/search.component";

// Array de rutas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'contactos', component: ContactsComponent},
    {path: 'contacto/:id', component: ContactComponent},
    {path: 'nuevo-contacto', component: NewContactComponent},
    {path: 'contacto/editar/:id', component: EditContactComponent},
    {path: 'buscar', component: SearchComponent},
    {path: '**', component: ErrorComponent}
];

// Exportar el módulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);