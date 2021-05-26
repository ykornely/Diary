import { Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserAndParagraphService } from '../shared/user-and-paragraph.service';
import { Paragraph } from '../shared/paragraph.model';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
})
export class DiaryComponent implements OnInit, OnChanges {
  paragraphs = [];

  selectedParagraph: Paragraph = {
    _id: '',
    title: '',
    content: '',
  };

  constructor(private diaryService: UserAndParagraphService) {}

  ngOnInit() {
    this.resetForm();
    this.refreshParagraphList();
  }

  ngOnChanges() {
    this.refreshParagraphList();
  }

  onSubmit(form: NgForm) {
    if (form.value._id == '') {
      this.diaryService.postParagraph(form.value).subscribe(
        (res) => {
          this.refreshParagraphList();
          this.resetForm(form);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.diaryService.patchParagraph(form.value).subscribe(
        (res) => {
          this.refreshParagraphList();
          this.resetForm(form);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  refreshParagraphList() {
    this.diaryService.getParagraphs().subscribe(
      (res) => {
        this.paragraphs = res as Paragraph[];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.selectedParagraph = {
      _id: '',
      title: '',
      content: '',
    };
  }

  onEdit(paragraph: Paragraph) {
    this.selectedParagraph = paragraph;
  }

  onDelete(paragraph: Paragraph, form: NgForm) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.diaryService.deleteParagraph(paragraph._id).subscribe((res) => {
      this.refreshParagraphList();
      this.resetForm(form);
      });
    }
    this.refreshParagraphList();
    this.resetForm(form);
  }
}
