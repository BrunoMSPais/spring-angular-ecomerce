import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(private route: Router) {}

  doSearch(value: string) {
    this.route.navigateByUrl(`/search/${value}`);
  }
}
