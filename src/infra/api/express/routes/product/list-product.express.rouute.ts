import { Request, Response } from "express"
import { ListProductInputDto, ListProductOutputDto, ListProductUsecase } from "../../../../../usecases/product/list-product/list-product.usecase"
import { HttpMethod, Route } from "../route"

export type ListProductResponseDto = {
    products: {
        id: string
        name: string
        price: number
    }[]
}

export class ListProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listProductService: ListProductUsecase
    ) { }


    static create(listProductService: ListProductUsecase) {
        return new ListProductRoute('/products', 'get', listProductService)
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            const output = await this.listProductService.execute()

            const responseBody = this.present(output)

            response.status(200).json(responseBody).send()
        }
    }

    present(input: ListProductOutputDto): ListProductResponseDto {
        const response: ListProductResponseDto = {
            products: input.products.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price
                }
            })
        }

        return response
    }

    getMethod(): HttpMethod {
        return this.method
    }

    getPath(): string {
        return this.path
    }
}