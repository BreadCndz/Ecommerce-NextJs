


import useCart, { UseCart } from "@common/cart/use-cart"
import { Cart } from "@common/types/cart"
import { SWRHook } from "@common/types/hooks"
import { Checkout } from "@framework/schema"
import { checkoutToCart, createCheckout, getCheckoutQuery } from "@framework/utils"
import { useMemo } from "react"


export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string
  }
  fetcherOutput: {
    node: Checkout
  }
  data: Cart
}


export default useCart as UseCart<typeof handler>

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
  // get checkout query

  query: getCheckoutQuery
},

  async fetcher({
    fetch,
    options,
    input: { checkoutId }
  }) {
     //debugger
    let checkout: Checkout
    //debugger
    // If there is no checkout then create checkout
    if (checkoutId) {
      //-debugger
      const { data } = await fetch({
        ...options,
        variables: {
          checkoutId
        }
      })
      //-debugger
      checkout = data.node
    } else {
      checkout = await createCheckout(fetch as any)
    }

    const cart = checkoutToCart(checkout)



    //-debugger
    //checkout normalizationism
    return cart

  },
  useHook: ({useData}) => () => {
    // debugger
    const result = useData({
      swrOptions: {
        revalidateOnFocus: false
      }
    })
    // debugger

    return useMemo(() => {
      return {
        ...result,
        isEmpty: (result.data?.lineItems.length ?? 0) <= 0
      }
    }, [result])


  }
}