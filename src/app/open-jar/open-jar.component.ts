import { Component, OnInit } from '@angular/core';
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
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
   }

  private id: string;
  public cards: string[] = [];

  ngOnInit(): void {
    console.log(this.id);
  }

  getCard() {
    this.jarService.getCard(this.id).subscribe(
      res => {
        let text = res.jar.cards[0].text;
        text = text.split('<br>').join('');
        this.cards.push(text);
        console.log(this.cards);
      },
      err => {
        console.log(err);
      }
    )
  }

  resetJar() {
    this.jarService.resetJar(this.id).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  assignClass(index) {
    switch(index) {
      case this.cards.length-1 == index: return 'show-card';
      case this.cards.length-2 == index: return 'store-card';
      
    }
  }

}
