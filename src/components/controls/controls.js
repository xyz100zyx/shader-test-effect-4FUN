import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Tick } from "../../shared/tick";

export const initControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);

  const tick = new Tick();

  tick.addTickCallback(() => {
    controls.update();
  });
};
