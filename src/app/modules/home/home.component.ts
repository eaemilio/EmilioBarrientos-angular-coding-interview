import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup = new FormGroup({
    amount: new FormControl(5, [
      Validators.required,
      Validators.min(0),
      Validators.max(10)
    ]),
    difficulty: new FormControl(''),
    type: new FormControl(''),
  });

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  async onStartGame(): Promise<void> {
    const { value } = this.form;
    Object.keys(value).forEach(key => !value[key] && delete value[key]);
    await this.router.navigate(['/play'], {
      queryParams: value,
    });
  }

}
