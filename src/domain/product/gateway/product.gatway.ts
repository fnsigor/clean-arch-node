/*
 o gateway vai servir comno uma interface de saida de dados da entity pra camadas externas

 ele vai descrever como devem ser os metodos da camada verde (controllers, gateways) atraves de contratos/interfaces

*/

import { Product } from "../entity/product.entity";


export interface ProductGateway {
    save(product: Product): Promise<void>
    list(): Promise<Product[]>
}