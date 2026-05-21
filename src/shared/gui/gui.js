import GUI from "lil-gui";

let gui;
const initGUI = () => {
  gui = new GUI({
    title: "rendering uniforms",
    width: 260,
  });
  return gui;
};

export const getGUI = () => {
  return gui ?? initGUI();
};
