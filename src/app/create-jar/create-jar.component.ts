import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NewJar } from '../models/new-jar';
import { JarService } from '../shared/jar.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-jar',
  templateUrl: './create-jar.component.html',
  styleUrls: ['./create-jar.component.css']
})
export class CreateJarComponent implements OnInit {

  form: FormGroup;
  private shiftDistance: number = 500;
  private activeCard: number = 0;
  private isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private jarService: JarService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      cardsPerDay: [1, Validators.min(1)],
      recipientEmail: ['', Validators.required],
      cards: new FormArray([]),
    });

    this.addCard();

  }

  get f() {return this.form.controls}
  get c() {return this.f.cards as FormArray}

  addCard(): void {
    if(this.isSubmitted) return;
    this.c.push(
      this.fb.group({
        text: ['']
      })
    );
    this.activeCard = 0;
    setTimeout(function () {
      const cards = Array.from(window.top.document.getElementsByClassName('single-card') as HTMLCollectionOf<HTMLElement>).reverse();
      for(var i=0; i<cards.length; i++) {
        if(i!== 0) cards[i].style.transform = `translateX(${500*i}px)`;
      }
    },0);
  }
  
  prevCard(): void {
    if(this.isSubmitted) return;
    const cards = Array.from(window.top.document.getElementsByClassName('single-card') as HTMLCollectionOf<HTMLElement>).reverse();
    if(this.activeCard < cards.length - 1) {
      for(var i=0; i<cards.length; i++) {
        let matchTransform = cards[i].style.transform.match(/(-?[0-9\.]+)/g);
        let currentTransform = matchTransform ? parseInt(matchTransform[0]) : 0;
        cards[i].style.transform = `translateX(${currentTransform - 500}px)`;
      }    

      this.activeCard++;
    }
    else console.log("LAST CARD");
  }

  nextCard(): void {
    if(this.isSubmitted) return;
    const cards = Array.from(window.top.document.getElementsByClassName('single-card') as HTMLCollectionOf<HTMLElement>).reverse();
    if(this.activeCard > 0 ) {
      for(var i=0; i<cards.length; i++) {
        let matchTransform = cards[i].style.transform.match(/(-?[0-9\.]+)/g);
        let currentTransform = matchTransform ? parseInt(matchTransform[0]) : 0;
        cards[i].style.transform = `translateX(${currentTransform + 500}px)`;
      }    

      this.activeCard--;
    }
    else console.log("FIRST CARD");
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
    
    setTimeout(() => {this.openDialog(this.form)}, 1000);
    
    this.isSubmitted = true;
  }

  openDialog(form: FormGroup): void {
    const dialogRef = this.dialog.open(DialogSubmit, {
      data: form
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
      if(result) {
        const cardsWrapper = window.top.document.getElementById('card');
        cardsWrapper.classList.add('store-card');
    
        const cards = Array.from(window.top.document.getElementsByClassName('single-card') as HTMLCollectionOf<HTMLElement>).reverse();
        for(var i=0; i<cards.length; i++) {
          cards[i].style.transform = `translateX(0)`;
        }
      }
    });
  }
}



//DIALOG
@Component({
  selector: 'dialog-submit',
  templateUrl:'dialog-submit.html',
  styleUrls: ['dialog-submit.css']
})
export class DialogSubmit {
  constructor(
    public dialogRef: MatDialogRef<DialogSubmit>,
    @Inject(MAT_DIALOG_DATA) public form,
    private jarService: JarService
  ) {}

  private isSubmitted:boolean = false;

  onNoClick(): void {
    
  }

  submitJar() {
    console.log(this.form.value);
    if(this.form.invalid || this.isSubmitted) return;

    this.isSubmitted = true;
    // if(this.form.invalid) return;
    const f = this.form.value;
    const jar: NewJar = {
      "title": f.title,
      "cardsPerDay": f.cardsPerDay,
      "recipientEmail": f.recipientEmail,
      "cards": f.cards
    }
    
    this.jarService.uploadJar(jar)
    .subscribe(res => {
      console.log(res);
      this.dialogRef.close(true);
    }, err => {this.isSubmitted = false;}); 
  }
}
