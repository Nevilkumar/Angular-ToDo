import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoTasksService {

  url: string = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) { }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.url+'/'+task.id);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.url+'/'+task.id, task)
  }
}
