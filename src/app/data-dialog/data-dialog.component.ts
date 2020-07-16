import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-dialog',
  templateUrl: './data-dialog.component.html',
  styleUrls: ['./data-dialog.component.css']
})
export class DataDialogComponent {

  isDuplicate = false;
  constructor(
    public dialogRef: MatDialogRef<DataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lists: any[], operation: string, type: string, title: string }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  validate() {
    if (this.data.type == "list") {
      this.isDuplicate = this.listDuplicate();
    } else {
      this.isDuplicate = this.taskDuplicate();

    }


  }

  listDuplicate(): boolean {
    for (let l of this.data.lists) {
      if (l.title == this.data.title) {
        return true;
      }
    }
    return false;

  }// listDuplicate

  taskDuplicate(): boolean {
    for (let l of this.data.lists) {
      for (let t of l.items) {
        if (t == this.data.title) {
          return true;
        }
      }
    }
    return false;

  }// taskDuplicate


}
