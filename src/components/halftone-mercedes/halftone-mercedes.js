import { GL_MODEL_CACHE_KEYS } from "../../shared/constants";
import { GLModelLoader } from "../../shared/gl-model-loader/gl-model-loader";
import { getHalftoneShaderMaterial } from "./materials/shader-material";
import { Tick } from "../../shared/tick";

export const initHalfoneMercedes = async (scene) => {
  const glmLoader = new GLModelLoader(GL_MODEL_CACHE_KEYS.MERCEDES);

  const glmModelLoadResult = await glmLoader.loadGLModel(
    "gl-models/mercedes/scene.gltf",
    () => {},
    (e) => {
      console.log("error", e);
    },
  );

  const model = glmModelLoadResult.scene;

  scene.add(model);

  model.scale.setScalar(0.008);
  model.position.z += 2;
  model.rotateY(-Math.PI / 3);

  const halftoneShaderMaterial = getHalftoneShaderMaterial();

  halftoneShaderMaterial.uniforms = {
    ...halftoneShaderMaterial.uniforms,
    uTime: {
      value: 0,
    },
  };

  model.traverse((children) => {
    if (children.isMesh) {
      children.material = halftoneShaderMaterial;
    }
  });

  const tick = new Tick();

  tick.addTickCallback((el) => {
    halftoneShaderMaterial.uniforms.uTime.value = el * 2;
    halftoneShaderMaterial.uniforms.needsUpdate = true;
  });
};
