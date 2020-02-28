import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Physics,
  Vector,
  useCallbackAsCurrent,
} from '@hex-engine/2d';
import Floor from './Floor';
import Box from './Box';
import Button from './Button';
import Ball from './Ball';
import Triangle from './Triangle';

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({backgroundColor: 'white'}));
  canvas.fullscreen({pixelZoom: 2});

  useNewComponent(Physics.Engine);

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2,
  );

  useChild(() => Floor(canvasCenter.addY(200)));
  useChild(() => Box(canvasCenter));
  const useChildAsMyRoot = useCallbackAsCurrent(useChild);
  const childrenTypes = [Ball, Box, Triangle];
  function newBox() {
    const childType =
      childrenTypes[Math.floor(Math.random() * childrenTypes.length)];
    useChildAsMyRoot(() => childType(canvasCenter));
  }

  useChild(() => Button(new Vector(0, 0), newBox));
}
