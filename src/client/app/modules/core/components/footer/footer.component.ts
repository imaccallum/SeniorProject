import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	phoneNumber: string = '1-800-123-4567'
	email: string = 'enquires@website.com'
	copyright: string = 'Copyright Senior Project Inc. 2017'
	address = {
		streetAdress: '123 NW 47th Street',
		region: '56 College Green Road',
		postalCode: '32603',
		country: 'USA'

	}

  constructor() { }

  ngOnInit() {
  }

}
