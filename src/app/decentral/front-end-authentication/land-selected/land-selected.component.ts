import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-land-selected',
  templateUrl: './land-selected.component.html',
  styleUrls: ['./land-selected.component.scss'],
})
export class LandSelectedComponent implements OnInit {
  userSelection: any;
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userLandSelectionObservable$.subscribe((userSelection) => {
      console.log(userSelection);
      this.userSelection = userSelection;
      this.loading = false;
    });
  }
}
