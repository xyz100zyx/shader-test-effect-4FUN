import * as THREE from "three";
import "./style.css";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0x444444);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const basicMaterial = new THREE.MeshStandardMaterial({
  color: 0xff6600,
  metalness: 0.7,
  roughness: 0.3,
});
const sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
sphere.position.set(1.2, -0.8, 1);
scene.add(sphere);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 3, 4);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xff00ff, 0.5);
pointLight.position.set(-1, 1, 2);
scene.add(pointLight);

let time = 0;

function animate() {
  requestAnimationFrame(animate);

  time += 0.02;

  sphere.position.y = -0.8 + Math.sin(time) * 0.3;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
