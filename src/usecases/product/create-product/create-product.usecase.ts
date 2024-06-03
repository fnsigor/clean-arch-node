import { Product } from "../../../domain/product/entity/product.entity"
import { ProductGateway } from "../../../domain/product/gateway/product.gatway"
import { UseCase } from "../../usecase"

export type CreateProductInputDto = {
    name: string,
    price: number
}

export type CreateProductOututDto = {
    id: string
}


export class CreateProductUsecase implements UseCase<CreateProductInputDto, CreateProductOututDto> {

    private constructor(private readonly productGateway: ProductGateway) {

    }

    public static create(productGateway: ProductGateway) {
        return new CreateProductUsecase(productGateway)
    }

    async execute({ name, price }: CreateProductInputDto): Promise<CreateProductOututDto> {
        const aProduct = Product.create(name, price)//comunica com entity

        await this.productGateway.save(aProduct)//comunica com o gateway que salva no banco

        // const output = {
        //     id: product.id
        // }

        // return output

        return this.presentOutput(aProduct)
    }

    //essa parte é opcional, e tem gente que gosta de fazer em arquivo separado
    private presentOutput(product: Product): CreateProductOututDto{
        const output = {
            id: product.id
        }

        return output
    }
}