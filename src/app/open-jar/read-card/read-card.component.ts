import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-card',
  templateUrl: './read-card.component.html',
  styleUrls: ['./read-card.component.css']
})
export class ReadCardComponent implements OnInit {

  @Input() card: string;

  constructor() { }

  ngOnInit(): void {
  }

}
