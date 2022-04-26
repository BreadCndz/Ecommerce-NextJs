
import { ProductConnection } from "../schema"
import { normalizeProduct, getAllProductQuery } from "../utils"
import { Product } from "@common/types/product"
import { ApiConfig } from "@common/types/api"


type ReturnType = {
    products: ProductConnection
}

//function to create new products

const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {

    const {data} = await config.fetch<ReturnType>({
        query: getAllProductQuery})

    const products = data.products.edges.map(({ node: product }) => 
    normalizeProduct(product)

    ) ?? []

    // return products
    return products
} 

export default getAllProducts