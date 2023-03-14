import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, of, from, switchMap } from "rxjs";
import { Address } from "../ngswag/client";

@Injectable({
  providedIn: "root",
})
export class GoogleMapService {
  apiLoaded: Observable<boolean>;
  geocoder?: google.maps.Geocoder;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyC_FzXd_agkmiZ_pEH6WB_oCskuwWyna58",
        "callback"
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );

    this.geocoder = new google.maps.Geocoder();
  }

  getAddressDetails(address: string): Observable<Address | undefined> {
    if (!this.geocoder) return of(undefined);

    return from(this.geocoder.geocode({ address: address })).pipe(
      catchError(() => {
        return of(undefined);
      }),
      switchMap((res) => {
        if (!res || !res.results[0]) {
          return of(undefined);
        }

        const result = res.results[0];

        return of(
          new Address({
            longitude: result.geometry.location.lng(),
            latitude: result.geometry.location.lat(),
          })
        );
      })
    );
  }
}
