import { Component, OnInit } from "@angular/core";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    name: "",
    description: "",
    price: 0,
    imageURL: ""
  };

  edit: boolean = false;

  constructor(
    private _productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params) {
      this._productService.getProduct(params.id).subscribe(res => {
        this.product = res;
        this.edit = true;
      }),
        err => console.log(err);
    }
  }

  submitProduct() {
    //console.log(this.product);
    this._productService.createProduct(this.product).subscribe(
      res => {
        //console.log(res);
        this.router.navigate(["/product"]);
      },
      err => console.log(err)
    );
  }

  updateProduct() {
    delete this.product.createdAt;
    this._productService
      .updateProduct(this.product._id, this.product)
      .subscribe(
        res => {
          //console.log(res),
          this.router.navigate(["/product"]);
        },
        err => console.log(err)
      );
  }
}
