import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from './components/container';

function App() {
  const [leftSideElements, setLeftSideElements] = useState(['green', 'red', 'yellow', 'blue']);
  const [rightSideElements, setRightSideElements] = useState(Array<string>());

  const [mouseMoveEvent, setMouseMoveEvent] = useState<React.MouseEvent<HTMLDivElement, MouseEvent>>();
  const [isMouseUp, setIsMouseUp] = useState(true);


  function dragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onDropRight(e: React.DragEvent<HTMLDivElement>) {
    console.log('drop to right');

    let currentColor = e.dataTransfer.getData('text').split(' ')[1];
    if(!rightSideElements.includes(currentColor)) {
      setRightSideElements([...rightSideElements, currentColor]);

      let ind = leftSideElements.indexOf(currentColor);
      if(ind !== -1) {
        let temp = [...leftSideElements];
        temp.splice(ind, 1);
        setLeftSideElements(temp);
      }
    }
  }

  function onDropLeft(e: React.DragEvent<HTMLDivElement>) {
    console.log('drop to left')

    let currentColor = e.dataTransfer.getData('text').split(' ')[1];
    if(!leftSideElements.includes(currentColor)) {
      setLeftSideElements([...leftSideElements, currentColor]);

      let ind = rightSideElements.indexOf(currentColor);
      if(ind !== -1) {
        let temp = [...rightSideElements];
        temp.splice(ind, 1);
        setRightSideElements(temp);
      }    
    }
  }

  return (
    <div className='app-container' onMouseMove={e => setMouseMoveEvent(e)} onMouseUp={() => setIsMouseUp(true)} onMouseDown={() => setIsMouseUp(false)}>
      <div className='left-side' 
        // onDragOver={dragOver} 
        // onDrop={e => onDropLeft(e)}
      >
      {leftSideElements.map(color => {          
          return <Container key={color} color={color} mouseMoveEvent={mouseMoveEvent} isMouseUp={isMouseUp} />;
        })}

      {/* <Container color={'green'}/> */}
      </div>
      {/* <div className='right-side' 
        // onDragOver={dragOver} 
        // onDrop={e => onDropRight(e)}
      >
        {rightSideElements.map(color => {          
          return <Container key={color} color={color}/>;
        })}
      </div> */}
      
    </div>
    
  );
}

export default App;
