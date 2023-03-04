//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
    providedIn: 'root'
})
export class Client {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:8080";
    }

    /**
     * @return OK
     */
    verifyCode(email: string, body: string): Observable<string> {
        let url_ = this.baseUrl + "/user/verify-code/{email}";
        if (email === undefined || email === null)
            throw new Error("The parameter 'email' must be defined.");
        url_ = url_.replace("{email}", encodeURIComponent("" + email));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "*/*"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processVerifyCode(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processVerifyCode(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<string>;
                }
            } else
                return _observableThrow(response_) as any as Observable<string>;
        }));
    }

    protected processVerifyCode(response: HttpResponseBase): Observable<string> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return OK
     */
    registerNewUserAccount(body: RegisterRequest): Observable<AuthenticationResponse> {
        let url_ = this.baseUrl + "/user/register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "*/*"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processRegisterNewUserAccount(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processRegisterNewUserAccount(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<AuthenticationResponse>;
                }
            } else
                return _observableThrow(response_) as any as Observable<AuthenticationResponse>;
        }));
    }

    protected processRegisterNewUserAccount(response: HttpResponseBase): Observable<AuthenticationResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AuthenticationResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return OK
     */
    login(body: AuthenticationRequest): Observable<AuthenticationResponse> {
        let url_ = this.baseUrl + "/user/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "*/*"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processLogin(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processLogin(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<AuthenticationResponse>;
                }
            } else
                return _observableThrow(response_) as any as Observable<AuthenticationResponse>;
        }));
    }

    protected processLogin(response: HttpResponseBase): Observable<AuthenticationResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AuthenticationResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return OK
     */
    getCurrentUser(): Observable<User> {
        let url_ = this.baseUrl + "/user/get-current-user";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "*/*"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetCurrentUser(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCurrentUser(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<User>;
                }
            } else
                return _observableThrow(response_) as any as Observable<User>;
        }));
    }

    protected processGetCurrentUser(response: HttpResponseBase): Observable<User> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = User.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return OK
     */
    getById(id: number): Observable<User> {
        let url_ = this.baseUrl + "/user/get-by-id/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "*/*"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetById(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<User>;
                }
            } else
                return _observableThrow(response_) as any as Observable<User>;
        }));
    }

    protected processGetById(response: HttpResponseBase): Observable<User> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = User.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return OK
     */
    getByEmail(email: string): Observable<User> {
        let url_ = this.baseUrl + "/user/get-by-email/{email}";
        if (email === undefined || email === null)
            throw new Error("The parameter 'email' must be defined.");
        url_ = url_.replace("{email}", encodeURIComponent("" + email));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "*/*"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetByEmail(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetByEmail(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<User>;
                }
            } else
                return _observableThrow(response_) as any as Observable<User>;
        }));
    }

    protected processGetByEmail(response: HttpResponseBase): Observable<User> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = User.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class RegisterRequest implements IRegisterRequest {
    email?: string;
    password?: string;
    phoneNumber?: string;

    [key: string]: any;

    constructor(data?: IRegisterRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            this.email = _data["email"];
            this.password = _data["password"];
            this.phoneNumber = _data["phoneNumber"];
        }
    }

    static fromJS(data: any): RegisterRequest {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["email"] = this.email;
        data["password"] = this.password;
        data["phoneNumber"] = this.phoneNumber;
        return data;
    }

    clone(): RegisterRequest {
        const json = this.toJSON();
        let result = new RegisterRequest();
        result.init(json);
        return result;
    }
}

export interface IRegisterRequest {
    email?: string;
    password?: string;
    phoneNumber?: string;

    [key: string]: any;
}

export class AuthenticationResponse implements IAuthenticationResponse {
    token?: string;
    errorMessage?: string;

    [key: string]: any;

    constructor(data?: IAuthenticationResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            this.token = _data["token"];
            this.errorMessage = _data["errorMessage"];
        }
    }

    static fromJS(data: any): AuthenticationResponse {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticationResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["token"] = this.token;
        data["errorMessage"] = this.errorMessage;
        return data;
    }

    clone(): AuthenticationResponse {
        const json = this.toJSON();
        let result = new AuthenticationResponse();
        result.init(json);
        return result;
    }
}

export interface IAuthenticationResponse {
    token?: string;
    errorMessage?: string;

    [key: string]: any;
}

export class AuthenticationRequest implements IAuthenticationRequest {
    email?: string;
    password?: string;

    [key: string]: any;

