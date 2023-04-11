import * as THREE from "three";
import { VRButton } from "VRButton";


//scene, Camera, light, renderer
export function createScene(vr_enabled = true) {
  let scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0x808080, 0x606060));
  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(4, 16, 5);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  scene.add(light);

  let camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.set(0, 3, 3);

  camera.lookAt(0, 0, -3);

  scene.add(camera);

  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  if (vr_enabled) renderer.xr.enabled = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  if (vr_enabled) document.body.appendChild(VRButton.createButton(renderer));

  return { scene, camera, renderer };
}

//floor
export function createFloor(parent) {
  let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(23, 35, 20),
    new THREE.MeshStandardMaterial({
      color: "#00a2ed",
      side: THREE.DoubleSide,
    })
  );
  plane.receiveShadow = true;
  plane.position.set(0, -1, 0);
  plane.rotation.x = Math.PI / 2;
  parent.add(plane);
}

//ceiling
export function createCeiling(parent) {
  let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(23, 35, 20),
    new THREE.MeshStandardMaterial({
      color: "#00a2ed",
      side: THREE.DoubleSide,
    })
  );
  plane.receiveShadow = true;
  plane.position.set(0, 5, 0);
  plane.rotation.x = Math.PI / 2;
  parent.add(plane);
}

//ball
export function createBall(parent) {
  let ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 50, 50),
    new THREE.MeshStandardMaterial({ color: "#CE370C" })
  );
  ball.receiveShadow = true;
  ball.position.set(0, 1, -0.2);

  parent.add(ball);
  return ball;
}

//Basketball goal
// export function createGoal(parent) {
//   let goal = new THREE.Mesh(
//     new THREE.CylinderGeometry(0.1, 0.1, 3),
//     new THREE.MeshBasicMaterial({ color: "#46473E" })
//   );
//   goal.receiveShadow = true;
//   goal.position.set(0, 1, -5);

//   let plane = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 0.01),
//     new THREE.MeshBasicMaterial({ color: "#ffffff" })
//   );
//   plane.receiveShadow = true;
//   plane.position.set(0, 1.5, 0.1);

//   let ring = new THREE.Mesh(
//     new THREE.TorusGeometry(0.3, 0.02, 30, 50),
//     new THREE.MeshBasicMaterial({ color: "#46473E" })
//   );
//   ring.receiveShadow = true;
//   ring.position.set(0, -0.2, 0.3);
//   ring.rotateX(80);

//   parent.add(goal);
//   goal.add(plane);
//   plane.add(ring);
// }

// export function createGoal(parent) {
//   // Pfosten
//   let post1 = new THREE.Mesh(
//     new THREE.CylinderGeometry(0.1, 0.1, 4),
//     new THREE.MeshStandardMaterial({ color: "#46473E" })
//   );
//   post1.receiveShadow = true;
//   post1.position.set(-3, 0, -10);

//   let post2 = new THREE.Mesh(
//     new THREE.CylinderGeometry(0.1, 0.1, 4),
//     new THREE.MeshStandardMaterial({ color: "#46473E" })
//   );
//   post2.receiveShadow = true;
//   post2.position.set(3, 0, -10);

//   // Querstange
//   let crossbar = new THREE.Mesh(
//     new THREE.BoxGeometry(6, 0.1, 0.1),
//     new THREE.MeshStandardMaterial({ color: "#46473E" })
//   );
//   crossbar.receiveShadow = true;
//   crossbar.position.set(0, 1.9, -10);

//   // Parent
//   parent.add(post1);
//   parent.add(post2);
//   parent.add(crossbar);

//   return post1, post2, crossbar;
// }
export function createCrossbar(parent) {
  // Querstange
  let crossbar = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.1, 0.1),
    new THREE.MeshStandardMaterial({ color: "#46473E" })
  );
  crossbar.receiveShadow = true;
  crossbar.position.set(0, 1.9, -10);

  parent.add(crossbar);

  return crossbar;
}
export function createPost1(parent) {
  // Pfosten
  let post1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 4),
    new THREE.MeshStandardMaterial({ color: "#46473E" })
  );
  post1.receiveShadow = true;
  post1.position.set(-3, 0, -10);

  // Parent
  parent.add(post1);

  return post1;
}
export function createPost2(parent) {
  let post2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 4),
    new THREE.MeshStandardMaterial({ color: "#46473E" })
  );
  post2.receiveShadow = true;
  post2.position.set(3, 0, -10);

  // Parent
  parent.add(post2);

  return post2;
}

export function createGoalFeedback(parent) {
  
  let box = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.5, 0.2),
    new THREE.MeshBasicMaterial({ color: "#ff0000" })
  );
  (box.receiveShadow = true), box.position.set(5, 1, -10);

  parent.add(box);
  return box;

}

