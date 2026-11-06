import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";

const LOADED_CALLBACK_DELAY_MS = 200;

/** Puts a metallic clone of `scene` into `modelRef` and reports the first load. */
export function useCanModel(
  scene: THREE.Group,
  modelRef: RefObject<THREE.Group | null>,
  onLoaded?: () => void
) {
  const loadedRef = useRef(false);

  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    const clonedScene = scene.clone();

    clonedScene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh && mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.metalness = 0.95;
        mesh.material.roughness = 0.02;
        mesh.material.alphaTest = 0.1;
      }
    });

    model.clear();
    model.add(clonedScene);

    if (onLoaded && !loadedRef.current) {
      loadedRef.current = true;
      setTimeout(onLoaded, LOADED_CALLBACK_DELAY_MS);
    }
  }, [scene, onLoaded, modelRef]);
}
