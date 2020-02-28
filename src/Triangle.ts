import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useDraw,
} from '@hex-engine/2d';
import Draggable from './Draggable';

export default function Triangle(position: Vector) {
  useType(Triangle);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: new Polygon([
        new Vector(0, 0),
        Vector.fromAngleAndMagnitude((Math.PI / 3) * 4, 30),
        Vector.fromAngleAndMagnitude((Math.PI / 3) * 3, 30),
      ]),
      position: position.clone(),
    }),
  );

  useNewComponent(() => Physics.Body(geometry));
  useNewComponent(() => Draggable(geometry));

  useDraw(context => {
    context.fillStyle = 'green';
    geometry.shape.draw(context, 'fill');
  });
}
