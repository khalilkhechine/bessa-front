import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {BabyListComponent} from '../../pages/baby/baby-list/baby-list.component';
import {BabyCreateComponent} from '../../pages/baby/baby-create/baby-create.component';
import {CreateBabyInformationComponent} from '../../pages/baby-information/create-baby-information/create-baby-information.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'baby',           component: BabyListComponent },
    { path: 'baby/create',      component: BabyCreateComponent },
    { path: 'baby-information',      component: CreateBabyInformationComponent }
];
