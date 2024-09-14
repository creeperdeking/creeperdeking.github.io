import React from 'react';

import './tech-tree.css';
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch';
import { Button } from 'react-bootstrap';

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools">
      <Button variant="primary" onClick={() => zoomIn()}>
        +
      </Button>
      <Button variant="primary" onClick={() => zoomOut()}>
        -
      </Button>
      <Button variant="primary" onClick={() => resetTransform()}>
        x
      </Button>
    </div>
  );
};

const TechTree: React.FC = () => {
  return (
    <>
      <h1>The Modernity Tech Tree: A comprehensive summary of innovation in the modern era</h1>
      <h2>Source: I saw it in a dream!</h2>
      <div className="svg-container">
        <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
          <>
            <Controls />
            <TransformComponent>
              <img
                src="/tech_tree.svg"
                alt="Tech Tree"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </TransformComponent>
          </>
        </TransformWrapper>
      </div>
    </>
  );
};

export default TechTree;
