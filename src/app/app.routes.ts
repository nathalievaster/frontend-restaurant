import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookingComponent } from './pages/booking/booking.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'booking', component: BookingComponent},
    { path: 'menu', component: MenuComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '404', component: NotfoundComponent},
    { path: '**', component: NotfoundComponent}
];
