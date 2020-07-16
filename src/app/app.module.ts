import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DataDialogComponent } from './data-dialog/data-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DataDialogComponent,
    DataDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    KeyboardShortcutsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DataDialogComponent]
})
export class AppModule { }
