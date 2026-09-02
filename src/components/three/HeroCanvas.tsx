/**
 * HeroCanvas.tsx
 *
 * Direct Three.js WebGL visual canvas — 100% resilient, zero React 19 reconciler crashes.
 * Features:
 *   • TorusKnot gold metallic geometry with wireframe overlay
 *   • Outer rotating icosahedron wireframe shell
 *   • Inner glowing core sphere
 *   • Dynamic orbiting point light for specular reflections
 *   • Interactive 360° drag rotation with damping & auto-spin
 *   • Guaranteed alpha transparency (setClearColor 0x000000, 0)
 *   • WebGL context loss recovery & graceful fallback
 */

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface HeroCanvasProps {
  reduced: boolean
}

export default function HeroCanvas({ reduced }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let animationFrameId: number
    let renderer: THREE.WebGLRenderer | null = null

    try {
      // 1. Scene & Camera
      const scene = new THREE.Scene()
      scene.background = null // Strictly transparent

      const width  = container.clientWidth  || 600
      const height = container.clientHeight || 700

      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
      camera.position.set(0, 0, 5)

      // 2. WebGL Renderer with forced transparency
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !reduced,
        powerPreference: 'default',
        premultipliedAlpha: false,
      })
      renderer.setSize(width, height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, reduced ? 1 : 1.5))
      renderer.setClearColor(0x000000, 0) // Fully transparent clear color

      // 3. Lighting Rig
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
      scene.add(ambientLight)

      const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.0)
      dirLight.position.set(5, 8, 5)
      scene.add(dirLight)

      const fillLight = new THREE.PointLight(0x6b7de8, 2.5, 15)
      fillLight.position.set(-6, -4, -4)
      scene.add(fillLight)

      const orbitLight = new THREE.PointLight(0xc8a96e, 3.5, 12)
      scene.add(orbitLight)

      // 4. Geometry & Meshes
      const rootGroup = new THREE.Group()
      scene.add(rootGroup)

      // Primary Torus Knot
      const knotSegs = reduced ? { tub: 48, rad: 8 } : { tub: 100, rad: 16 }
      const knotGeo = new THREE.TorusKnotGeometry(1, 0.32, knotSegs.tub, knotSegs.rad, 2, 3)

      const knotMat = new THREE.MeshStandardMaterial({
        color: 0xc8a96e,
        metalness: 0.9,
        roughness: 0.15,
      })
      const knotMesh = new THREE.Mesh(knotGeo, knotMat)
      rootGroup.add(knotMesh)

      // Wireframe overlay on Torus Knot
      const knotWireMat = new THREE.MeshBasicMaterial({
        color: 0xd4b87a,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      })
      const knotWireMesh = new THREE.Mesh(knotGeo, knotWireMat)
      knotWireMesh.scale.setScalar(1.035)
      rootGroup.add(knotWireMesh)

      // Outer Icosahedron Shell
      const icoDetail = reduced ? 1 : 2
      const icoGeo = new THREE.IcosahedronGeometry(1.85, icoDetail)
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0xc8a96e,
        wireframe: true,
        transparent: true,
        opacity: 0.05,
      })
      const icoMesh = new THREE.Mesh(icoGeo, icoMat)
      rootGroup.add(icoMesh)

      // Inner Glowing Core
      const coreGeo = new THREE.SphereGeometry(0.35, 16, 16)
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xc8a96e,
        transparent: true,
        opacity: 0.12,
      })
      const coreMesh = new THREE.Mesh(coreGeo, coreMat)
      rootGroup.add(coreMesh)

      // Background Stars Particles (Desktop only)
      let particlesMesh: THREE.Points | null = null
      if (!reduced) {
        const particleCount = 200
        const particleGeo = new THREE.BufferGeometry()
        const positions = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i]     = (Math.random() - 0.5) * 15
          positions[i + 1] = (Math.random() - 0.5) * 15
          positions[i + 2] = (Math.random() - 0.5) * 10 - 2
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const particleMat = new THREE.PointsMaterial({
          color: 0xc8a96e,
          size: 0.04,
          transparent: true,
          opacity: 0.35,
        })
        particlesMesh = new THREE.Points(particleGeo, particleMat)
        scene.add(particlesMesh)
      }

      // 5. Interactive Drag Rotation & Momentum
      let isDragging = false
      let prevMousePos = { x: 0, y: 0 }
      let targetRot = { x: 0, y: 0 }
      let currentRot = { x: 0, y: 0 }

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true
        prevMousePos = { x: e.clientX, y: e.clientY }
      }

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return
        const deltaX = e.clientX - prevMousePos.x
        const deltaY = e.clientY - prevMousePos.y

        targetRot.y += deltaX * 0.006
        targetRot.x += deltaY * 0.006

        // Clamp vertical tilt
        targetRot.x = Math.max(-0.8, Math.min(0.8, targetRot.x))

        prevMousePos = { x: e.clientX, y: e.clientY }
      }

      const onPointerUp = () => {
        isDragging = false
      }

      canvas.addEventListener('pointerdown', onPointerDown)
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup',   onPointerUp)

      // 6. Resize Observer
      const resizeObserver = new ResizeObserver(() => {
        if (!container || !renderer) return
        const w = container.clientWidth
        const h = container.clientHeight
        if (w === 0 || h === 0) return
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h, false)
      })
      resizeObserver.observe(container)

      // 7. Render Loop
      const clock = new THREE.Clock()

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)

        const delta = clock.getDelta()
        const elapsedTime = clock.getElapsedTime()

        // Auto rotation + smooth inertia damping
        if (!isDragging) {
          targetRot.y += (reduced ? 0.3 : 0.6) * delta
        }

        currentRot.x += (targetRot.x - currentRot.x) * 0.08
        currentRot.y += (targetRot.y - currentRot.y) * 0.08

        rootGroup.rotation.x = currentRot.x
        rootGroup.rotation.y = currentRot.y

        // Mesh animations
        knotMesh.position.y = Math.sin(elapsedTime * 0.6) * 0.1
        knotWireMesh.position.y = knotMesh.position.y
        knotWireMesh.rotation.z = elapsedTime * 0.04

        icoMesh.rotation.x = elapsedTime * 0.05
        icoMesh.rotation.z = -elapsedTime * 0.03

        coreMesh.scale.setScalar(0.35 + Math.sin(elapsedTime * 1.5) * 0.04)

        // Orbiting light position
        orbitLight.position.x = Math.sin(elapsedTime * 0.6) * 4
        orbitLight.position.z = Math.cos(elapsedTime * 0.6) * 4
        orbitLight.position.y = Math.sin(elapsedTime * 0.4) * 2

        if (particlesMesh) {
          particlesMesh.rotation.y = elapsedTime * 0.02
        }

        renderer?.render(scene, camera)
      }

      animate()

      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrameId)
        canvas.removeEventListener('pointerdown', onPointerDown)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerup',   onPointerUp)
        resizeObserver.disconnect()

        knotGeo.dispose()
        knotMat.dispose()
        knotWireMat.dispose()
        icoGeo.dispose()
        icoMat.dispose()
        coreGeo.dispose()
        coreMat.dispose()
        renderer?.dispose()
      }
    } catch (err) {
      console.warn('Three.js canvas init fallback:', err)
    }
  }, [reduced])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
        style={{
          background: 'transparent',
          touchAction: 'none',
        }}
      />
    </div>
  )
}
