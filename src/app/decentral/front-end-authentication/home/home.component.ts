import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit() {}
}
