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
      cardsPerDay: [''],
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

    const papers = document.getElementsByClassName('paper');
    const textInputs = document.getElementsByTagName('textarea');
    for(var x=0; x<papers.length; x++) {
      let inputValue: String = papers[x].innerHTML;
      inputValue = inputValue.replace(/<div>/g, "");
      inputValue = inputValue.replace(/<\/div>/g, "\n");
      this.c.controls[x].setValue({text: inputValue});
    }

    if(this.form.invalid) return;
    const f = this.form.value;

    const jar: NewJar = {
      "title": f.title,
      "cardsPerDay": f.cardsPerDay,
      "recipientEmail": f.recipientEmail,
      "cards": f.cards
    }

    console.log(jar);
    this.jarService.uploadJar(jar)
    .subscribe(res => console.log(res));   
  }
}
