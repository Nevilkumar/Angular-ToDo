import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TodoTasksService } from '../service/todo-tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private taskService: TodoTasksService ) { }

  newTask: Task = new Task();
  currentEditingTask = new Task();
  AllTasks: Task[] = [];
  currentEditingTaskValue: string = '';
  displayedColumns: string[] = ['id', 'name', 'actions'];

  ngOnInit(): void {
    console.log("Called")
    this.getAllTasks();
    this.newTask = new Task();
  }

  add() {
    this.taskService.addTask(this.newTask).subscribe({
      next: (res) => this.ngOnInit(),
      error: (e) => console.error(e)
    })
  }

  getAllTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => this.AllTasks = res,
      error: (err) =>  console.log(err)
    });
  }

  delete(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => console.log(err)
    });
  }

  edit() {
    this.currentEditingTask.name = this.currentEditingTaskValue;
    this.taskService.editTask(this.currentEditingTask).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => console.log(err)
    });
  }

  changeValue(task: Task) {
    this.currentEditingTask = task;
    this.currentEditingTaskValue = task.name;
  }
}
