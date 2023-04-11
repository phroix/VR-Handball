// Mini Three.js
import * as THREE from "three";

import { mouse, keyboardInteractionFunction } from "./mouse_keyboard.mjs";
import {
  createScene,
  createFloor,
  createArrow,
  createBall,
  createCrossbar,
  createPost2,
  createPost1,
  createCursor,
  createWallFront,
  createWallBack,
  createWallRight,
  createWallLeft,
  createCeiling,
  createBox,
  createGoalFeedback,
} from "./scene.mjs";
import { createVRcontrollers } from "./vr.mjs";

window.onload = function () {
  let { scene, camera, renderer } = createScene(true);

  let world = new THREE.Group();
  world.matrixAutoUpdate = false;

  scene.add(world);
  createFloor(world);
  let ball = createBall(world);
  let crossbar = createCrossbar(world);
  let post1 = createPost1(world);
  let post2 = createPost2(world);
  // let wall = createWall(world);
  // let goal = createGoal(world);
  let wallFront = createWallFront(world);
  let wallBack = createWallBack(world);
  let wallRight = createWallRight(world);
  let wallLeft = createWallLeft(world);
  let ceiling = createCeiling(world);
  let box = createBox(world);
  let goalFeedback = createGoalFeedback(world);
  let TimeChecker = false;
  let timer = 50000;

  //Cursor // Controller
  let cursor = createCursor(scene);
  mouse(cursor);

  let last_active_controller, last_active_inputsource;
  let { controller1, controller2 } = createVRcontrollers(
    scene,
    renderer,
    (current, src) => {
      // called if/when controllers connect
      cursor.matrixAutoUpdate = false;
      cursor.visible = false;
      last_active_controller = current;
      last_active_inputsource = src;
      console.log(`connected ${src.handedness} device`);
    }
  );

  //Box Move
  let check = true;
  let boxDirection = 0.01;
  function moveBox() {
    if (box.position.x >= 2) {
      check = false;
    }
    if (box.position.x < -2) {
      check = true;
    }
    if (check) {
      box.position.x += boxDirection;
    }
    if (!check) {
      box.position.x -= boxDirection;
    }
  }

  //box Collition
  function boxCollition() {
    let ballPosition = ball.position;
    let boxPosition = box.position;

    let boxDistance = ballPosition.distanceTo(boxPosition) - 1;
    if (boxDistance <= 0.1) {
      speed *= -1;
      airResistence *= -1;
      setTimeout(function () {
        TimeChecker = true;
        time = 0; 
      }, 1000);

      
    }
  }

  console.log(wallFront.geometry.attributes.normal);

  let position = new THREE.Vector3();
  let rotation = new THREE.Quaternion();
  let scale = new THREE.Vector3();

  let raycaster = new THREE.Raycaster();

  let grabbed, squeezed;
  let positions = [];
  let endPosition = [],
    startPosition = [];
  let startTime = [],
    endTime,
    time;
  let speedy = 0,
    speed = 0;
  let airResistence = 0.01;
  let goalReset = false;

  function render() {
    // console.log(goal.position)
    // console.log(goal[0]); //{x: 0, y: 1.9, z: -10} {x: 0, y: 1.9, z: -10}
    if (
      ball.position.x > post1.position.x &&
      ball.position.x < post2.position.x &&
      ball.position.z < crossbar.position.z
    ) {
      console.log("GOAL!");
      goalReset = true;
    }

    if (goalReset) {
      goalFeedback.material.color.set("#00ff00"); // green color
    } else {
      goalFeedback.material.color.set("#ff0000"); // green color
    }

    if (last_active_controller) {
      cursor.matrix.copy(last_active_controller.matrix);
      grabbed =
        controller1.controller.userData.isSelecting ||
        controller2.controller.userData.isSelecting;
      squeezed =
        controller1.controller.userData.isSqueezeing ||
        controller2.controller.userData.isSqueezeing;
    }

    cursor.matrix.decompose(position, rotation, scale);

    //box rotation
    moveBox();

    if (grabbed) {
      raycaster.setFromCamera(cursor.position, camera);

      //checks for controler distance to ball
      let distance =
        last_active_controller.position.distanceTo(ball.position) -
        ball.geometry.parameters.radius;

      if (distance <= 0) {
        // move the ball's position to match the cursor's position
        ball.position.set(
          last_active_controller.position.x,
          last_active_controller.position.y,
          last_active_controller.position.z
        );

        if (squeezed) {
          startTime = Date.now();
          positions.push(last_active_controller.position.clone());

          setTimeout(function () {
            TimeChecker = true;
            time = 0; 
          }, 3000);
        }
      }

      if (!squeezed && positions.length > 1) {
        endTime = Date.now();
        time = (endTime - startTime) / 50;


        startPosition = positions[0];
        endPosition = positions[positions.length - 1];
        let distanceVector = new THREE.Vector3().subVectors(
          endPosition,
          startPosition
        );

        let normalizedDistanceVector = distanceVector.normalize();
        speed = distanceVector.length() / time; // time is the duration of squeezing

        setInterval(function () {
          if(speed != 0){ 
            speedy = 0.01;
          }
          ball.position.x += normalizedDistanceVector.x * speed * 0.02;
          ball.position.y += normalizedDistanceVector.y * speed * 0.02 - speedy;
          ball.position.z += normalizedDistanceVector.z * speed * 0.02;

          speed = speed - airResistence;


  
          



          //Ball Stop
          if (speed <= 0.07 && speed >= -0.07) {
            speed = 0;
            airResistence = 0;
          }

          //Collisions
          let ballPosition = ball.position;
          //floor
          if (ball.position.y <= 0) {
            ball.position.y *= -1;
            speedy *= -1;
          }

          // ceiling
          if (ball.position.y >= 5) {
            speed *= -1;
          }

          //wallFront
          let wallFrontPosition = wallFront.position;
          let wallFrontDistance =
            ballPosition.distanceTo(wallFrontPosition) - 4;

          if (wallFrontDistance <= 0.01) {
            speed *= -1;
            airResistence *= -1;
          }

          //wallBack
          let wallBackPosition = wallBack.position;
          let wallBackDistance = ballPosition.distanceTo(wallBackPosition) - 4;

          if (wallBackDistance <= 0.01) {
            speed *= -1;
            airResistence *= -1;
          }

          //wall Right

          if (ball.position.x >= 10) {
            speed *= -1;
          }

          if (ball.position.x <= -10) {
            speed *= -1;
          }
        }, 10);

        positions = [];
      }

      //check if ball distance is to high
    }
    

    if (last_active_controller) {
      let controllerPosition = last_active_controller.position;
      let ballPosition = ball.position;
      let ballDistance = controllerPosition.distanceTo(ballPosition);
      if (ballDistance > 15) {
        time = 0; 
        TimeChecker = true;
      }
    }


    console.log("time", TimeChecker);

    
    if (TimeChecker) {
      setTimeout(function () {
        ball.position.set(0, 1, -0.2);
        speed = 0;
        speedy = 0;
        startPosition = [];
        endPosition = [];
        positions = [];
        startTime = [];
        goalReset = false;
        TimeChecker = false;
      }, time);
    }

    //collision with box
    boxCollition();

     

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(render);
};
