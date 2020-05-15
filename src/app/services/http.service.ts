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
	private handleError(error: any = null) {
		this.toastCtrl.create({
			message: 'An error occurred, please try again.',
			position: 'top',
			duration: 2000
		}).then(toast => {
			toast.present();
		});
	}
}