import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityComponent } from './city.component';
import { CityService } from '../../city.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NgModule } from '@angular/core';



describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;
  let cityService: CityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityComponent ],
      imports: [ HttpClientTestingModule, FormsModule, HttpClientModule],
      providers: [ CityService ]
    })
    .compileComponents();

    cityService = TestBed.inject(CityService);
  });



  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call city service on search', () => {
    component.searchQuery = 'Berlin'; 
    const spy = spyOn(cityService, 'getCities').and.returnValue(of({ cities: [], totalCount: 0 }));
    component.search();
    expect(spy).toHaveBeenCalled();
  });

  it('should update cities and totalPage on search', () => {
    component.searchQuery = 'Berlin'; 
    spyOn(cityService, 'getCities').and.returnValue(of({ cities: [{ uuid: '1', cityName: 'Berlin', count: 523 }], totalCount: 1 }));
    component.search();
    expect(component.cities.length).toBe(1);
    expect(component.totalPage).toBe(1);
  });

  it('should navigate to the next page', () => {
    component.totalPage = 5;
    component.page = 1;
    component.nextPage();
    expect(component.page).toBe(2);
  });

  it('should not navigate to the next page if on the last page', () => {
    component.totalPage = 5;
    component.page = 5;
    component.nextPage();
    expect(component.page).toBe(5);
  });

  it('should navigate to the previous page', () => {
    component.page = 2;
    component.prevPage();
    expect(component.page).toBe(1);
  });

  it('should not navigate to the previous page if on the first page', () => {
    component.page = 1;
    component.prevPage();
    expect(component.page).toBe(1);
  });
});
