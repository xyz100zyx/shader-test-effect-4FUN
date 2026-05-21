import { GL_MODEL_CACHE_KEYS } from "../../shared/constants";
import { GLModelLoader } from "../../shared/gl-model-loader/gl-model-loader";
import { Tick } from "../../shared/tick";
import { initGuiController } from "./gui-controller";
import { customizeMaterial } from "./utils/customize-material.util";

export const initDistMercedes = async (scene) => {
  const glModelLoader = new GLModelLoader(GL_MODEL_CACHE_KEYS.MERCEDES);
  const model = await glModelLoader.loadGLModel(
    "gl-models/mercedes/scene.gltf",
    () => {
      console.log("success");
    },
    (error) => {
      console.log("error", error);
    },
  );

  const mercedes3DObject = model.scene;
  mercedes3DObject.rotateY(-Math.PI + Math.PI / 2);
  mercedes3DObject.position.x += 2.0;
  mercedes3DObject.position.z -= 2.0;

  scene.add(mercedes3DObject);

  const uniforms = new Map();

  mercedes3DObject.traverse((children) => {
    if (children.isMesh) {
      children.scale.setScalar(0.008);

      customizeMaterial(children, (uniformsData) => {
        uniforms.set(children.id, uniformsData);
      });
    }
  });

  const tick = new Tick();

  initGuiController(mercedes3DObject, (id) => uniforms.get(id));

  tick.addTickCallback((elapsedTime) => {
    mercedes3DObject.traverse((children) => {
      if (children.isMesh) {
        uniforms.get(children.id).uTime = { value: elapsedTime };
        uniforms.get(children.id).needsUpdate = true;
      }
    });
  });
};
