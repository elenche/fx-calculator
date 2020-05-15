import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { CurrencyModel } from '../models/currency.model';

@Injectable({
	providedIn: 'root'
})
export class RatesService {

	currencies: CurrencyModel[];
	latestRates: any;
	currentRate: number;

	constructor(private httpService: HttpService) {
	}

	/**
	 * Get exchange rates quoted against a base.
	 * @param base - base currency
	 */
	getRatesByBase(base: string = 'EUR') {
		return this.httpService.get('https://api.exchangeratesapi.io/latest?base=' + base).pipe(map((response) => {
			this.latestRates = response;
			console.log('Rates: ', response);
			return response;
		}));
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

	getCurrency(code: string): CurrencyModel {
		return this.currencies.find(x => x.code === code);
	}

	getRate(code: string): number {
		const num = 10000; // Round to 4 decimal spaces
		return Math.round(this.latestRates.rates[code] * num) / num;
	}
}
