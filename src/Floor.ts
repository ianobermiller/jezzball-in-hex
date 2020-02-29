import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useDraw,
} from '@hex-engine/2d';

export default function Floor(size: Vector, position: Vector) {
  useType(Floor);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position: position.clone(),
    }),
  );

  useNewComponent(() => Physics.Body(geometry, {isStatic: true}));

  useDraw(context => {
    context.fillStyle = '#ddd';
    geometry.shape.draw(context, 'fill');
  });
}
