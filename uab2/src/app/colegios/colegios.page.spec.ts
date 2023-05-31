import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColegiosPage } from './colegios.page';

describe('ColegiosPage', () => {
  let component: ColegiosPage;
  let fixture: ComponentFixture<ColegiosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ColegiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