//BOX
export function createBox(parent) {
  let box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 3, 0.2),
    new THREE.MeshBasicMaterial({ color: "white" })
  );
  (box.receiveShadow = true), box.position.set(1, 0, -10);

  parent.add(box);
  return box;
}

//Wall
//Walls
export function createWallFront(parent){
  let wall = new THREE.Mesh(
    new THREE.PlaneGeometry(23, 10, 10),
    new THREE.MeshStandardMaterial({
      color: "#828282",
      side: THREE.DoubleSide,
    })
  );
  wall.receiveShadow = true;
  wall.position.set(0, 0, -17);
  wall.rotation.x = 0;
  parent.add(wall);
  return wall;
}

export function createWallBack(parent){
  let wall = new THREE.Mesh(
    new THREE.PlaneGeometry(23, 10, 10),
    new THREE.MeshStandardMaterial({
      color: "#828282",
      side: THREE.DoubleSide,
    })
  );
  wall.receiveShadow = true;
  wall.position.set(0, 0, 17);
  wall.rotation.x = 0
  parent.add(wall);
  return wall
}

export function createWallRight(parent){
  let wall = new THREE.Mesh(
    new THREE.PlaneGeometry(35, 10, 10),
    new THREE.MeshStandardMaterial({
      color: "#cda434",
      side: THREE.DoubleSide,
    })
  );
  wall.receiveShadow = true;
  wall.position.set(10, 0, 0);
  wall.rotation.x = 0;
  wall.rotation.z = 0;
  wall.rotation.y = 1.5;

  parent.add(wall);
  return wall;
}


export function createWallLeft(parent){
  let wall = new THREE.Mesh(
    new THREE.PlaneGeometry(35, 10, 10),
    new THREE.MeshStandardMaterial({
      color: "#cda434",
      side: THREE.DoubleSide,
    })
  );
  wall.receiveShadow = true;
  wall.position.set(-10, 0, 0);
  wall.rotation.x = 0;
  wall.rotation.z = 0;
  wall.rotation.y = 1.6;

  parent.add(wall);
  return wall;
}



/** ALT!!!
 *
 *
 *
 */

//fly
export function createArrow(parent, color = 0xff0000, size = 0.01) {
  let shape = new THREE.Shape();
  shape.moveTo(-size, -4 * size);
  shape.lineTo(size, -4 * size);
  shape.lineTo(size, size);
  shape.lineTo(2 * size, size);
  shape.lineTo(0, 3 * size);
  shape.lineTo(-2 * size, size);
  shape.lineTo(-size, size);

  const config = {
    steps: 4,
    depth: size / 2,
    bevelEnabled: true,
    bevelThickness: size / 10,
    bevelSize: size,
    bevelOffset: 0,
    bevelSegments: 1,
  };
  let geo = new THREE.ExtrudeGeometry(shape, config);
  let mesh = new THREE.Mesh(
    geo,
    new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.5 })
  );
  mesh.rotation.x = -Math.PI / 2;
  let trans = new THREE.Group();
  trans.matrixAutoUpdate = false;
  trans.add(mesh);
  parent.add(trans);
  return trans;
}

export function createLine(scene) {
  const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });

  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  let position = line.geometry.attributes.position.array;

  return (idx, pos) => {
    idx *= 3;
    position[idx++] = pos.x;
    position[idx++] = pos.y;
    position[idx++] = pos.z;
    line.geometry.attributes.position.needsUpdate = true;
  };
}

export function boxes2Grab(parent, noOfBoxes = 100) {
  let arr = [];
  for (let i = 0; i < noOfBoxes; ++i) {
    let height = Math.random() * 0.5 + 0.1;
    let box = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, height, 0.1),
      new THREE.MeshStandardMaterial({
        color: 0x1e13f0,
        roughness: 0.7,
        metalness: 0.0,
      })
    );
    box.position.x = Math.random() - 0.5;
    box.position.y = Math.random() * 0.5;
    box.position.z = Math.random() - 0.5;
    box.rotation.x = Math.random() * Math.PI;
    box.rotation.z = Math.random() * Math.PI;
    box.updateMatrix();
    box.castShadow = true;
    box.matrixAutoUpdate = false;
    parent.add(box);
    arr.push(box);
  }
  return arr;
}

export function createCursor(parent) {
  let cursor = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.2, 64),
    new THREE.MeshStandardMaterial({
      color: 0xff13f0,
      roughness: 0.7,
      metalness: 0.0,
    })
  );
  cursor.castShadow = true;
  // cursor.position.x = 0.5;

  parent.add(cursor);
  return cursor;
}
