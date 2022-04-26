

import { createContext, ReactNode, useContext, useMemo } from "react";
import { ApiConfig, ApiProviderContext } from "./types/api";
import { ApiHooks } from "./types/hooks";
// import { getConfig } from "@framework/api/config"


interface ApiProviderProps {
    children: ReactNode | ReactNode[]
    config: ApiConfig,
    hooks: ApiHooks
}

// const config = getConfig()


export const ApiContext = createContext<Partial<ApiProviderContext>>({})
export const ApiProvider = ({
    children,
    config,
    hooks
}: ApiProviderProps ) => {


    const coreConfig = useMemo(() => {
        return {
            fetcher: config.fetch,
            hooks,
            checkoutCookie: config.checkoutCookie
        }
    }, [
        config.fetch,
        config.checkoutCookie,
        hooks
      ])


    return (
        <ApiContext.Provider value={coreConfig}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApiProvider = () => {
    return useContext(ApiContext) as ApiProviderContext
}

