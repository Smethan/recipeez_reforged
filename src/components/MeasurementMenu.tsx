import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const MeasurementMenu = React.forwardRef((props: any, ref: React.Ref<HTMLDivElement>) => {
    const { children, style, className, 'aria-labelledby': labeledBy } = props;
    const [value, setValue] = useState('')
    return (
        <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
        >
            <FormControl
                autoFocus
                className="mx-3 my-2 w-auto"
                placeholder="Type to filter..."
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <ul className="list-unstyled">
                {React.Children.toArray(children).filter(
                    (child: any) =>
                        !value || child.props.children.toLowerCase().startsWith(value),
                )}
            </ul>
        </div>);
});

export default MeasurementMenu;