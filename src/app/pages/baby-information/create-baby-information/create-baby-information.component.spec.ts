import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBabyInformationComponent } from './create-baby-information.component';

describe('CreateBabyInformationComponent', () => {
  let component: CreateBabyInformationComponent;
  let fixture: ComponentFixture<CreateBabyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBabyInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBabyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
