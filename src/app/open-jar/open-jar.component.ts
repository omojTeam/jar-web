import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JarService } from '../shared/jar.service';

@Component({
  selector: 'app-open-jar',
  templateUrl: './open-jar.component.html',
  styleUrls: ['./open-jar.component.css']
})
export class OpenJarComponent implements OnInit {

  constructor(
    public jarService: JarService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
   }

  private id: string;
  public cards: string[] = [];
  public status: string = 'loading';


  ngOnInit(): void {
    console.log(this.id);
    this.getCard();
  }

  getCard() {
    this.jarService.getCard(this.id).subscribe(
      res => {
        if(this.status == 'loading') this.status = 'cards-ready';
        let text = res.jar.cards[0].text;
        text = text.split('<br>').join('');
        this.cards.push(text);
        console.log(this.cards);
      },
      err => {
        switch(err.status) {
          case 404: const dialogRef = this.openDialog(); break;
          case 403: if(['loading', 'cards-ready'].includes(this.status)) this.status = 'limit-reached'; break;
        }

        console.log(err.status);
        
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogReset, {data: this.id});
    dialogRef.afterClosed().subscribe(res => this.getCard());
  }

  assignClass(index) {
    switch(index) {
      case this.cards.length-1 == index: return 'show-card';
      case this.cards.length-2 == index: return 'store-card';
      
    }
  }

}


//DIALOG SUCCESS
@Component({
  selector: 'dialog-success',
  template:'<img src="/assets/images/EmptyJar.png" style="object-fit: cover; width: 100%; height: 100%;" (click)="resetJar()">'
})
export class DialogReset {
  constructor(
    public dialogRef: MatDialogRef<DialogReset>,
    public jarService: JarService,
    @Inject(MAT_DIALOG_DATA) public id,
  ) {}

  resetJar() {
    this.jarService.resetJar(this.id).subscribe(
      res => {
        console.log(res);
        this.dialogRef.close();

      },
      err => console.log(err)
    )
  }
}

