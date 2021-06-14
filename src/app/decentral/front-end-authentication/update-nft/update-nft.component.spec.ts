import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNftComponent } from './update-nft.component';

describe('UpdateNftComponent', () => {
  let component: UpdateNftComponent;
  let fixture: ComponentFixture<UpdateNftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
