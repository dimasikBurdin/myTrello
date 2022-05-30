import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from './components/container';

type CardInfo = {
  title: string
  description: string
  color: string
  id: number
}

type SmplifiedCardInfo = {
  color: string
}

function App() {
  const [leftSideElements, setLeftSideElements] = useState(['green', 'red', 'yellow', 'blue']);
  const [rightSideElements, setRightSideElements] = useState(Array<string>());

  const activeCard = useRef<HTMLElement>();
  const [delta, setDelta] = useState<{left: number, top: number}>();
  const newContainer = useRef<Array<string>>();

  function setActiveCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let el = e.target as HTMLElement;
    activeCard.current = el;
    let current = activeCard.current;

    let deltaLeft = e.pageX - current.getBoundingClientRect().left;
    let deltaTop = e.pageY - current.getBoundingClientRect().top;

    current.style.position = 'absolute';
    current.style.zIndex = '1000';

    current.style.left = (e.pageX - deltaLeft)  + 'px';
    current.style.top = (e.pageY - deltaTop) + 'px';

    setDelta({left: deltaLeft, top: deltaTop});
  }

  function onDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(!activeCard.current) return;

    activeCard.current.hidden = true;
    let below = document.elementFromPoint(e.pageX, e.pageY);
    // console.log(below);
    activeCard.current.hidden = false;

    if(activeCard.current.parentElement !== below) {
      if(below)
        below.appendChild(activeCard.current.parentElement);
    }
    
    


    // console.log('drag')
    let pX = e.pageX;
    let pY = e.pageY;

    if(pX)
      activeCard.current.style.left = (pX - delta.left)  + 'px';
    if(pY)
      activeCard.current.style.top = (pY - delta.top) + 'px';
  }

  function endDrag() {
    if(!activeCard.current) return;
    activeCard.current.style.position = 'relative';
    activeCard.current.style.top = '0';
    activeCard.current.style.left = '0';
    activeCard.current.style.zIndex = '0';

    activeCard.current = null;
  }

  
  function dragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onDropRight(e: React.DragEvent<HTMLDivElement>) {
    console.log('drop to right');

    // let currentColor = e.dataTransfer.getData('text').split(' ')[1];
    // if(!rightSideElements.includes(currentColor)) {
    //   setRightSideElements([...rightSideElements, currentColor]);

    //   let ind = leftSideElements.indexOf(currentColor);
    //   if(ind !== -1) {
    //     let temp = [...leftSideElements];
    //     temp.splice(ind, 1);
    //     setLeftSideElements(temp);
    //   }
    // }
  }

  function onDropLeft(e: React.DragEvent<HTMLDivElement>) {
    console.log('drop to left')

    // let currentColor = e.dataTransfer.getData('text').split(' ')[1];
    // if(!leftSideElements.includes(currentColor)) {
    //   setLeftSideElements([...leftSideElements, currentColor]);

    //   let ind = rightSideElements.indexOf(currentColor);
    //   if(ind !== -1) {
    //     let temp = [...rightSideElements];
    //     temp.splice(ind, 1);
    //     setRightSideElements(temp);
    //   }    
    // }
  }

  return (
    <div className='app-container' 
      onMouseMove={e => onDrag(e)}
      onMouseUp={() => endDrag()}
      draggable='false'
      onDragStart={() => false}
    >
      <div className='card-column' 
        onDragStart={() => false}
        draggable='false'        
      >
        {leftSideElements.map(color => {          
          return <div key={color} className='back-card-container'>
              <Container 
                // key={color}
                color={color} 
                setActiveCard={setActiveCard}
              />
            </div>            
        })}

      </div>
      <div className='card-column' 
        onDragStart={() => false}
        draggable='false'
      >
        {leftSideElements.map(color => {          
          return <div key={color} className='back-card-container'>
              <Container 
                // key={color}
                color={color} 
                setActiveCard={setActiveCard}
              />
            </div>            
        })}

      </div>
      <div className='card-column' 
        onDragStart={() => false}
        draggable='false'
      >
        {leftSideElements.map(color => {          
          return <div key={color} className='back-card-container'>
              <Container 
                // key={color}
                color={color} 
                setActiveCard={setActiveCard}
              />
            </div>            
        })}

      </div>
    </div>
    
  );
}

export default App;
