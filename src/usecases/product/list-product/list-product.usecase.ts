import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gatway";
import { UseCase } from "../../usecase";

export type ListProductInputDto = void


export type ListProductOutputDto = {
    products: {
        id: string,
        name: string
        price: number
        quantity: number
    }[]
}

export class ListProductUsecase implements UseCase<ListProductInputDto, ListProductOutputDto> {

    private readonly productGateway: ProductGateway

    private constructor(productGateway: ProductGateway) {
        this.productGateway = productGateway
    }

    public static create(productGateway: ProductGateway) {
        return new ListProductUsecase(productGateway)
    }

    async execute(): Promise<ListProductOutputDto> {
        const products = await this.productGateway.list()

        return this.presentOutput(products)
    }


    presentOutput(products: Product[]): ListProductOutputDto {
        return {
            products: products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.price  
                }
            })
        }
    }
}