import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cite-handler',
  templateUrl: './cite-handler.component.html',
  styleUrls: ['./cite-handler.component.css']
})
export class CiteHandlerComponent implements OnInit {
  citehandler = new FormControl('');
  formattedCitation: string;
  constructor() { }

  ngOnInit() {
  	this.onChanges();
  }

  onChanges(): void {
    this.citehandler.valueChanges.subscribe(val => {
      this.formattedCitation = `Title Here. Website Title, Publisher, Current Date, ${val}.`;
    });
  }

}
