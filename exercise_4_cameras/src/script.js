import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Get the mouse coordinates
// const cursorPos = {
//     x: 0,
//     y: 0,
// }
// window.addEventListener('mousemove', (event) => {
//     cursorPos.x = (event.clientX / sizes.width) - 0.5;
//     cursorPos.y = (event.clientY / sizes.height) - 0.5;
// });
console.log(OrbitControls);
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 100);
const cameraSize = 2;
// const camera = new THREE.OrthographicCamera(
//     -2 * aspectRatio, 2 * aspectRatio, 
//     2, -2);
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)
const controls = new OrbitControls(camera, canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;
    // camera.position.x = cursorPos.x * 3;
    // camera.position.y = cursorPos.y * -3;
    // camera.lookAt(mesh.position);
    // Controls

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()