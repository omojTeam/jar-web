import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewJar } from '../models/new-jar';

@Injectable({
  providedIn: 'root'
})
export class JarService {

  constructor(private http: HttpClient) { }

  serverUrl: string = `${environment.apiUrl}/jar`;

  uploadJar(jar: NewJar) {
    return this.http.post<any>(this.serverUrl, {jar: jar});
  }
}
