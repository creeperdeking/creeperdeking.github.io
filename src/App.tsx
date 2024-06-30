import React from 'react';

import './App.css';
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch';

const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
  
    return (
      <div className="tools">
        <button onClick={() => zoomIn()}>+</button>
        <button onClick={() => zoomOut()}>-</button>
        <button onClick={() => resetTransform()}>x</button>
      </div>
    );
  };

const App: React.FC = () => {
    return (
        <>
        <h1>The Modernity Tech Tree: A comprehensive summary of innovation in the modern era</h1>
        <h2>Source: I saw it in a dream</h2>
        <div className='svg-container'>
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <Controls />
              <TransformComponent>
              <img src="/tech_tree.svg" alt="Tech Tree" style={{
              width: '100%',
                height: '100%',
          }}/>
              </TransformComponent>
            </>
          )}
        </TransformWrapper></div></>
      );
}

export default App;