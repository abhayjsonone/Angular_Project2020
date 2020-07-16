import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';
import Swal from 'sweetalert2';
import { ShortcutInput, KeyboardShortcutsComponent } from 'ng-keyboard-shortcuts';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  shortcuts: ShortcutInput[] = [];
  lists = [];
  subscription: Subscription

  @ViewChild(KeyboardShortcutsComponent, { static: true }) private keyboard: KeyboardShortcutsComponent;


  constructor(public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: "ctrl + l",
        command: e => this.add("list"),
        preventDefault: true
      }
    );

  }




  add(type: string, listIndex?: number) {

    this.subscription = this.openDialog({ type: type, operation: "add", title: '' })
      .subscribe(result => {
        if (result && type == "task") {
          this.lists[listIndex].items.push(result);
        } else if (result && type == "list") {
          this.lists.push({ title: result, items: [] })
        }
      });

  }//add


  edit(type, title, listIndex, taskIndex?) {

    this.subscription = this.openDialog({ type: type, operation: "edit", title: title })
      .subscribe(result => {
        if (result && type == "list") {
          const listObj = this.lists[listIndex];
          listObj.title = result;
          this.lists.splice(listIndex, 1, listObj)
        } else if (result && type == "task") {
          this.lists[listIndex].items.splice(taskIndex, 1, result);

        }
      });


  }//edit




  openDialog(data): Observable<any> {

    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '250px',
      data: { lists: this.lists, ...data }
    });
    if (this.subscription) this.subscription.unsubscribe();
    return dialogRef.afterClosed();


  }//openDialog




  delete(type, listIndex: number, taskIndex?: number) {
    Swal.fire({
      title: `Are you sure want to delete ${type}?`,
      text: `You will not be able to recover this ${type}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        if (type == "list")
          this.lists.splice(listIndex, 1);
        else
          this.lists[listIndex].items.splice(taskIndex, 1);
        Swal.fire(
          'Deleted!',
          `Your ${type} has been deleted.`,
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          `Your ${type} is safe :)`,
          'error'
        )
      }
    })
  }//delete



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
  }//drop

  onDestroy() {
    this.subscription.unsubscribe();
  }
}


