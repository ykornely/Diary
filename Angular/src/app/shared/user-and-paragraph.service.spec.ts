import { TestBed } from '@angular/core/testing';

import { UserAndParagraphService } from './user-and-paragraph.service';

describe('UserService', () => {
  let service: UserAndParagraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAndParagraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
