import {
  useType,
  useNewComponent,
  useEntity,
  Geometry,
  Physics,
  Mouse,
  Vector,
  useEnableDisable,
  Keyboard,
  useDestroy,
  useUpdate,
} from '@hex-engine/2d';

export default function Draggable(geometry: ReturnType<typeof Geometry>) {
  useType(Draggable);

  const physics = useEntity().getComponent(Physics.Body);

  const keyboard = useNewComponent(Keyboard);
  const mouse = useNewComponent(Mouse);
  const enableDisable = useEnableDisable();
  const {destroy} = useDestroy();

  let originalStatic = false;
  let isDragging = false;
  const startedDraggingAt = new Vector(0, 0);

  mouse.onDown(event => {
    if (!enableDisable.isEnabled) {
      return;
    }

    if (keyboard.pressed.has('Shift')) {
      destroy();
      return;
    }

    if (physics) {
      originalStatic = physics.body.isStatic;
      physics.setStatic(true);
    }
    isDragging = true;
    startedDraggingAt.mutateInto(event.pos);
  });

  mouse.onMove(event => {
    if (isDragging) {
      geometry.position.addMutate(event.pos.subtract(startedDraggingAt));
    }
  });

  mouse.onUp(() => {
    if (physics) {
      physics.setStatic(originalStatic);
    }
    isDragging = false;
  });

  useUpdate(() => {
    if (geometry.position.y < 0 || geometry.position.y > 1000) {
      destroy();
    }
  });
}
