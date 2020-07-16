import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';
import Swal from 'sweetalert2';
import { ShortcutInput, KeyboardShortcutsComponent } from 'ng-keyboard-shortcuts';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  shortcuts: ShortcutInput[] = [];
  lists = [];

  @ViewChild(KeyboardShortcutsComponent, { static: true }) private keyboard: KeyboardShortcutsComponent;


  constructor(public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "ctrl + l",
        command: e => this.addList(),
        preventDefault: true
      }
    );

  }

  addList(): void {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '250px',
      data: { type: "list", operation: "add", title: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        this.lists.push({ title: result, items: [] })
      }

    });
  }// addList

  addTask(index: number) {

    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '250px',
      data: { type: "task", operation: "add", title: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result", result);

      if (result) {
        this.lists[index].items.push(result);
      }

    });
  }//addTask


  editList(index, title) {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '250px',
      data: { type: "list", operation: "edit", title: title }
    });

    dialogRef.afterClosed().subscribe(result => {    

      if (result) {
        const listObj = this.lists[index];
        listObj.title = result;
        this.lists.splice(index, 1, listObj)
      }

    });
  }//editList


  editTask(listIndex, taskIndex, task) {

    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '250px',
      data: { type: "task", operation: "edit", title: task }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result", result);

      if (result) {
        this.lists[listIndex].items.splice(taskIndex, 1, result);
      }

    });

  }//editTask



  deleteList(index: number) {
    Swal.fire({
      title: 'Are you sure want to delete list?',
      text: 'You will not be able to recover this list!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.lists.splice(index, 1);
        Swal.fire(
          'Deleted!',
          'Your list has been deleted.',
          'success'
        )
       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your list is safe :)',
          'error'
        )
      }
    })
  }

  deleteTask(listIndex: number, taskIndex: number) {
    Swal.fire({
      title: 'Are you sure want to delete task?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.lists[listIndex].items.splice(taskIndex, 1);
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your task is safe :)',
          'error'
        )
      }
    })

  }


  drop(event: CdkDragDrop<any>) {
    console.log(event.container.data);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.items, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data.items,
        event.container.data.items,
        event.previousIndex,
        event.currentIndex);
    }
  }
}


