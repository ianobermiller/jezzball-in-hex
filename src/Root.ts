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

  const physics = useNewComponent(() =>
    Physics.Engine({gravity: new Vector(0, 0)}),
  );

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2,
  );

  useChild(() => Floor(new Vector(800, 25), canvasCenter.addY(200)));
  useChild(() => Floor(new Vector(800, 25), canvasCenter.subtractY(200)));
  useChild(() => Floor(new Vector(25, 800), canvasCenter.addX(400)));
  useChild(() => Floor(new Vector(25, 800), canvasCenter.subtractX(400)));

  const useChildAsMyRoot = useCallbackAsCurrent(useChild);
  const childrenTypes = [Ball]; //, Box, Triangle];
  function newBox() {
    const childType =
      childrenTypes[Math.floor(Math.random() * childrenTypes.length)];
    useChildAsMyRoot(() => childType(canvasCenter));
  }

  for (let i = 0; i < 50; i++) newBox();

  useChild(() => Button(new Vector(0, 0), newBox));
}
