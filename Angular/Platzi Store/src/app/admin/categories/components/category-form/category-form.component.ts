import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { CategoriesService } from "../../../../services/categories.service";

import { Router, ActivatedRoute, Params } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { take, finalize } from "rxjs/operators";
import {  Category } from "../../../../models/categories.model";
import { MyValidators } from "../../../../utils/validators";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  categoryId : string;

  @Input() category:Category;
  @Output() create = new EventEmitter;
  @Output() update = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder, private categoryService : CategoriesService,
    private router: Router, private storage : AngularFireStorage, private route : ActivatedRoute
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
   /*  this.route.params.subscribe( (params:Params) =>{
      this.categoryId = params.id;
      //console.log(this.categoryId)
      if (this.categoryId){
        this.getCategory();
      }
    }); */
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(5)],
        [MyValidators.isCategoryValid(this.categoryService)]],
      image: ['', [Validators.required]]
    });
    
    
  }

  get nameField(){
    return this.form.get('name');
  }

  
  get imageField(){
    return this.form.get('image');
  }

  async save(){
    if (this.form.valid){

      if ( this.categoryId){
       /*  this.updateCategory();*/
       this.update.emit(this.form.value);
      }else{
        this.create.emit(this.form.value)
        /* await this.categoryService.createCategory(this.form.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['./admin/categories'])
        }); */
      }     
    }else{
      this.form.markAllAsTouched();

    }
  }

  

  uploadFile(e)
  {
    console.log(e);

    const image = e.target.files[0];
    const name = 'category.jpg';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name,image);

    task.snapshotChanges()
    .pipe(
      finalize(()=> {
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe(url =>{
          console.log(url);
          this.imageField.setValue(url);
        })
      }
    ))
    .subscribe();


  }


}
