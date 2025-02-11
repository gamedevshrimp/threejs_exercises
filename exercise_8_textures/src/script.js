import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//#region Just an example of how to load a texture
// const image = new Image();
// image.src = '/textures/door/color.jpg';
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace;

// image.onload = () => {
//     texture.needsUpdate = true;
// };
// console.log(image);
//#endregion

const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load('/textures/door/color.jpg');
colorTexture.colorSpace = THREE.SRGBColorSpace; 
const normalTexture = textureLoader.load('/textures/door/normal.jpg'); 
normalTexture.colorSpace = THREE.SRGBColorSpace;
normalTexture.wrapS = THREE.RepeatWrapping;
normalTexture.wrapT = THREE.RepeatWrapping;
normalTexture.repeat.x = 2;
normalTexture.repeat.y = 3;

normalTexture.rot
/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: normalTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()