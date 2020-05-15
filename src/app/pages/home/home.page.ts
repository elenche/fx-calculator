import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { RatesService } from '../../services/rates.service';
import { CurrencyModel } from '../../models/currency.model';
import { CurrencyListComponent } from '../../popovers/currency-list/currency-list.component';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	currencyFrom: CurrencyModel;
	currencyTo: CurrencyModel;

	form: FormGroup;
	isSwapped: boolean;
	currentRate: number;

	ngOnInit() {
		this.currencyFrom = this.ratesService.getCurrency('EUR');
		this.currencyTo = this.ratesService.getCurrency('USD')
		this.currentRate = this.ratesService.getRate(this.currencyTo.code);

		this.form = new FormGroup({
			first: new FormControl(1.00),
			second: new FormControl(''),
		});
	}

	constructor(public ratesService: RatesService,
		private popoverCtrl: PopoverController) {
	}

	/**
	 * Display the Currency List popover and allow user to select a currency.
	 * Exclude the other currency - swap functionality can be used to achieve that.
	 * @param event - UI event
	 * @param isFirstCurrency - which selection is chosen (first or second)
	 */
	showCurrenciesPopover(event: UIEvent, isFirstCurrency: boolean) {
		this.popoverCtrl.create({
			component: CurrencyListComponent,
			componentProps: {
				ExcludeCodes: [this.currencyTo.code, this.currencyFrom.code]
			},
			event,
			cssClass: 'popover-currency-list'
		}).then(popover => {
			popover.present();

			popover.onWillDismiss().then(response => {
				if (response.data) {
					if (isFirstCurrency) {
						this.currencyFrom = response.data;

						// Update rates when first currency is selected
						this.ratesService.getRatesByBase(response.data.code).subscribe(() => {
							this.currentRate = this.ratesService.getRate(this.currencyTo.code);
						});
					}
					else {
						this.currencyTo = response.data;
					}

					// Reset 'second' field to be recalculates
					this.form.controls.second.reset();
				}
			})
		})
	}

	/**
	 * When one input is edited, clear the other
	 * @param isFirstCurrency - which selection is chosen (first or second)
	 */
	handleInput(isFirstCurrency: boolean) {
		if (isFirstCurrency) {
			this.form.controls.second.reset();
		}
		else {
			this.form.controls.first.reset();
		}
	}

	/**
	 * Swap currencies and recalculate rates
	 */
	swap() {
		// Swap first and second currencies
		const temp = Object.assign(new CurrencyModel('', '', ''), this.currencyFrom);
		this.currencyFrom = this.currencyTo;
		this.currencyTo = temp;

		// Reset 'second' field to be recalculates
		this.form.controls.second.reset();

		// Set isSwapped flag to alter messages
		this.isSwapped = !this.isSwapped;

		// Update rates
		this.ratesService.getRatesByBase(this.currencyFrom.code).subscribe(() => {
			this.currentRate = this.ratesService.getRate(this.currencyTo.code);
		});
	}

	/**
	 * Calculate the amount in the other currency.
	 * Cases:
	 * 1. First -> second: multiply by exchange rate
	 * 2. Second -> first: divide by exchange rate
	 */
	calculate() {
		const isFirstCurrency: boolean = this.form.controls.first.value ? true : false;

		if (isFirstCurrency) {
			this.form.controls.second.setValue((this.form.controls.first.value * this.currentRate).toFixed(2));
		}
		else {
			this.form.controls.first.setValue((this.form.controls.second.value / this.currentRate).toFixed(2));
		}
	}

	/**
	 * Reset form.
	 */
	reset() {
		this.form.reset();
	}
}
