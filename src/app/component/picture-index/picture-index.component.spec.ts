import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureIndexComponent } from './picture-index.component';

describe('PictureIndexComponent', () => {
  let component: PictureIndexComponent;
  let fixture: ComponentFixture<PictureIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
