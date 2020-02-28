import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Physics,
  Vector,
  useCallbackAsCurrent,
} from "@hex-engine/2d";
import Floor from "./Floor";
import Box from "./Box";
import Button from "./Button";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen({ pixelZoom: 2 });

  useNewComponent(Physics.Engine);

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2,
  );

  useChild(() => Floor(canvasCenter.addY(200)));
  useChild(() => Box(canvasCenter));
  const useChildAsMyRoot = useCallbackAsCurrent(useChild);
  function newBox() {
    useChildAsMyRoot(() => Box(canvasCenter));
  }

  useChild(() => Button(new Vector(0, 0), newBox));
  useChild(() => Button(new Vector(100, 100), newBox));
  useChild(() => Button(new Vector(200, 100), newBox));
  useChild(() => Button(new Vector(100, 200), newBox));
}
