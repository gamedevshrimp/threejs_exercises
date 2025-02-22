import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Load fonts
const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Hello Three.js', {
        font: font,
        size: 1,
        depth: 0.5,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 3
    });
    textGeometry.computeBoundingBox();
    textGeometry.translate(
        (textGeometry.boundingBox.max.x - 0.02) * -0.5, // Subtract bevel size
        (textGeometry.boundingBox.max.y - 0.02) * -0.5, // Subtract bevel size
        (textGeometry.boundingBox.max.z - 0.03) * -0.5  // Subtract bevel thickness
    );
    
    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
});


const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
for(let i = 0; i < 100; i++)
{
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);
    donut.position.x = (Math.random() - 0.5) * 20;
    donut.position.y = (Math.random() - 0.5) * 20;
    donut.position.z = (Math.random() - 0.5) * 20;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);
    scene.add(donut);
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();