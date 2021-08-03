import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAssestsComponent } from './buy-assests.component';

describe('BuyAssestsComponent', () => {
  let component: BuyAssestsComponent;
  let fixture: ComponentFixture<BuyAssestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyAssestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyAssestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
