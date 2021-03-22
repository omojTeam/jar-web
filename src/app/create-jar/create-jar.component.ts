import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NewJar } from '../models/new-jar';
import { JarService } from '../shared/jar.service';

@Component({
  selector: 'app-create-jar',
  templateUrl: './create-jar.component.html',
  styleUrls: ['./create-jar.component.css']
})
export class CreateJarComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private jarService: JarService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      timesPerDay: [''],
      recipientEmail: ['', Validators.required],
      cards: new FormArray([]),
    });

    this.addCard();

  }

  get f() {return this.form.controls}
  get c() {return this.f.cards as FormArray}

  addCard(): void {
    this.c.push(
      this.fb.group({
        text: ['']
      })
    );
  }

  onSubmit() {
    if(this.form.invalid) return;
    const f = this.form.value;

    const jar: NewJar = {
      "title": f.title,
      "timesPerDay": f.timesPerDay,
      "recipientEmail": f.recipientEmail,
      "cards": f.cards
    }
    this.jarService.uploadJar(jar)
    .subscribe(res => console.log(res));   
  }
}
