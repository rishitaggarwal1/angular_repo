import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';
import { ALL_URLS } from '../utils/api-urls';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
    
    constructor(private userService: UserService){ }
    
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Clone the request to add the new header
        let url = new URL(req.url);
        let checkOrigin = ALL_URLS.map( item => new URL(item).hostname).includes(url.hostname);
        
        if(this.userService.isLoggedIn && checkOrigin){
            const clonedRequest = req.clone({ headers: req.headers.append('Authorization', `Bearer ${this.userService.token}`) });
            // Pass the cloned request instead of the original request to the next handle
            return next.handle(clonedRequest);
        }
        return next.handle(req);
    }
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    
    constructor(private userService: UserService, private router: Router){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Interceptor called');
        if(this.userService.isLoggedIn){
            return next.handle(req)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        if(!(error instanceof ErrorEvent) 
                            && error.status === 401 
                                && error.message){
                                    this.userService.logout();
                                    this.router.navigate(['/login', {error: [1]}])
                                }
                                
                        return throwError(error);
                    })
                );
        }
        return next.handle(req);   
    }
   
   }
