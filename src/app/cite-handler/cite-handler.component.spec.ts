import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiteHandlerComponent } from './cite-handler.component';

describe('CiteHandlerComponent', () => {
  let component: CiteHandlerComponent;
  let fixture: ComponentFixture<CiteHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiteHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiteHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
