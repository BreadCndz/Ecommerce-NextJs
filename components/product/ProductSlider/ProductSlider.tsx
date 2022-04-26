
import classNames from "classnames"
import React, { FC, Children, isValidElement, useState } from"react"
import s from "./ProductSlider.module.css"
import { useKeenSlider } from "keen-slider/react"
import cn from "classnames"



const ProductSlider: FC = ({children}) => {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: true,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel)
        //   console.log("Changing to slide: ", slider.track.details.rel)
        },
        created() {
          setLoaded(true)
        },
      })

      //console.log(currentSlide)

    return (
        <div className={s.root}>
            <div 
            ref={sliderRef as React.LegacyRef<HTMLDivElement>} 
            className="keen-slider h-full transition-opacity">
                <button 
                    onClick={instanceRef.current?.prev}
                    className= {cn(s.leftControl, s.control)}
                />
                <button 
                    onClick={instanceRef.current?.next}
                    className= {cn(s.rightControl, s.control)}
                />
                {Children.map(children, child => {

                    if (isValidElement(child)) {

                        return {
                            ...child,
                            props: {
                                ...child.props,
                                className: `${
                                    child.props.className ? `${child.props.className}` : ""
                                } keen-slider__slide`
                            }
                        }

                        // return React.cloneElement(child, {
                        //     className: `${
                        //         child.props.className ? `${child.props.className}` : ""
                        //     } keen-slider__slide`
                        // })
                    }
                })}
            </div>
        </div>
    )
}


export default ProductSlider