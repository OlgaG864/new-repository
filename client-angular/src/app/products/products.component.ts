import { Component, OnInit } from '@angular/core';
import { FilePath, Product } from '../shared/types';
import { ApiService } from '../core/api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    products!: Array<Product>;
    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.apiService.getProductsList().subscribe({
            next: (data: Array<Product>) => {
                this.products = data;
            },
            error: (err) => console.error(err),
            // complete: () => console.log(`complete`)
        });
    }
    imagePath(img: string | null): string {
        return !img ? '' : `../../assets/images/${img}`;
    }

    exportProductsData() {
        this.apiService.exportProducts().subscribe({
            next: (data: FilePath) => {
                window.open(`${environment.serverUrl}/${data.name}`);
            },
            error: (err) => console.error(err),
        });
    }
}
