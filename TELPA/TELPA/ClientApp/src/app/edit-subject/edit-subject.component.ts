import { Component, OnInit } from '@angular/core';
import { SubjectData } from '../add-subject/data/data';


@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {

  subjectToAdd = new SubjectData(1, 2, '', '', ['']);
  hideForm = true;
  isEmpty = [false];
 

  constructor() { }

  ngOnInit() {
    this.hideForm = true;
  }

  onSubmit() { }

  onSubjectChange(value) {
    if (value == "(None)") {
      this.hideForm = true;
    }
    else {
      this.hideForm = false;
    }
  }

  onLinkChange(value, place) {
    this.subjectToAdd.links[place] = value;
    if (place == (this.subjectToAdd.links.length - 1) && this.subjectToAdd.links[place].length != 0) {
      this.subjectToAdd.links.push('');
      this.isEmpty.push(false);
    }
    else if (place != (this.subjectToAdd.links.length - 1) && this.subjectToAdd.links[place].length == 0) {
      this.isEmpty[place] = true;
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
