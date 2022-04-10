import "./style.css";
import {
  AmbientLight,
  Clock,
  DirectionalLight,
  PerspectiveCamera,
  Raycaster,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";

import Game from "./game/game";

class Client {
  game: Game;
  clock: Clock;
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  raycaster: Raycaster;
  pointer: Vector2;

  static textureLoader = new TextureLoader();
  static tooltipElement = document.getElementById("tooltip")!;
  static refreshMeshes = true;
  static refreshTooltips = true;

  constructor() {
    this.scene = new Scene();
    this.game = new Game();

    const aspect = window.innerWidth / window.innerHeight;

    // this.camera = new OrthographicCamera(
    //   (-frustumSize * aspect) / 2,
    //   (frustumSize * aspect) / 2,
    //   frustumSize / 2,
    //   -frustumSize / 2,
    //   1,
    //   1000
    // );

    this.camera = new PerspectiveCamera(40, aspect, 0.1, 1000);

    this.camera.position.set(0, 25, 60);
    this.camera.lookAt(this.game.deck.mesh.position);

    // this.camera.rotateX(degrees(180));

    this.renderer = new WebGLRenderer({
      canvas: document.querySelector("canvas")!,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    this.scene.add(directionalLight);
    this.renderer.render(this.scene, this.camera);

    const light = new AmbientLight(0xffffff);
    this.scene.add(light);

    // this.scene.add(new GridHelper(100));

    this.clock = new Clock();

    // new OrbitControls(this.camera, this.renderer.domElement);
    // new FirstPersonControls(this.camera, this.renderer.domElement);

    this.raycaster = new Raycaster();
    this.pointer = new Vector2();
  }

  refreshTooltips() {
    client.raycaster.setFromCamera(client.pointer, client.camera);
    const intersects = client.raycaster.intersectObjects(client.scene.children);

    if (intersects.length === 0) {
      Client.tooltipElement.querySelector("#header")!.innerHTML = "";
      Client.tooltipElement.querySelector("#text")!.innerHTML = "";
    } else {
      for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;

        const tooltip = client.game.hover(object.uuid);
        if (tooltip !== false) {
          Client.tooltipElement.querySelector("#header")!.innerHTML =
            tooltip.header;
          Client.tooltipElement.querySelector("#text")!.innerHTML =
            tooltip.text;
        }
      }
    }
  }

  private refresh() {
    const current = this.scene.children;
    const inWorld = this.game.getMeshes();

    // All that are in current but not in inWorld
    const toBeRemoved = current
      .filter((x) => !inWorld.find((mesh) => mesh.uuid === x.uuid))
      .concat(
        current.filter((x) => !inWorld.find((mesh) => mesh.uuid === x.uuid))
      );

    const toBeAdded = inWorld
      .filter((x) => !current.find((mesh) => mesh.uuid === x.uuid))
      .concat(
        inWorld.filter((x) => !current.find((mesh) => mesh.uuid === x.uuid))
      );

    this.scene.remove(...toBeRemoved);
    this.scene.add(...toBeAdded);
  }

  animate() {
    const loop = () => {
      requestAnimationFrame(loop);
      const delta = this.clock.getDelta();

      if (Client.refreshMeshes) {
        this.refresh();
        Client.refreshMeshes = false;
      }

      if (Client.refreshTooltips) {
        this.refreshTooltips();
        Client.refreshTooltips = false;
      }

      this.game.animate(delta);

      this.renderer.render(this.scene, this.camera);
      // console.log(this.camera);
    };

    loop();
  }
}

export default Client;

const client = new Client();

addEventListener("pointermove", (event) => {
  client.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  client.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  Client.tooltipElement.style.top = `${event.clientY + 15}px`;
  Client.tooltipElement.style.left = `${event.clientX + 15}px`;

  client.refreshTooltips();
});

addEventListener("mouseup", () => {
  const intersects = client.raycaster.intersectObjects(client.scene.children);

  intersects.forEach((intersection) => {
    const object = intersection.object;

    client.game.click(object.uuid);
  });
});

addEventListener("resize", () => {
  // client.camera.updateProjectionMatrix();
  // client.renderer.setSize(window.innerWidth, window.innerHeight);
});

client.animate();
