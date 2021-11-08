import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formId: number = -1;
  toId: number = -1;

  constructor(private router: Router) {}

  handleSearch(f: NgForm): void {
    if (this.formId != this.toId)
      this.router.navigate(['/search'], {
        queryParams: { form: this.formId },
      });
    this.formId = -1;
  }

  ngOnInit(){}
}
