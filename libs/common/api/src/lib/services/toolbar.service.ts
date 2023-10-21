import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToolbarService {
  /**
   * The search term.
   */
  searchTerm$ = new BehaviorSubject<string>('');
}
