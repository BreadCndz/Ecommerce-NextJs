
import { ReactNode, FC, ComponentType, HTMLAttributes } from "react"

interface Props {
    children: ReactNode | ReactNode[]
    el?: ComponentType<HTMLAttributes<HTMLElement>>
}

const Container: FC<Props> = ({children, el: Component = "div"}) => {

    return (
        <div className="px-6 mx-auto max-w-8xl">
            {children}
        </div>
    )
}

export default Container