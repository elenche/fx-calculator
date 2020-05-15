import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RatesService } from '../../services/rates.service';
import { CurrencyModel } from '../../models/currency.model';

@Component({
	selector: 'app-currency-list',
	templateUrl: './currency-list.component.html',
	styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent {

	currencies: CurrencyModel[];

	constructor(public ratesService: RatesService,
		private popoverCtrl: PopoverController) {

		this.initializeItems();
	}

	private initializeItems() {
		this.currencies = Object.assign(new Array<CurrencyModel>(), this.ratesService.currencies);
	}

	/**
	 * Filter for items that match the search term by currency name or code.
	 * @param event - search event
	 */
	getItems(event: any) {
		this.initializeItems();

		const value: string = event.target.value;

		if (value && value.trim() !== '') {
			this.currencies = this.currencies.filter(item => {
				return (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1) || item.code.toLowerCase().indexOf(value.toLowerCase()) > -1;
			});
		}
	}

	selectItem(currency) {
		this.popoverCtrl.dismiss(currency);
	}
}
