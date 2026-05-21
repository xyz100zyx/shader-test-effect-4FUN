import { ShaderMaterial, Vector2, NormalBlending } from "three";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

export const getHalftoneShaderMaterial = () => {
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    blending: NormalBlending,
    depthWrite: true,
    transparent: true,

    uniforms: {
      uResolution: {
        value: new Vector2(window.innerWidth, window.innerHeight),
      },
    },
  });

  return material;
};
