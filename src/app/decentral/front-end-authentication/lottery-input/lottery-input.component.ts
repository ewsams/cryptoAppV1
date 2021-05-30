import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { UserService } from '../services/user.service';
import {LotteryInput} from '../models/lottery-input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LotteryService } from 'src/app/util/lottery.service';

@Component({
  selector: 'app-lottery-input',
  templateUrl: './lottery-input.component.html',
  styleUrls: ['./lottery-input.component.scss']
})
export class LotteryInputComponent implements OnInit {
  myForm: FormGroup;
  lotterInputObject:LotteryInput;
  color: boolean;
  input1:number;
  input2;
  input3;
  input4;
  input5;
  input6;

  constructor(
    private fb: FormBuilder,
    private lotteryService:LotteryService,
    private db: FirestoreService,
    private userService: UserService,
    private modal: NgbModal,
  ) {}
  
  onSubmit() {
    if (this.myForm.status === 'VALID') {
      this.lotterInputObject = {
        input1: this.inputOne.value,
        input2: this.inputTwo.value,
        input3: this.inputThree.value,
        input4: this.inputFour.value,
        input5: this.inputFive.value,
        input6: this.inputSix.value,
      };
      this.lotteryService.playerNumbers.next(Object.values(this.lotterInputObject));
      this.closeModal();
    }
  }

  ngOnInit() {
    this.userService.userBackgroundSelectionObservable$.subscribe(color => {
      this.color = color;
    });

    // form for lottery
    this.myForm = this.fb.group({
      input1: [null, [Validators.required, Validators.pattern(/^[0-9]$|^[1-9][0-9]$|^(100)$/)]],
      input2: [null, [Validators.required, Validators.pattern(/^[0-9]$|^[1-9][0-9]$|^(100)$/)]],
      input3: [null, [Validators.required, Validators.pattern(/^[0-9]$|^[1-9][0-9]$|^(100)$/)]],
      input4: [null, [Validators.required, Validators.pattern(/^[0-9]$|^[1-9][0-9]$|^(100)$/)]],
      input5: [null, [Validators.required, Validators.pattern(/^[0-9]$|^[1-9][0-9]$|^(100)$/)]],
      input6: [null, [Validators.required, Validators.pattern(/^[0-9]$|^[1-9][0-9]$|^(100)$/)]],  
    });
  }
  // Getters for working with our form
  get inputOne() {
    return this.myForm.get('input1');
  }
  get inputTwo() {
    return this.myForm.get('input2');
  }
  get inputThree() {
    return this.myForm.get('input3');
  }
  get inputFour() {
    return this.myForm.get('input4');
  }
  get inputFive() {
    return this.myForm.get('input5');
  }
  get inputSix() {
    return this.myForm.get('input6');
  }
  

  closeModal() {
    this.modal.dismissAll();
  }

  ngOnDestroy() {
    
  }
}
