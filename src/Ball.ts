import {
  useType,
  useNewComponent,
  Geometry,
  Vector,
  Physics,
  useDraw,
  Circle,
} from '@hex-engine/2d';
import Draggable from './Draggable';

export default function Ball(position: Vector) {
  useType(Ball);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: new Circle(10),
      position: position.clone(),
    }),
  );

  useNewComponent(() => Physics.Body(geometry, {restitution: 0.8}));
  useNewComponent(() => Draggable(geometry));

  useDraw(context => {
    context.fillStyle = 'blue';
    geometry.shape.draw(context, 'fill');
  });
}
