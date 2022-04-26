
import "../assets/main.css"
import 'keen-slider/keen-slider.min.css'
import { AppProps } from "next/app"
import { FC, ReactNode } from "react"
import { UIProvider } from "@components/ui/context"


const Noop: FC<{children:ReactNode}> = ({children}) => 
<>{children}</>

function MyApp({Component, pageProps}: AppProps & 
{Component: {Layout:FC}}) {
  const Layout = Component.Layout ?? Noop
  // const ui = useUI()


  return (
    // <UIProvider>
    // <>
    //   <Component {...pageProps} />
    // </>
    // </UIProvider>

    <UIProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UIProvider>

  )
}

export default MyApp