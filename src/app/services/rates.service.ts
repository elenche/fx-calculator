import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class RatesService {

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
}
