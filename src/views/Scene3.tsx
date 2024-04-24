import '../App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Splat, SplatMaterialType } from '../Splat';
import { ReactNode, useRef, useState } from 'react';
import { content } from '../content';
import Button from '../components/button';

function Scene3() {
  const container = useRef<HTMLDivElement>(null!);
  const [step, setStep] = useState(0);
  return (
    <>
      <Dialog
        title={content[step].title}
        body={content[step].body}
        next={() => {
          setStep(Math.min(step + 1, content.length - 1));
        }}
        previous={() => {
          setStep(Math.max(step - 1, 0));
        }}
        prevDisabled={step === 0}
        nextDisabled={step === content.length - 1}
      />
      <div id="canvas-container" ref={container}>
        <Canvas
          dpr={[0.5, 1]}
          camera={{ position: [-3, 1, -5.5], fov: 45, near: 1, far: 100 }}
          eventSource={container}
          eventPrefix="client">
          <Scene {...content[step].sceneProps} />
        </Canvas>
      </div>
    </>
  );
}

function Dialog(props: {
  title: string;
  body: string | ReactNode;
  next: () => void;
  previous: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}) {
  const { title, body, next, previous, prevDisabled, nextDisabled } = props;
  return (
    <div className="dialog" style={{ display: 'none'}}>
      <h1>Getting Creative with Gaussian Splatting</h1>
      <h2>{title}</h2>
      <div className="dialog__body">{typeof body === 'string' ? <p>{body}</p> : body}</div>
      <div className="dialog__button-container">
        <Button
          onClick={previous}
          disabled={!!prevDisabled}
          title={'Previous'} />
        <Button
          onClick={next}
          disabled={!!nextDisabled}
          title={'Next'} />
      </div>
    </div>
  );
}

function Scene(props: { mode?: SplatMaterialType | 'badSorting' | 'alphaTest' | 'alphaHash' }) {
  const { mode = 'base' } = props;
  const showSecondModel = mode === 'alphaTest' || mode === 'alphaHash' || mode === 'badSorting';
  const materialType = showSecondModel ? 'base' : mode;

  return (
    <>
      <color attach="background" args={['#171720']} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Splat
        src="http://s3.ciptadusa.com/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2NvbW1vbi1idWNrZXQvdHNhZy5zcGxhdD9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUpGTlEyTFVZNFVWTjhUVVFNVUNaJTJGMjAyNDA0MjQlMkZzZ3AtY29udGFibyUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDA0MjRUMTIyNzM4WiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKS1JrNVJNa3hWV1RSVlZrNDRWRlZSVFZWRFdpSXNJbVY0Y0NJNk1UY3hOREF3TWpBNE55d2ljR0Z5Wlc1MElqb2ljbUZ0WVNKOS5tYmZFalVXRUNoUVVQQi12aWtGNVNOLUdxNkx3cFR0QjAtRGR3WURROXNtWDk3bDhJT3VkRkJPOUc5aGFOV1h6ZmpSOXV3UjRYU1pBZGVwSFFxWE9kUSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTYzNjFmMjEwOGNhNjA4MzEyMWRkMTM0NGU2ZjAxMzQ5NDg1NzAwOWYxOTM2ZjhmYzQ1YWM0ODJkOTBhZTEzMGY="
        position={[0, 0, 0]}
        materialType={materialType}
        alphaTest={mode === 'alphaTest' ? 0.1 : undefined}
        alphaHash={mode === 'alphaHash'}
      />
    </>
  );
}

export default Scene3;

