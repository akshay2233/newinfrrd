import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/Modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransportComponent } from './transport.component';
import { AddrideComponent } from './addride/addride.component';
import { PickrideComponent } from './pickride/pickride.component';
import { DetailsComponent } from './details/details.component';

const routes = [
  {
    path: '',
    component: TransportComponent,
  }
];

@NgModule({
  declarations: [
    TransportComponent,
    AddrideComponent,
    PickrideComponent,
    DetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule
  ],
  entryComponents: [AddrideComponent, PickrideComponent, DetailsComponent],

})
export class TransportModule { }
