import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  results: any;
  resultsJob: any;
  queryField: FormControl = new FormControl();
  queryFieldJob: FormControl = new FormControl();

  form: FormGroup;
  showDropDown = false;
  showDropDownJobs = false;

  constructor(private homeService: HomeService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm()
    this.onCitySearch();
    this.onJobSearch();
  }

  initForm(): FormGroup {
    return this.form = this.fb.group({
      search: [null],
      searchjob: [null]
    })
  }

  onCitySearch() {
    this.queryField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => this.homeService.search(query)))
      .subscribe(result => {
        this.results = result.map(result => result.Descricao)
        this.showDropDown = true;
      });
  }

  selectCity(value) {
    this.form.patchValue({ "search": value });
    this.showDropDown = !this.showDropDown;
  }


  onJobSearch() {
    this.queryFieldJob.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => this.homeService.searchJob(query)))
      .subscribe(result => {
        this.resultsJob = result.map(result => result.Descricao)
        this.showDropDownJobs = true;
      });
  }

  selectJob(value) {
    this.form.patchValue({ "searchjob": value });
    this.showDropDownJobs = !this.showDropDownJobs;
  }

}
