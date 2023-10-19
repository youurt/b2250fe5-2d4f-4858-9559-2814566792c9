import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createEvent } from '@eventify-org/common-api';
import { EventsHttpService } from './events-http.service';

describe('EventsHttpService', () => {
  let service: EventsHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsHttpService],
    });
    service = TestBed.inject(EventsHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEvents', () => {
    it('should return an Observable of events', () => {
      const mockEvents = [
        createEvent({ _id: '1', title: 'foo' }),
        createEvent({ _id: '2', title: 'bar' }),
      ];

      service.getEventifyEvents().subscribe((events) => {
        expect(events).toEqual(mockEvents);
      });

      const req = httpMock.expectOne(service['apiUrl']);
      expect(req.request.method).toBe('GET');
      req.flush(mockEvents);
    });
  });
});
