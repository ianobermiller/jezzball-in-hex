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
  if (physics) {
    physics.setVelocity(
      Vector.fromAngleAndMagnitude(Math.random() * Math.PI * 2, 10),
    );
    physics.body.restitution = 1;
    physics.body.frictionAir = 0;
    physics.body.friction = 0;
  }

  const keyboard = useNewComponent(Keyboard);
  const mouse = useNewComponent(Mouse);
  const enableDisable = useEnableDisable();
  const {destroy} = useDestroy();

  let originalStatic = false;
  let originalVelocity = {x: 0, y: 0};
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
      originalVelocity = physics.body.velocity;
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
    if (isDragging && physics) {
      physics.setStatic(originalStatic);
      physics.setVelocity(new Vector(originalVelocity.x, originalVelocity.y));
    }
    isDragging = false;
  });

  useUpdate(() => {
    if (
      geometry.position.y < 0 ||
      geometry.position.y > 1000 ||
      geometry.position.x < 0 ||
      geometry.position.x > 1000
    ) {
      destroy();
    }
  });
}
