import { NgModule } from '@angular/core';
import { CurrencyListComponent } from './currency-list.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		CurrencyListComponent
	],
	imports: [
		IonicModule,
		CommonModule,
		RouterModule.forChild([{
			path: 'currency-list',
			component: CurrencyListComponent
		}]),
	]
})
export class CurrencyListComponentModule { }