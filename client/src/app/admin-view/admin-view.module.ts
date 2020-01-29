import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MaterialModule } from '../material.module';
import { AdminViewRoutingModule } from './admin-view-routing.module';
import { AdminViewComponent } from './admin-view.component';

@NgModule({
   declarations: [
    AdminViewComponent
   ],
   imports: [
     CommonModule,
     ReactiveFormsModule,
     NgxChartsModule,
     AdminViewRoutingModule
   ]
})
export class AdminViewModule { }
