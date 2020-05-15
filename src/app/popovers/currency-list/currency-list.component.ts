import { Component } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { RatesService } from '../../services/rates.service';
import { CurrencyModel } from '../../models/currency.model';

@Component({
	selector: 'app-currency-list',
	templateUrl: './currency-list.component.html',
	styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent {

	currencies: CurrencyModel[];
	excludeCodes: string[];
	constructor(public ratesService: RatesService,
		private popoverCtrl: PopoverController,
		private navParams: NavParams) {

		this.excludeCodes = this.navParams.get('ExcludeCodes');
		this.initializeItems();
	}

	/**
	 * Initialize 'currencies' list without the exclusion codes.
	 */
	private initializeItems() {
		this.currencies = Object.assign(new Array<CurrencyModel>(), this.ratesService.currencies.filter(x => !this.excludeCodes.find(y => y === x.code)));
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
				return (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) || item.code.toLowerCase().indexOf(value.toLowerCase()) > -1;
			});
		}
	}

	selectItem(currency) {
		this.popoverCtrl.dismiss(currency);
	}
}
