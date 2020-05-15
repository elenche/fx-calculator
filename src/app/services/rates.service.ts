import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CurrencyModel } from '../models/currency.model';

@Injectable({
	providedIn: 'root'
})
export class RatesService {

	currencies: CurrencyModel[];

	constructor(private httpService: HttpService) {

	}

	/**
	 * Get exchange rates quoted against a base.
	 * @param base - base currency
	 */
	getRatesByBase(base: string = 'EUR') {
		return this.httpService.get('https://api.exchangeratesapi.io/latest?base=' + base).subscribe((response) => {
			console.log(response);
		});
	}

	setCurrencyList() {
		this.currencies = [
			new CurrencyModel('Euro', 'EUR', 'eu'),
			new CurrencyModel('United States Dollar', 'USD', 'us'),
			new CurrencyModel('British Pound', 'GBP', 'gb'),
			new CurrencyModel('Australian Dollar', 'AUD', 'au'),
			new CurrencyModel('Swiss Franc', 'CHF', 'ch'),
			new CurrencyModel('Canadian Dollar', 'CAD', 'ca'),
			new CurrencyModel('Japanese Yen', 'JPY', 'jp'),
			new CurrencyModel('New Zealand Dollar', 'NZD', 'nz'),
		];
	}
}
