import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0
    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX - windowHalfX)
      mouseY = (e.clientY - windowHalfY)
    }
    document.addEventListener('mousemove', handleMouse)

    const group = new THREE.Group()
    scene.add(group)

    const particleCount = 150
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const particlesData: { velocity: THREE.Vector3; numConnections: number }[] = []

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = THREE.MathUtils.randFloatSpread(100)
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(100)
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(100)
      particlesData.push({
        velocity: new THREE.Vector3(-0.1 + Math.random() * 0.2, -0.1 + Math.random() * 0.2, -0.1 + Math.random() * 0.2),
        numConnections: 0
      })
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const pMaterial = new THREE.PointsMaterial({
      color: 0x00ffcc, size: 0.5, blending: THREE.AdditiveBlending, transparent: true, sizeAttenuation: true
    })
    const particles = new THREE.Points(geometry, pMaterial)
    group.add(particles)

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7000ff, transparent: true, opacity: 0.15 })
    const segments = particleCount * particleCount
    const linePositions = new Float32Array(segments * 3)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    group.add(linesMesh)

    const animate = () => {
      requestAnimationFrame(animate)
      targetX = mouseX * 0.05
      targetY = mouseY * 0.05
      camera.position.x += (targetX - camera.position.x) * 0.02
      camera.position.y += (-targetY - camera.position.y) * 0.02
      camera.lookAt(scene.position)
      group.rotation.y += 0.001
      group.rotation.x += 0.0005

      let vertexpos = 0
      const pPositions = particles.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) particlesData[i].numConnections = 0

      for (let i = 0; i < particleCount; i++) {
        const pData = particlesData[i]
        pPositions[i * 3] += pData.velocity.x
        pPositions[i * 3 + 1] += pData.velocity.y
        pPositions[i * 3 + 2] += pData.velocity.z

        if (pPositions[i * 3] < -50 || pPositions[i * 3] > 50) pData.velocity.x *= -1
        if (pPositions[i * 3 + 1] < -50 || pPositions[i * 3 + 1] > 50) pData.velocity.y *= -1
        if (pPositions[i * 3 + 2] < -50 || pPositions[i * 3 + 2] > 50) pData.velocity.z *= -1

        for (let j = i + 1; j < particleCount; j++) {
          const dx = pPositions[i * 3] - pPositions[j * 3]
          const dy = pPositions[i * 3 + 1] - pPositions[j * 3 + 1]
          const dz = pPositions[i * 3 + 2] - pPositions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < 15) {
            particlesData[j].numConnections++
            pData.numConnections++
            linePositions[vertexpos++] = pPositions[i * 3]
            linePositions[vertexpos++] = pPositions[i * 3 + 1]
            linePositions[vertexpos++] = pPositions[i * 3 + 2]
            linePositions[vertexpos++] = pPositions[j * 3]
            linePositions[vertexpos++] = pPositions[j * 3 + 1]
            linePositions[vertexpos++] = pPositions[j * 3 + 2]
          }
        }
      }

      linesMesh.geometry.setDrawRange(0, vertexpos / 3)
      linesMesh.geometry.attributes.position.needsUpdate = true
      particles.geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} id="webgl-canvas" />
}

export default ThreeBackground
