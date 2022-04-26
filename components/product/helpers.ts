
import { Product } from "@common/types/product"




type AvailableChoices = "color" | "size" | string

export type Choices = {
  [P in AvailableChoices]: string
}



export const getVariant = (product: Product, choices: Choices) =>

    product.variants.find(variant =>
        // console.log(variant)
        // return true

        // console.log(variant.options)
        // console.log("Should Match")
        // console.log(choices)
        // debugger
        variant.options.every(variantOption => {
            const optionName = variantOption.displayName.toLocaleLowerCase()
                return optionName in choices && 
                choices[optionName] === variantOption.values[0].label
        })
    )
