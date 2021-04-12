import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-wearable-selected',
  templateUrl: './wearable-selected.component.html',
  styleUrls: ['./wearable-selected.component.scss'],
})
export class WearableSelectedComponent implements OnInit {
  userSelection: any;
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userWearableSelectionObservable$.subscribe(
      (userSelection) => {
        console.log(userSelection);
        this.userSelection = userSelection;
        this.loading = false;
      }
    );
  }
}
