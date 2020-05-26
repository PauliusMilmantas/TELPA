import { TestBed } from "@angular/core/testing";

import { EmployeeAPIService } from "./employee-api.service";

describe("EmployeeAPIService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: EmployeeAPIService = TestBed.get(EmployeeAPIService);
    expect(service).toBeTruthy();
  });
});
