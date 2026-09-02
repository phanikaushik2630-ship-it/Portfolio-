/**
 * HeroScene.tsx
 *
 * Self-contained React Three Fiber scene for the Hero section.
 * Intentionally lightweight — only primitive geometries, no glTF.
 *
 * Visual layers:
 *   1. Ambient + coloured point lights
 *   2. TorusKnot — gold metallic primary object (OrbitControls drag)
 *   3. Outer icosahedron wireframe shell — slow counter-rotation
 *   4. Inner glowing core sphere
 *   5. Stars (desktop only)
 */

import { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

// ── Force transparent WebGL background ────────────────────
// Must live INSIDE the Canvas context so useThree() works.
function ClearColor() {
  const { gl, scene } = useThree()
  useLayoutEffect(() => {
    gl.setClearColor(0x000000, 0) // black with 0 alpha = fully transparent
    scene.background = null       // remove any scene-level background
  }, [gl, scene])
  return null
}

// ── Geometry segment counts ────────────────────────────────
const KNOT_SEGS_HI  = { tub: 128, rad: 16 } as const
const KNOT_SEGS_LO  = { tub: 48,  rad: 8  } as const
const ICO_DETAIL_HI = 2
const ICO_DETAIL_LO = 1

// ── Floating primary mesh ──────────────────────────────────
function TorusKnotMesh({ reduced }: { reduced: boolean }) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const wireRef  = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const segs = reduced ? KNOT_SEGS_LO : KNOT_SEGS_HI

  // Shared geometry (re-used for both solid + wireframe)
  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(1, 0.32, segs.tub, segs.rad, 2, 3),
    [segs.tub, segs.rad],
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Gentle vertical float
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.12
    }
    // Wireframe shell slow independent spin
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.08
      wireRef.current.rotation.z = t * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      {/* Solid gold mesh */}
      <mesh ref={meshRef} geometry={geometry} castShadow>
        <meshStandardMaterial
          color="#c8a96e"
          metalness={0.95}
          roughness={0.08}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Wireframe overlay — same geometry, slightly scaled out */}
      <mesh ref={wireRef} geometry={geometry} scale={1.035}>
        <meshBasicMaterial
          color="#d4b87a"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>
    </group>
  )
}

// ── Outer icosahedron wireframe shell ──────────────────────
function IcoShell({ reduced }: { reduced: boolean }) {
  const shellRef = useRef<THREE.Mesh>(null)
  const detail   = reduced ? ICO_DETAIL_LO : ICO_DETAIL_HI

  const geometry = useMemo(
    () => new THREE.IcosahedronGeometry(1.85, detail),
    [detail],
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (shellRef.current) {
      shellRef.current.rotation.x =  t * 0.07
      shellRef.current.rotation.y = -t * 0.04
    }
  })

  return (
    <mesh ref={shellRef} geometry={geometry}>
      <meshBasicMaterial
        color="#c8a96e"
        wireframe
        transparent
        opacity={0.045}
      />
    </mesh>
  )
}

// ── Glowing core ───────────────────────────────────────────
function CoreGlow() {
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (coreRef.current) {
      const pulse = 0.28 + Math.sin(t * 1.4) * 0.04
      coreRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#c8a96e" transparent opacity={0.06} />
    </mesh>
  )
}

// ── Point light that orbits for dynamic reflections ────────
function OrbitingLight() {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.5) * 4
      lightRef.current.position.z = Math.cos(t * 0.5) * 4
    }
  })

  return (
    <pointLight
      ref={lightRef}
      intensity={2.5}
      color="#c8a96e"
      distance={12}
      decay={2}
    />
  )
}

// ── Public scene export ────────────────────────────────────
interface HeroSceneProps {
  reduced: boolean
}

export function HeroScene({ reduced }: HeroSceneProps) {
  return (
    <>
      {/* Transparent clear — must be first child */}
      <ClearColor />
      {/* Lighting rig */}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#ffffff"
      />
      {/* Static fill light — cool blue-purple for contrast */}
      <pointLight
        position={[-6, -4, -4]}
        intensity={1.8}
        color="#6b7de8"
        distance={14}
        decay={2}
      />
      {/* Dynamic orbiting gold light for live reflections */}
      {!reduced && <OrbitingLight />}

      {/* Geometry */}
      <TorusKnotMesh reduced={reduced} />
      <IcoShell      reduced={reduced} />
      {!reduced && <CoreGlow />}

      {/* Atmosphere */}
      {!reduced && (
        <Stars
          radius={60}
          depth={40}
          count={400}
          factor={2.5}
          saturation={0}
          fade
          speed={0.4}
        />
      )}

      {/* Interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={reduced ? 0.6 : 1.2}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.78}
        minPolarAngle={Math.PI * 0.22}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  )
}
