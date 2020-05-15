import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrencyListComponent } from './currency-list.component';

describe('CurrencyListComponent', () => {
	let component: CurrencyListComponent;
	let fixture: ComponentFixture<CurrencyListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CurrencyListComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(CurrencyListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
