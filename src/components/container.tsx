import React, { useEffect, useState } from "react";
import './container.css';

type TProps = {   
    color: string,
    setActiveCard: Function
}

export const Container:React.FC<TProps> = React.memo((props) => {
    return <div className={`container ${props.color}`}
            onMouseDown={e => props.setActiveCard(e)}
            onDragStart={() => false}
            draggable='false'
        >
    </div>
})
    