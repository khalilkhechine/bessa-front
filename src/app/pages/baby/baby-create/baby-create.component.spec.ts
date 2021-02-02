import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyCreateComponent } from './baby-create.component';

describe('BabyCreateComponent', () => {
  let component: BabyCreateComponent;
  let fixture: ComponentFixture<BabyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BabyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
