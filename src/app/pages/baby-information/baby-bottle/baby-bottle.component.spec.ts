import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyBottleComponent } from './baby-bottle.component';

describe('BabyBottleComponent', () => {
  let component: BabyBottleComponent;
  let fixture: ComponentFixture<BabyBottleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BabyBottleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyBottleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
