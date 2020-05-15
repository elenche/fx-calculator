import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RatesService } from './services/rates.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {

	constructor(private ratesService: RatesService,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private platform: Platform) {

		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {

			// Get exchange rates
			this.ratesService.getRatesByBase();

			if (this.platform.is('cordova')) {
				this.statusBar.styleDefault();
				this.splashScreen.hide();
			}
		});
	}
}
