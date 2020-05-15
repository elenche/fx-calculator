export class CurrencyModel {
	name: string;
	code: string;
	flag: string;

	constructor(name: string, code: string, flag: string) {
		this.name = name;
		this.code = code;
		this.flag = flag;
	}
}
