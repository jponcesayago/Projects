import { Component, OnInit} from '@angular/core';
import { CategoriesService } from "../../../../services/categories.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import {  Category } from "../../../../models/categories.model";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category;


  constructor(
    private categoryService : CategoriesService,
    private router: Router,  private route : ActivatedRoute
  ) { }

  categoryId : string;
  form: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe( (params:Params) =>{
      
      //console.log(this.categoryId)
      if (params.id){
        this.getCategory(params.id);
      }
    });
  }


  async createCategory(data){

    await this.categoryService.createCategory(data).then(
      data =>{
        this.router.navigate(['admin/categories']);
      }
    )
  }


  async updateCategory(data) {
    
    await this.categoryService.updateCategory(this.category._id,data).then(
      data =>{

        this.router.navigate(['admin/categories']);

      }
    )
    
  }

  private async getCategory(id: string){
    await this.categoryService.getCategory(id).then(
      resp  => {
        console.log(resp);
        //this.nameField.setValue(resp.name);
        //this.form.patchValue(resp)
        this.category= resp;
      }
    );
  }
}
