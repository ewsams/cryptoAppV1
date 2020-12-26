import { Component, OnInit } from "@angular/core";
import { LANDQUERY } from "../GraphQueries/Queries";
import { Apollo } from "apollo-angular";

@Component({
  selector: "app-land-available",
  templateUrl: "./land-available.component.html",
  styleUrls: ["./land-available.component.scss"],
})
export class LandAvailableComponent implements OnInit {
  landCompontObject: any = {};
  loading: boolean = true;

  constructor(private apollo: Apollo) {}

  pageNumber = 1;
  totalRecords: Number;

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: LANDQUERY,
      })
      .valueChanges.subscribe((result: any) => {
        this.landCompontObject["parcels"] = result.data.parcels;
        console.log(result);
        this.loading = false;
      });
  }
}
