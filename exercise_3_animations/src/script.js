import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 2;
scene.add(mesh)

// Object2
const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.position.x = 0;
scene.add(mesh2)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//Clock
const clock = new THREE.Clock();

// Animation
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    mesh.rotation.y = elapsedTime * (Math.PI);

    mesh2.position.y = Math.sin(elapsedTime * 2);

    gsap.to(mesh.position, { duration: 1, delay: 1, y: mesh2.position.y });
    
    // camera.position.x = Math.cos(elapsedTime * 2);
    // camera.position.y = Math.sin(elapsedTime * 2);

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick();