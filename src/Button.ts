import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useDraw,
  SystemFont,
  Label,
  Circle
} from "@hex-engine/2d";
import AudioContextComponent from "@hex-engine/2d/src/Components/AudioContext";

const padding = new Vector(8, 4);

export default function Button(position: Vector) {
  useType(Button);

  const font = useNewComponent(() =>
    SystemFont({ name: "sans-serif", size: 14 })
  );
  const label = useNewComponent(() =>
    Label({ font, text: `${position.x}x${position.y}` })
  );

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(label.size.add(padding.multiply(2))),
      position: position.clone()
    })
  );

  useNewComponent(() => Physics.Body(geometry, { isStatic: true }));

  useDraw(context => {
    context.fillStyle = "#ddd";
    geometry.shape.draw(context, "fill");

    context.fillStyle = "red";
    const radius = 1;
    new Circle(radius * 2).draw(context, "fill", { x: -radius, y: -radius });

    label.draw(context, padding);
  });
}
