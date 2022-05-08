import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../services/api.service';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  formValue !:FormGroup;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  productModelObj:ProductModel = new ProductModel();
  ProductData !:any;
  addModal : boolean;
 
  constructor(private formBuilder:FormBuilder,private api : ApiService) { }
   
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      description:[''],
      price:[''],
    })

    this.getAllProduct();
  }

  addProduct(){
    this.addModal = true;    
  }

  postProductDetails(){
    this.productModelObj.name = this.formValue.value.name;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;

    this.api.postProduct(this.productModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Product Added Successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset(); 
      this.getAllProduct();
    },
      (    err: any)=>{
      alert("Something Went Wrong...")
    })
  }

  getAllProduct(){
    this.api.getProduct()
    .subscribe(res=>{
      this.ProductData=res;
    })
  }

  deleteProduct1(id : any){
    this.api.deleteProduct(id)
    .subscribe(res=>{      
      alert("Product deleted");
      this.getAllProduct();
    })
  }

  onEdit(row:any){
    this.productModelObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['price'].setValue(row.price);
  }

  updateProductDetails(){
    this.productModelObj.name = this.formValue.value.name;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;
    console.log(this.productModelObj);
    
    this.api.updateProduct(this.productModelObj,this.productModelObj.id)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Product Updated Successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset(); 
      this.getAllProduct();
    },
      (    err: any)=>{
      alert("Something Went Wrong...")
      console.log(err);
    })
  }

}
