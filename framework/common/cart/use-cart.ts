


// import { useHook } from "../utils/use-hook"
// import { ApiHooks } from "@common/types/api"
import { useHook, useSWRHook } from "../utils/use-hook"
import { ApiHooks, SWRHook } from "@common/types/hooks"
import Cookies from "js-cookie"
// import { SHOPIFY_CHECKOUT_ID_COOKIE } from "@framework/const"
import { useApiProvider } from "@common"

export type UseCart<
  H extends SWRHook = SWRHook<any>
> = ReturnType<H["useHook"]>


const useCart: UseCart = () => {
  const hook = useHook((hooks: ApiHooks) => hooks.cart.useCart)
  const { checkoutCookie } = useApiProvider()


  const fetcherWrapper: typeof hook.fetcher = (context: any) => {
    context.input.checkoutId = Cookies.get(checkoutCookie)
    //debugger
    return hook.fetcher(context)
  }


  return useSWRHook({...hook, fetcher: fetcherWrapper})()
}

export default useCart