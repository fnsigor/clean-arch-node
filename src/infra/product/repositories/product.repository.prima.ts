import { PrismaClient } from "@prisma/client";
import { ProductGateway } from "../../../domain/product/gateway/product.gatway";
import { Product } from "../../../domain/product/entity/product.entity";

export class ProductRepositoryPrisma implements ProductGateway {
    private readonly prismaClient: PrismaClient

    private constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }


    static create(prismaClient: PrismaClient) {
        return new ProductRepositoryPrisma(prismaClient)
    }

    async save(product: Product): Promise<void> {

        //aqui estamos convertendo modelos da entidade para modelos do banco
        //é interessante não salvar no banco direto, pois a entidade pode ter campos e regras diferentes do que esta no banco

        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }

        await this.prismaClient.product.create({ data })
    }

    async list(): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany()

        //aqui estamos convertendo modelos do banco para modelos da entidade
        const productList = products.map(product => {
            return Product.with({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            })
        })

        return productList
    }




}