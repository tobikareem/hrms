import { Injectable } from '@angular/core';
import { TimeOffRequest } from '../infrastructure/types/timeoff-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  requests: TimeOffRequest[] = [];

  constructor() {
    this.requests = ([{
      id: 1,
      employeeId: 1,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Vacation',
      status: 'Pending',
    },
    {
      id: 2,
      employeeId: 2,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Sick Leave',
      status: 'Approved',
      comment: 'Feeling pretty sick today :(',
    },
    {
      id: 3,
      employeeId: 3,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Maternity Leave',
      status: 'Rejected',
      comment: 'I am pregnant',
    },
    {
      id: 4,
      employeeId: 4,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Paternity Leave',
      status: 'Pending',
    },
    {
      id: 5,
      employeeId: 5,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Other',
      status: 'Pending',
    },
    {
      id: 6,
      employeeId: 6,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Vacation',
      status: 'Approved',
    },
    {
      id: 7,
      employeeId: 7,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Sick Leave',
      status: 'Rejected',
      comment: 'I am sick',
    },
    {
      id: 8,
      employeeId: 8,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Maternity Leave',
      status: 'Pending',
    },
    {
      id: 9,
      employeeId: 9,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Sick Leave',
      status: 'Pending',
    },
    {
      id: 10,
      employeeId: 10,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Other',
      status: 'Pending',
    }]);
  }

  getTimeOffRequests(): Observable<TimeOffRequest[]> {


    return new Observable<TimeOffRequest[]>(subscriber => {
      subscriber.next(this.requests);
      subscriber.complete();
    });

  }

  deleteTimeOffRequest(id: number): Observable<TimeOffRequest[]> {
    console.log('Deleting request with id:', id);
    return new Observable<TimeOffRequest[]>(subscriber => {
      this.requests = this.requests.filter((r) => r.id !== id);
      subscriber.next(this.requests);
      subscriber.complete();
    });
  }

  approveTimeOffRequest(id: number): Observable<TimeOffRequest[]> {
    return new Observable<TimeOffRequest[]>(subscriber => {
      this.requests = this.requests.map((r) => r.id === id ? { ...r, status: 'Approved' } : r);
      subscriber.next(this.requests);
      subscriber.complete();
    });
  }

  rejectTimeOffRequest(id: number): Observable<TimeOffRequest[]> {
    return new Observable<TimeOffRequest[]>(subscriber => {
      this.requests = this.requests.map((r) => r.id === id ? { ...r, status: 'Rejected' } : r);
      subscriber.next(this.requests);
      subscriber.complete();
    });
  }




}
