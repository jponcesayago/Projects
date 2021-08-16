import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainModuleComponent } from './main-module/main-module.component';
import { ProductDetailComponent } from './main-module/product-detail/product-detail.component';
import { ProductListComponent } from './main-module/product-list/product-list.component';

const routes: Routes = [

    { path: '', redirectTo: '/main-module', pathMatch: 'full' },
    {
        path: 'main-module', component: MainModuleComponent,
        data: { animation: 'MainModuleComponent' },
        children: [
            {
                path: 'product-detail',
                component: ProductDetailComponent,
                data: { animation: 'ProductDetailComponent' },
            },
            {
                path: 'product-list',
                component: ProductListComponent,
                data: { animation: 'ProductListComponent' },
            },

        ]
    },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
