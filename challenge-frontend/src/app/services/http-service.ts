import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HttpService {

    constructor(
        private httpClient: HttpClient
    ) {


    }

    //token
    token: string = sessionStorage.getItem('token');

    //Url getItem

    hostUrl: string = sessionStorage.getItem('url');


    //Headers

    headersGet = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8')
        .set('sessionToken', this.token);

    headersPost = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
        .set('sessionToken', this.token);

    async getSearch(searchKey: string) {
        let url = this.hostUrl + '/search?q=' + searchKey;

        let requestData: any = null;

        await this.httpClient.get<any>(url, { headers: this.headersGet }).toPromise().then(
            data => {
                //console.log(data);
                if (data != null) {
                    requestData = data;
                } else {
                    requestData = null;
                }

            },
            error => {
                //console.log(error);
                if (error.status === 401) {
                    requestData = error;
                }
            }
        );

        return requestData;

    }


    async getSearchByCategory(searchCategory: string) {
        let url = this.hostUrl + '/search?category=' + searchCategory;

        let requestData: any = null;

        await this.httpClient.get<any>(url, { headers: this.headersGet }).toPromise().then(
            data => {
                //console.log(data);
                if (data != null) {
                    requestData = data;
                } else {
                    requestData = null;
                }

            },
            error => {
                //console.log(error);
                if (error.status === 401) {
                    requestData = error;
                }
            }
        );

        return requestData;

    }


    async getItems(itemId: string) {
        let url = this.hostUrl + '/items?ids=' + itemId;

        let requestData: any = null;

        await this.httpClient.get<any>(url, { headers: this.headersGet }).toPromise().then(
            data => {
                //console.log(data);
                if (data != null) {
                    requestData = data;
                } else {
                    requestData = null;
                }

            },
            error => {
                //console.log(error);
                if (error.status === 401) {
                    requestData = error;
                }
            }
        );

        return requestData;

    }
}
