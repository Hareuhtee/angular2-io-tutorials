//Angular Framework
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
//App
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component ({
    moduleId: module.id,
    selector: "my-hero-detail",
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit, OnDestroy {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false; //true if navigated here

  constructor(private heroService: HeroService, private route: ActivatedRoute) {}

  save(){
    this.heroService.save(this.hero)
        .then(hero=> {
          this.hero = hero; //saved hero with id if new
          this.goBack(hero);
        })
        .catch(error=>this.error=error); //TODO: Display error message
  }

  goBack(savedHero:Hero=null){
    this.close.emit(savedHero);
    if(this.navigated){window.history.back()};
  }

  ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        if (params['id'] !== undefined) {
	        let id = +params['id'];
          this.navigated = true;
          this.heroService.getHero(id).then(hero=>this.hero = hero);          
        }else {
          this.navigated = false;
          this.hero = new Hero();
        }
    });
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }
}


