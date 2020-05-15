import { Component } from '@angular/core';
import { RatesService } from '../../services/rates.service';
import { PopoverController } from '@ionic/angular';
import { CurrencyListComponent } from '../../popovers/currency-list/currency-list.component';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	constructor(public ratesService: RatesService,
		private popoverCtrl: PopoverController) { }

	showCurrenciesPopover(event: UIEvent) {
		this.popoverCtrl.create({
			component: CurrencyListComponent,
			event: event,
			cssClass: 'popover-currency-list'
		}).then(popover => {
			popover.present();

			popover.onWillDismiss().then(response => {
				if (response.data) {
					console.log('Chosen currency: ', response.data);
				}
			})
		})
	}

	swap() {

	}

	calculate() {

	}

	reset() {

	}
}
