import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellAssestsComponent } from './sell-assests.component';

describe('SellAssestsComponent', () => {
  let component: SellAssestsComponent;
  let fixture: ComponentFixture<SellAssestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellAssestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellAssestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
