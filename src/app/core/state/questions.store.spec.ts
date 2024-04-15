import { TestBed } from '@angular/core/testing';

import { QuestionsStore } from './questions.store';

describe('QuestionsService', () => {
  let service: QuestionsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
