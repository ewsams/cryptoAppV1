import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NftUploadComponent } from './nft-upload.component';

describe('NftUploadComponent', () => {
  let component: NftUploadComponent;
  let fixture: ComponentFixture<NftUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NftUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NftUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
