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
  Circle,
  Mouse,
} from "@hex-engine/2d";
import AudioContextComponent from "@hex-engine/2d/src/Components/AudioContext";

const padding = new Vector(8, 4);

export default function Button(position: Vector, onClick: () => void) {
  useType(Button);

  const font = useNewComponent(() =>
    SystemFont({ name: "sans-serif", size: 14 }),
  );
  const label = useNewComponent(() =>
    Label({ font, text: `${position.x}x${position.y}` }),
  );

  const size = label.size.add(padding.multiply(2));

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      // Add half the size to the position so that instead of being centered, the
      // position specifies top-left
      position: position.add(size.divide(2)),
    }),
  );

  useNewComponent(() => Physics.Body(geometry, { isStatic: true }));

  const mouse = useNewComponent(Mouse);
  mouse.onClick(onClick);

  useDraw(context => {
    context.fillStyle = "#ddd";
    geometry.shape.draw(context, "fill");

    context.fillStyle = "red";
    const radius = 1;
    new Circle(radius * 2).draw(context, "fill", { x: -radius, y: -radius });

    label.draw(context, padding);
  });
}
