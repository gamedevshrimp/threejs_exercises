import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

const gui = new GUI();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 4
scene.add(camera)

// Load textures
const textureLoader = new THREE.TextureLoader();
// door
const doorColor = textureLoader.load('textures/door/color.jpg');
const alphaColor = textureLoader.load('textures/door/alpha.jpg');
const ambientColor = textureLoader.load('textures/door/ambientOcclusion.jpg');
const heightColor = textureLoader.load('textures/door/height.jpg');
const metalnessColor = textureLoader.load('textures/door/metalness.jpg');
const normalColor = textureLoader.load('textures/door/normal.jpg');
const roughnessColor = textureLoader.load('textures/door/roughness.jpg');

// hdr
const hdr = textureLoader.load('textures/environmentMap/2k.hdr');

// gradients
const gradient = textureLoader.load('textures/gradients/3.jpg');
gradient.minFilter = THREE.NearestFilter;
gradient.magFilter = THREE.NearestFilter;

// matcap
const matcap = textureLoader.load('textures/matcaps/1.png');

doorColor.colorSpace = THREE.SRGBColorSpace;
matcap.colorSpace = THREE.SRGBColorSpace;

// Add materials
const material = new THREE.MeshBasicMaterial({ 
    map: doorColor,
    // wireframe:true,
    
    // transparent: true,
    // opacity:0.5, 
    // alphaMap: alphaColor,
    
    side: THREE.DoubleSide,
});

const normalMaterial = new THREE.MeshNormalMaterial({
    flatShading: true,
});

const matcapMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcap,
});

const meshDepthMaterial = new THREE.MeshDepthMaterial();

const lambertMaterial = new THREE.MeshLambertMaterial();

const phongMaterial = new THREE.MeshPhongMaterial();

const toonMaterial = new THREE.MeshToonMaterial({
    gradientMap: gradient,
});

const standartMaterial = new THREE.MeshStandardMaterial({
    metalness: 1,
    roughness: 0.5,
    map: doorColor,
    aoMap: ambientColor,
    aoMapIntensity: 1,
    displacementMap: heightColor,
    displacementScale: 1,
});
gui.add(standartMaterial, 'metalness').min(0).max(1).step(0.001);
gui.add(standartMaterial, 'roughness').min(0).max(1).step(0.001);
gui.add(standartMaterial, 'aoMapIntensity').min(0).max(5).step(0.001);
gui.add(standartMaterial, 'displacementScale').min(0).max(3).step(0.001);


// Add meshes
const mat = standartMaterial;
const planeGeo = new THREE.PlaneGeometry(1, 1, 64, 64);
const planeMesh = new THREE.Mesh(planeGeo, mat);
scene.add(planeMesh);

const sphereGeo = new THREE.SphereGeometry(0.5, 64, 64);
const sphereMesh = new THREE.Mesh(sphereGeo, mat);
sphereMesh.position.x = -2;
scene.add(sphereMesh);

const torusGeo = new THREE.TorusGeometry(0.5, 0.1, 64, 64);
const torusMesh = new THREE.Mesh(torusGeo, mat);
torusMesh.position.x = 2;
scene.add(torusMesh);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 1;
pointLight.position.y = 1;
pointLight.position.z = 1;

const sceneLight = pointLight;
scene.add(sceneLight);

// Environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load('textures/environmentMap/2k.hdr', (envirMap) => {
    envirMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = envirMap;
    scene.environment = envirMap;
});

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const duration = 50
gsap.to(planeMesh.rotation, {
    duration: duration, 
    // y: Math.PI * 2, 
    x: Math.PI * 2, 
    z: Math.PI * 2, 
    repeat:-1, 
    ease: 'linear' });
gsap.to(sphereMesh.rotation, {
    duration: duration, 
    // y: Math.PI * 2, 
    x: Math.PI * 2, 
    z: Math.PI * 2, 
    repeat:-1, 
    ease: 'linear' });
gsap.to(torusMesh.rotation, {
    duration: duration, 
    // y: Math.PI * 2, 
    x: Math.PI * 2, 
    z: Math.PI * 2, 
    repeat:-1, 
    ease: 'linear' });
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Rotate objects

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()