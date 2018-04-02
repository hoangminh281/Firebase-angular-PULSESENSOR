import { TestBed, inject } from '@angular/core/testing';

import { GetHeartBeatService } from './get-heart-beat.service';

describe('GetHeartBeatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetHeartBeatService]
    });
  });

  it('should be created', inject([GetHeartBeatService], (service: GetHeartBeatService) => {
    expect(service).toBeTruthy();
  }));
});
