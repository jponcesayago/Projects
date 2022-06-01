import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Category } from ".././models/categories.model";

@Injectable({
    providedIn:'root'
})

export class CategoriesService{

    constructor(
        private httpClient : HttpClient
    ){

    }

    async getAllCategories(){
        let resp: Category [] = [];
        await  this.httpClient.get<Category[]>(`${environment.url_api}/categories`)
        .toPromise().then(value=>{
           
            resp = value;
        });
        return resp;
    } 

    async getCategory(id:string){
        let resp: Category;
        await  this.httpClient.get<Category>(`${environment.url_api}/categories/${id}`)
        .toPromise().then(value=>{
           
            resp = value;
        });
        return resp;
    } 


    async createCategory(data: Partial<Category>){
        let resp: Category;
        await  this.httpClient.post<Category>(`${environment.url_api}/categories`,data)
        .toPromise().then(value=>{
            console.log(value)
            resp = value;
        });
        return resp;
    }

    async updateCategory(id: string,data: Partial<Category>){
        let resp: Category;
         await  this.httpClient.put<Category>(`${environment.url_api}/categories/${id}`,data)
        .toPromise().then(value=>{
            console.log(value);
            resp = value;
        });
        return resp;
    }

    checkCategory(name: string){
       /*  let resp: boolean;
        await  this.httpClient.post<any>(`${environment.url_api}/categories//availability`,{name})
        .toPromise().then(value=>{
            console.log(value);
            resp = value.isAvailable;
        });

        return resp;
        */
        return this.httpClient.post<any>(`${environment.url_api}/categories/availability`,{name})
    } 
 
}