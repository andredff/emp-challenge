import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

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

  city: any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.onCitySearch();
  }

  onCitySearch(){
    this.queryField.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((query) => this.homeService.search(query))
    )
    .subscribe(result => {
      this.results = result || [];
      console.log(this.results);
    });
  }

  take(e){
    // console.log(e)
    e.preventDefault();
    this.city = e.target.outerText;
  }

  // onJobSearch(){
  //   this.queryFieldJob.valueChanges
  //   .debounceTime(500)
  //   .distinctUntilChanged()
  //   .switchMap((query) => this.homeService.searchJob(query))
  //   .subscribe(result => {
  //     this.resultsJob = result || [];
  //     console.log(this.resultsJob)
  //   }
  //   )
  // }

}
