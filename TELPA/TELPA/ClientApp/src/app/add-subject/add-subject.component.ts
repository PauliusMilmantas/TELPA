import { Component, OnInit } from '@angular/core';
import { SubjectData } from './data/data';
@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  subjectToAdd = new SubjectData(1, 2, '', '', ['', '']);

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {  }


}
