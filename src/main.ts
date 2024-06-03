import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product.express.route";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product.express.rouute";
import { ProductRepositoryPrisma } from "./infra/product/repositories/product.repository.prima";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUsecase } from "./usecases/product/create-product/create-product.usecase";
import { ListProductUsecase } from "./usecases/product/list-product/list-product.usecase";

function main(){
    const aRepository = ProductRepositoryPrisma.create(prisma)

    const createProductUsecase = CreateProductUsecase.create(aRepository)
    const listProductUsecase = ListProductUsecase.create(aRepository)


    const createRoute = CreateProductRoute.create(createProductUsecase)
    const listRoute = ListProductRoute.create(listProductUsecase)

    const port = 8080
    
    const api = ApiExpress.create([createRoute, listRoute])

    api.start(port)

}

main()