import { Component, OnInit } from "@angular/core";
import { SAMPLEQUERY } from "../GraphQueries/Queries";
import { Apollo } from "apollo-angular";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  /* Probably a good idea to 
    move this stuff to the services file. */

  // building our App on Objects
  graphResponse: any = {};
  loading = true;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: SAMPLEQUERY,
      })
      .valueChanges.subscribe((result: any) => {
        this.graphResponse["counts"] = result.data.counts;
        this.graphResponse["orders"] = result.data.orders;
        this.loading = false;
      });
  }
}
