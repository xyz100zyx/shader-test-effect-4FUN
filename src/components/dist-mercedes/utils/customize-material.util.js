import { ShaderMaterial } from "three";
import colorSpaceFragmentShader from "../shaders/fragment-colorspace_fragment.glsl";
import beginVertexShader from "../shaders/vertex-begin_vertex.glsl";
import vertexCommonShader from "../shaders/vertex-common.glsl";
import fragmentCommonShader from "../shaders/fragment-common.glsl";

export const customizeMaterial = (child, setUniforms) => {
  child.material = child.material.clone();

  const material = child.material;
  const originalOnBeforeCompile = material.onBeforeCompile;

  material.onBeforeCompile = (materialSrc) => {
    if (originalOnBeforeCompile) {
      originalOnBeforeCompile.call(material, materialSrc);
    }

    setUniforms(materialSrc.uniforms);

    materialSrc.vertexShader = materialSrc.vertexShader.replace(
      "#include <common>",
      vertexCommonShader,
    );

    materialSrc.vertexShader = materialSrc.vertexShader.replace(
      "#include <begin_vertex>",
      beginVertexShader,
    );

    materialSrc.fragmentShader = materialSrc.fragmentShader.replace(
      "#include <colorspace_fragment>",
      colorSpaceFragmentShader,
    );

    materialSrc.fragmentShader = materialSrc.fragmentShader.replace(
      "#include <common>",
      fragmentCommonShader,
    );

    // console.log("materialSrc.vertexShader", materialSrc.fragmentShader);
  };

  material.needsUpdate = true;
};
