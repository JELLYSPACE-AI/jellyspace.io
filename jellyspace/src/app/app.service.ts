import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiURL = 'http://localhost:8080/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Send OTP
  sendOTP(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/sendOTP`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Verify OTP
  verifyOTP(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/verifyOTP`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Login
  login(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/login`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get Employees
  getEmployees(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/employees`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get Employee by ID
  getEmployee(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/employees/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Create Employee
  createEmployee(employee: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/register`,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Update Employee
  updateEmployee(id: string, employee: any): Observable<any> {
    return this.http
      .put<any>(
        `${this.apiURL}/employees/${id}`,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Delete Employee
  deleteEmployee(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiURL}/employees/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error Handling
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); // Log error to console
    return throwError(() => errorMessage);
  }

  // Get Projects by Email
  getProjectByEmail(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/getProjects`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Save Post Method
  savePostMethod(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/postAproject`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get API Data Binding
  getApiDataBinding(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/projects`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get Users Data
  getUsersData(): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/users`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get Bid Initialization Details
  getBidInitDetails(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/getProjectBids`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get Current Bid Details List
  getCurrentBidDetailsList(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/getbids`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Post Bid
  postBid(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/postBid`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Accept or Reject Bid
  acceptedAndRejected(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/acceptBid`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Delete Data
  deleteData(params: { id: string }): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/deleteProject`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Login User Details
  loginUserDetails(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/loginUser`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Delete User
  deleteUser(params: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiURL}/deleteUser`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
}
