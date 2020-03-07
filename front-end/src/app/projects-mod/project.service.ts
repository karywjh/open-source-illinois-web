import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient } from '@angular/common/http'
import { Project } from './project-class';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  //Gets all active projects in the database
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(environment.apiUrl+'api/project/all');
  }

  //Gets all projects led by user with given userId
  getProjectByUser(userId: string): Observable<Project[]>{
    return this.http.get<Project[]>(environment.apiUrl+'api/project/byUser/'+userId);
  }

  //Get all projects with suggested status whose category is associated with user's position -- applies only to Officers
  getSuggestedProjects(position: string): Observable<Project[]>{
    return this.http.get<Project[]>(environment.apiUrl+'api/project/suggested/'+position);
  } 

  //Adds user to the pendingMembers array to a given project
  addProjectMember(userId:string, projectId: string): Observable<Project> {
    return this.http.put<Project>(environment.apiUrl+'api/project/addProjectMember', [userId, projectId], {responseType: 'text' as 'json'});
  }

  //Updates status of project
  statusProject(project: Project): Observable<Project> {
    return this.http.put<Project>(environment.apiUrl+'api/project/updateStatus', project, {responseType: 'text' as 'json'})
  }
  
  //Moves a pending member from pendingMembers array to members array
  approveProjectMember(userId: string, projectId: string): Observable<Project>{
    return this.http.put<Project>(environment.apiUrl+'api/project/approveProjectMember', [userId, projectId], {responseType: 'text' as 'json'});
  }

  //Removes a pending member from pendingMembers array permanently
  rejectProjectMember(userId: string, projectId: string): Observable<Project>{
    return this.http.delete<Project>(environment.apiUrl+'api/project/rejectProjectMember/'+projectId+'/'+userId, {responseType: 'text' as 'json'});
  }
}
