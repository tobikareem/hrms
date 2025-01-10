import { DatePipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, computed, effect, inject, Injector, OnInit, signal, untracked } from '@angular/core';
import { TimeOffRequest } from '../../../infrastructure/types/timeoff-request';
import { FormsModule } from '@angular/forms';
import { WorkService } from '../../../services/work.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-time-off-mamnagement',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, FormsModule],
  templateUrl: './time-off-mamnagement.component.html',
  styleUrl: './time-off-mamnagement.component.scss'
})
export class TimeOffMamnagementComponent implements OnInit {

  private readonly workService = inject(WorkService);
  private readonly injector: Injector = inject(Injector);

  requests = toSignal(this.workService.getTimeOffRequests(), { initialValue: [] });

  selectedType = signal<'Vacation' | 'Sick Leave' | 'Maternity Leave' | 'Paternity Leave' | 'Other' | ''>('');
  filteredRequests = computed(() => this.requests().filter((r) => this.selectedType() === '' || r.type === this.selectedType()));
  resolvedRequests = computed(() => this.filteredRequests().filter((r) => r.status !== 'Pending'));

  user = signal(
    { id: 1, firstName: 'John', lastName: 'Doe', email: '' },
    { equal: (a, b) => a.id === b.id }
  );

  dateTime = toSignal(interval(30_000).pipe(map(() => new Date())), { initialValue: new Date() });

  fullname = computed(() => {
    console.log('Fullname computed');
    const { firstName, lastName } = this.user();
    const dateTime = untracked(this.dateTime);

    return `${firstName} ${lastName}, last updated: ${dateTime.toLocaleTimeString()}`;
  });

  constructor() {
  }

  ngOnInit() {
  }

  changeUser() {
    this.user.update((user) => ({ ...user, email: 'Hello' }));
  }


  approveRequest(request: TimeOffRequest) {
    //  this.requests.update((requests) => requests.map((r) => r.id === request.id ? { ...r, status: 'Approved' } : r));
    this.requests = toSignal(this.workService.approveTimeOffRequest(request.id).pipe(switchMap(() => this.workService.getTimeOffRequests())), { initialValue: this.requests(), injector: this.injector });
  }

  rejectRequest(request: TimeOffRequest) {
    // this.requests.update((requests) => requests.map((r) => r.id === request.id ? { ...r, status: 'Rejected' } : r));
    this.requests = toSignal(this.workService.rejectTimeOffRequest(request.id).pipe(switchMap(() => this.workService.getTimeOffRequests())), { initialValue: this.requests(), injector: this.injector });
  }

  deleteRequest(request: TimeOffRequest) {
    // this.requests.update((requests) => requests.filter((r) => r.id !== request.id));

    this.workService.deleteTimeOffRequest(request.id).pipe(
      switchMap(() => this.workService.getTimeOffRequests())
    ),
      { initialValue: this.requests(), injector: this.injector };

  }

}
