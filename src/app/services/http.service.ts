import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient,
		private toastCtrl: ToastController) {
	}

	/**
	 * GET call to API.
	 * @param url - url to be called
	 */
	get(url: string): Observable<any> {
		return this.http.get(url).pipe(
			catchError((err) => {
				this.handleError(err);
				return throwError(err);
			}),
			map(res => res)
		);
	}

	/**
	 * Handle the received HTTP error.
	 * @param error - error to be handled
	 */
	private async handleError(error: any = null) {
		const toast = await this.toastCtrl.create({
			message: 'An error occurred, please try again.',
			duration: 2000
		});
		toast.present();
	}
}