    constructor(data?: IAuthenticationRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            this.email = _data["email"];
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): AuthenticationRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticationRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["email"] = this.email;
        data["password"] = this.password;
        return data;
    }

    clone(): AuthenticationRequest {
        const json = this.toJSON();
        let result = new AuthenticationRequest();
        result.init(json);
        return result;
    }
}

export interface IAuthenticationRequest {
    email?: string;
    password?: string;

    [key: string]: any;
}

export class GrantedAuthority implements IGrantedAuthority {
    authority?: string;

    [key: string]: any;

    constructor(data?: IGrantedAuthority) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            this.authority = _data["authority"];
        }
    }

    static fromJS(data: any): GrantedAuthority {
        data = typeof data === 'object' ? data : {};
        let result = new GrantedAuthority();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["authority"] = this.authority;
        return data;
    }

    clone(): GrantedAuthority {
        const json = this.toJSON();
        let result = new GrantedAuthority();
        result.init(json);
        return result;
    }
}

export interface IGrantedAuthority {
    authority?: string;

    [key: string]: any;
}

export class User implements IUser {
    id?: number;
    createdBy?: number;
    createdAt?: Date;
    modifiedBy?: number;
    modifiedAt?: Date;
    email?: string;
    password?: string;
    phoneNumber?: string;
    verificationCode?: string;
    role?: UserRole;
    active?: boolean;
    enabled?: boolean;
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    authorities?: GrantedAuthority[];
    username?: string;
    accountNonLocked?: boolean;

    [key: string]: any;

    constructor(data?: IUser) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            this.id = _data["id"];
            this.createdBy = _data["createdBy"];
            this.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>undefined;
            this.modifiedBy = _data["modifiedBy"];
            this.modifiedAt = _data["modifiedAt"] ? new Date(_data["modifiedAt"].toString()) : <any>undefined;
            this.email = _data["email"];
            this.password = _data["password"];
            this.phoneNumber = _data["phoneNumber"];
            this.verificationCode = _data["verificationCode"];
            this.role = _data["role"];
            this.active = _data["active"];
            this.enabled = _data["enabled"];
            this.accountNonExpired = _data["accountNonExpired"];
            this.credentialsNonExpired = _data["credentialsNonExpired"];
            if (Array.isArray(_data["authorities"])) {
                this.authorities = [] as any;
                for (let item of _data["authorities"])
                    this.authorities!.push(GrantedAuthority.fromJS(item));
            }
            this.username = _data["username"];
            this.accountNonLocked = _data["accountNonLocked"];
        }
    }

    static fromJS(data: any): User {
        data = typeof data === 'object' ? data : {};
        let result = new User();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["id"] = this.id;
        data["createdBy"] = this.createdBy;
        data["createdAt"] = this.createdAt ? this.createdAt.toISOString() : <any>undefined;
        data["modifiedBy"] = this.modifiedBy;
        data["modifiedAt"] = this.modifiedAt ? this.modifiedAt.toISOString() : <any>undefined;
        data["email"] = this.email;
        data["password"] = this.password;
        data["phoneNumber"] = this.phoneNumber;
        data["verificationCode"] = this.verificationCode;
        data["role"] = this.role;
        data["active"] = this.active;
        data["enabled"] = this.enabled;
        data["accountNonExpired"] = this.accountNonExpired;
        data["credentialsNonExpired"] = this.credentialsNonExpired;
        if (Array.isArray(this.authorities)) {
            data["authorities"] = [];
            for (let item of this.authorities)
                data["authorities"].push(item.toJSON());
        }
        data["username"] = this.username;
        data["accountNonLocked"] = this.accountNonLocked;
        return data;
    }

    clone(): User {
        const json = this.toJSON();
        let result = new User();
        result.init(json);
        return result;
    }
}

export interface IUser {
    id?: number;
    createdBy?: number;
    createdAt?: Date;
    modifiedBy?: number;
    modifiedAt?: Date;
    email?: string;
    password?: string;
    phoneNumber?: string;
    verificationCode?: string;
    role?: UserRole;
    active?: boolean;
    enabled?: boolean;
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    authorities?: GrantedAuthority[];
    username?: string;
    accountNonLocked?: boolean;

    [key: string]: any;
}

export type UserRole = "USER" | "ADMIN" | "BUYER" | "SELLER";

export class BusinessException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isBusinessException = true;

    static isBusinessException(obj: any): obj is BusinessException {
        return obj.isBusinessException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new BusinessException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}