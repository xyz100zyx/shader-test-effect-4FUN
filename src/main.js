import "./style.css";
import { Tick } from "./shared/tick";
import {
  AmbientLight,
  AxesHelper,
  Color,
  DirectionalLight,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import { initControls } from "./components/controls";
import { initMercedes } from "./components/mercedes";
import { initDistMercedes } from "./components/dist-mercedes";
import { initHalfoneMercedes } from "./components/halftone-mercedes";

async function bootstrap() {
  const scene = new Scene();
  scene.background = new Color(0x000000);

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 2, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const gridHelper = new GridHelper(10, 20, 0x888888, 0x444444);
  scene.add(gridHelper);

  const axesHelper = new AxesHelper(3);
  scene.add(axesHelper);

  const sphereGeometry = new SphereGeometry(0.5, 32, 32);
  const basicMaterial = new MeshStandardMaterial({
    color: 0xff6600,
    metalness: 0.7,
    roughness: 0.3,
  });
  const sphere = new Mesh(sphereGeometry, basicMaterial);
  sphere.position.set(1.2, -0.8, 1);
  scene.add(sphere);

  const ambientLight = new AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 3, 4);
  scene.add(directionalLight);

  const pointLight = new PointLight(0xff00ff, 0.5);
  pointLight.position.set(-1, 1, 2);
  scene.add(pointLight);

  let rotCoefficient = 0;
  const tick = new Tick();

  initControls(camera, renderer);
  initMercedes(scene);
  initDistMercedes(scene);
  initHalfoneMercedes(scene);

  tick.addTickCallback(() => {
    rotCoefficient += 0.02;
    sphere.position.y = -0.8 + Math.sin(rotCoefficient) * 0.3;

    renderer.render(scene, camera);
  });

  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
