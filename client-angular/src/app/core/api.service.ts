import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
    Country,
    Customer,
    AddCustomer,
    FilePath,
    Product,
    Login,
    User,
} from '../shared/types';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private token = '';

    setToken(value: string) {
        this.token = value;
    }
    constructor(private http: HttpClient) {}

    getCustomersList(): Observable<Array<Customer>> {
        return this.http.get<Array<Customer>>(
            `${environment.serverUrl}/customers`
        );
    }

    getSortedCustomers(
        column: string,
        direction: string
    ): Observable<Array<Customer>> {
        return this.http.get<Array<Customer>>(
            `${environment.serverUrl}/customers?column=${column}&sort=${direction}`
        );
    }

    exportCustomers(): Observable<FilePath> {
        return this.http.get<FilePath>(
            `${environment.serverUrl}/customers/export`
        );
    }

    findCustomer(searchTerm: string): Observable<Array<Customer>> {
        return this.http.get<Array<Customer>>(
            `${environment.serverUrl}/customers/find?search=${searchTerm}`
        );
    }

    addCustomer(customer: AddCustomer): Observable<Customer> {
        return this.http.post<Customer>(
            `${environment.serverUrl}/customers`,
            customer,
            { headers: { 'Content-Type': 'application/json' } }
        );
    }

    getCountries(): Observable<Array<Country>> {
        return this.http.get<Array<Country>>(
            `${environment.serverUrl}/countries`
        );
    }
    getProductsList(): Observable<Array<Product>> {
        return this.http.get<Array<Product>>(
            `${environment.serverUrl}/products`
        );
    }

    exportProducts(): Observable<FilePath> {
        return this.http.get<FilePath>(
            `${environment.serverUrl}/products/export`
        );
    }

    login(details: Login): Observable<User> {
        return this.http.post<User>(`${environment.serverUrl}/login`, details, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    GET<T>(url: string): Observable<T> {
        return this.http.get<T>(`${environment.serverUrl}/${url}`, {
            headers: { 'x-auth-token': this.token },
        });
    }
}
