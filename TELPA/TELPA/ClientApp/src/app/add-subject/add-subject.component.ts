import { Component, OnInit } from '@angular/core';
import { SubjectData } from './data/data';
@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  subjectToAdd = new SubjectData(1, 2, '', '', []);
  linksToAdd = [''];
  isEmpty = [false];

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {  }

  onLinkChange(value, place) {
    this.linksToAdd[place] = value;
    if (place == (this.linksToAdd.length - 1) && this.linksToAdd[place].length != 0) {
      this.linksToAdd.push('');
      this.isEmpty.push(false);
    }
    else if (place != (this.linksToAdd.length - 1) && this.linksToAdd[place].length == 0) {
      this.isEmpty[place] = true;
    }
  }

  trackByFn(index: any, item: any) {
   return index;
}
}
