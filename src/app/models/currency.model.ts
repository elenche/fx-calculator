export class CurrencyModel {
	title: string;
	code: string;
	flag: string;

	constructor(title: string, code: string, flag: string) {
		this.title = title;
		this.code = code;
		this.flag = flag;
	}
}
