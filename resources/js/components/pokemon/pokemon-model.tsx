import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

export default function Pokemon3DModel({ height, modelPath }: { height: number; modelPath: string }) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(300, 300);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 10, 7.5);
        scene.add(light);

        // Load model
        const loader = new ColladaLoader();
        let mixer: THREE.AnimationMixer | null = null;
        let model: THREE.Object3D | null = null;

        loader.load(modelPath, (collada) => {
            model = collada.scene;
            if (height < 5) {
                model?.scale.set((height / 0.7), (height / 0.7), (height / 0.7));
            } else {
                model?.scale.set((height * 0.1), (height * 0.1), (height * 0.1));
            }
            model.position.y = 0.5;
            scene.add(model);

            // Play animation if present
            if (collada.animations && collada.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model);
                mixer.clipAction(collada.animations[0]).play();
            }
        });

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            if (mixer) mixer.update(clock.getDelta());
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            renderer.dispose();
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, [modelPath]);

    return <div ref={mountRef} />;
}