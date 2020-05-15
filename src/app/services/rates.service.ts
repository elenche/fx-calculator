import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { CurrencyModel } from '../models/currency.model';

@Injectable({
	providedIn: 'root'
})
export class RatesService {

	currentRateList: any;
	currentRate: number;

	currencies: CurrencyModel[] = [
		new CurrencyModel('Euro', 'EUR', 'eu'),
		new CurrencyModel('United States Dollar', 'USD', 'us'),
		new CurrencyModel('British Pound', 'GBP', 'gb'),
		new CurrencyModel('Australian Dollar', 'AUD', 'au'),
		new CurrencyModel('Swiss Franc', 'CHF', 'ch'),
		new CurrencyModel('Canadian Dollar', 'CAD', 'ca'),
		new CurrencyModel('Japanese Yen', 'JPY', 'jp'),
		new CurrencyModel('New Zealand Dollar', 'NZD', 'nz'),
	];

	constructor(private httpService: HttpService) {
	}

	/**
	 * Get exchange rates quoted against a base.
	 * @param base - base currency
	 */
	getRatesByBase(base: string = 'EUR') {
		return this.httpService.get('https://api.exchangeratesapi.io/latest?base=' + base).pipe(map((response) => {
			this.currentRateList = response;
			return response;
		}));
	}

	/**
	 * Get the currency matching the code.
	 * @param code - currency code
	 */
	getCurrency(code: string): CurrencyModel {
		return this.currencies.find(x => x.code === code);
	}

	/**
	 * Get the exchange rate for the currency matching the code against the current base currency.
	 * @param code - currency code
	 */
	getRate(code: string): number {
		const num = 10000; // Round to 4 decimal spaces
		return Math.round(this.currentRateList.rates[code] * num) / num;
	}
}
