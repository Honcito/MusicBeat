import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login and return a token', () => {
    const mockToken = 'dummy-jwt-token';
    const email = 'test@example.com';
    const password = 'password123';

    service.login(email, password).subscribe((response: any) => {
      expect(response.token).toBe(mockToken);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/users/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: mockToken });
  });

  it('should set Authorization header when calling getAuthHeaders', () => {
    localStorage.setItem('token', 'dummy-token');
    const headers = service.getAuthHeaders();
    expect(headers.headers.get('Authorization')).toBe('Bearer dummy-token');
  });

  it('should remove token from localStorage on logout', () => {
    localStorage.setItem('token', 'dummy-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
