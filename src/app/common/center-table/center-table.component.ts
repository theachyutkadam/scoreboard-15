import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-center-table',
  templateUrl: './center-table.component.html',
  styleUrls: ['./center-table.component.css']
})
export class CenterTableComponent {
  @ViewChild('filter_value') filter_value!: ElementRef;

  @Input() headers: any
  @Input() records: any
  @Input() filter_options: any

  @Output() action = new EventEmitter<{action: string, record_id: any}>()
  @Output() filter = new EventEmitter<any>()
  @Output() sort = new EventEmitter<{sort_by: string, filter: any}>()

  constructor(){}
  ngOnInit(){}

  filterBy(event: any){ this.filter.emit(event.target.value)}
  sortBy(sort_by: string){ this.sort.emit({sort_by: sort_by, filter: this.filter_value.nativeElement.value})}
  sendAction(action: string, record_id: any){ this.action.emit({action: action, record_id: record_id})}
}
