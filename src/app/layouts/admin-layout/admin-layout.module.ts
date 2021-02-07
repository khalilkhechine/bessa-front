import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BabyCreateComponent} from '../../pages/baby/baby-create/baby-create.component';
import {BabyListComponent} from '../../pages/baby/baby-list/baby-list.component';
import {CreateBabyInformationComponent} from '../../pages/baby-information/create-baby-information/create-baby-information.component';
import {BabyBottleComponent} from '../../pages/baby-information/baby-bottle/baby-bottle.component';
import {DiaperComponent} from '../../pages/baby-information/diaper/diaper.component';
import {VaccineComponent} from '../../pages/baby-information/vaccine/vaccine.component';
import {GrowthComponent} from '../../pages/baby-information/growth/growth.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    BabyCreateComponent,
    BabyListComponent,
    CreateBabyInformationComponent,
    BabyBottleComponent,
    DiaperComponent,
    VaccineComponent,
    GrowthComponent,
  ]
})

export class AdminLayoutModule {}
