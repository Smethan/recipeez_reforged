import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'


const ThreeDotButton = React.forwardRef((props: any, ref: React.Ref<HTMLAnchorElement>) => {
    const { children, onClick } = props
    return (
        <a
            href=''
            ref={ref}
            onClick={(e) => {
                e.preventDefault()
                props.onClick(e)
            }}>
            {props.children}
            <FontAwesomeIcon icon={faEllipsisV} />
        </a>
    )
})

export default ThreeDotButton;