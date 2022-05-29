import React, { useEffect, useState } from "react";
import './container.css';

type TProps = {   
    color: string,
    mouseMoveEvent: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined,
    isMouseUp: boolean
}

export const Container:React.FC<TProps> = React.memo((props) => {
    const [activeElement, setActiveElement] = useState<HTMLElement>();
    const [delta, setDelta] = useState({left: Number(), top: Number()});

    function onDragStart(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let el = e.target as HTMLElement;

        let deltaLeft = e.pageX - el.getBoundingClientRect().left;
        let deltaTop = e.pageY - el.getBoundingClientRect().top;

        el.style.position = 'absolute';

        setActiveElement(el);
        setDelta({left: deltaLeft, top: deltaTop});
    }

    useEffect(() => {
        if(!activeElement) return;
        if(activeElement && (props.mouseMoveEvent?.pageX || props.mouseMoveEvent?.pageY)) {
            let pX = props.mouseMoveEvent?.pageX as number;
            let pY = props.mouseMoveEvent?.pageY as number;

            activeElement.style.left = (pX - delta.left)  + 'px';
            activeElement.style.top = (pY - delta.top) + 'px';

            console.log('active')
        }

        return () => {return}
    }, [activeElement, props.mouseMoveEvent?.pageX, props.mouseMoveEvent?.pageY]);

    useEffect(() => {
        if(!props.isMouseUp || !activeElement) return;
        // activeElement.style.position = 'relative';
        setActiveElement(undefined);
        setDelta({left: 0, top: 0});
    }, [props.isMouseUp]);

    return <div className={`container ${props.color}`}
                onMouseDown={e => onDragStart(e)}
            >
    </div>
})
    