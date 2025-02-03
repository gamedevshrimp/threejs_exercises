import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group();
scene.add(group);

const mesh_1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 8, 8), 
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
mesh_1.position.set(-1.5, 0, 0);
scene.add(mesh_1);

const mesh_2 = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.5, 1, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
mesh_2.position.set(0, 0, 0);
scene.add(mesh_2);

const mesh_3 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 1, 2, 8),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
mesh_3.position.set(1.5, 0, 0);
scene.add(mesh_3);  

group.add(mesh_1, mesh_2, mesh_3);
group.rotation.z = Math.PI / 3;

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);
/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)