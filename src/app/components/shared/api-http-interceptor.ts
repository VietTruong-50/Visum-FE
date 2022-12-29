import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, finalize, Observable, retry, throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {GlobalConstants} from "./GlobalConstants";
import { DialogService } from "src/app/service/dialog.service";


@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  private totalRequest = 0

  constructor(
    private cookieService: CookieService,
    private dialog: DialogService
  ) {
  }
  intercept
  (
    request: HttpRequest<any>,
    next: HttpHandler
  )
    : Observable<HttpEvent<any>> {
    this.totalRequest++
    console.log(this.totalRequest)
    if (this.totalRequest === 1) {
      this.dialog.showSpinnerDialog()
    }

    const dupReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.cookieService.get(
          GlobalConstants.authToken
        )}`,
      },
    })

    return next.handle(dupReq).pipe(
      finalize(() => {
        if (this.totalRequest > 0) this.totalRequest--;
        console.log(this.totalRequest)
        if(this.totalRequest === 0) {
          this.dialog.hideSpinnerDialog()
        }

      }),
      retry(0),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        return throwError(error);
      }
    )
    )
  }
}

export let apiHttpInterceptorProvider = {
  provider: HTTP_INTERCEPTORS,
  useClass: ApiHttpInterceptor,
  multi: true
}
