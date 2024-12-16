import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  form_title = "Teams"

  vehicle_types = [
    { name: '2 Wheeler', code: '2w' },
    { name: '4 Wheeler', code: '4w' },
    { name: 'Truck', code: 'truck' },
    { name: 'Tempo', code: 'tempo' },
    { name: 'Mopet', code: 'mopet' },
  ];

  form_fields = {
    company_name: ['', Validators.required],
    name: ['', Validators.required],
    color: ['', Validators.required],
    number: ['', Validators.required],
    engine_in_cc: ['', Validators.required],
    top_speed: [''],
    type: ['', Validators.required],
    purchase_date: [''],
  }

  team_form_fields = [
    { type: 'text', is_required: true, label: 'Company Name' , form_control_name: 'company_name' },
    { type: 'text', is_required: true, label: 'Name' , form_control_name: 'name' },
    { type: 'date', is_required: false, label: 'Purchase Date' , form_control_name: 'purchase_date' },
    { type: 'text', is_required: true, label: 'Color' , form_control_name: 'color' },
    { type: 'text', is_required: true, label: 'Number' , form_control_name: 'number' },
    { type: 'number', is_required: true, label: 'Engine In CC' , form_control_name: 'engine_in_cc' },
    { type: 'number', is_required: false, label: 'Top Speed' , form_control_name: 'top_speed' },
    { type: 'select', is_required: true, label: 'Type' , form_control_name: 'type' },
  ]

  edit_team = {
    // "company_name": "KTM",
    // "name": "390 adventure R",
    // "color": "Orange",
    // "number": "MH14 RA 4907",
    // "engine_in_cc": "399",
    // "top_speed": "205",
    // "type": "2w",
    // "purchase_date": "2024-11-19",
  }
}
