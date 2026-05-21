import { getGUI } from "../../shared/gui";
import * as THREE from "three";

export const initGuiController = (glModel, getUniforms) => {
  const gui = getGUI();
  const mercedesUIControls = gui.addFolder("mercedes");

  const localUniforms = {
    progress: 0.8,
  };

  mercedesUIControls
    .add(localUniforms, "progress", 0.0, 1.0, 0.01)
    .name("progress")
    .onChange((v) => {
      localUniforms.progress = v;
      glModel.traverse((ch) => {
        if (ch.isMesh) {
          const uniforms = getUniforms(ch.id);

          uniforms.uProgress = {
            value: localUniforms.progress,
          };
          ch.material.needsUpdate = true;
          uniforms.needsUpdate = true;
        }
      });
    });
};
