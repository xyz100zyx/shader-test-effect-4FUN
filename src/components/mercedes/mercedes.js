import { GL_MODEL_CACHE_KEYS } from "../../shared/constants";
import { GLModelLoader } from "../../shared/gl-model-loader/gl-model-loader";

export const initMercedes = async (scene) => {
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
  mercedes3DObject.position.x -= 2.0;
  mercedes3DObject.position.z -= 2.0;

  scene.add(mercedes3DObject);

  mercedes3DObject.traverse((children) => {
    if (children.isMesh) {
      children.scale.setScalar(0.008);
    }
  });
};
