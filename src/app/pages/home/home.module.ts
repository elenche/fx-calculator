import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CurrencyListComponentModule } from '../../popovers/currency-list/currency-list.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		HomePageRoutingModule,
		CurrencyListComponentModule
	],
	declarations: [HomePage]
})
export class HomePageModule { }
