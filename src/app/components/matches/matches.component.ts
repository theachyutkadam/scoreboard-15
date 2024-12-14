import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent {
  match_filter: any
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
     this.match_filter = this.route.snapshot.paramMap.get('filter');
  }
}
