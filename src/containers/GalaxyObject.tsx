import * as THREE from 'three'

import { GalaxyParams } from '../types/GalaxyParameters'

const GalaxyObject = () => {
  /**
   * Galaxy
   */
  const parameters: GalaxyParams = {
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 4,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#745399',
    outsideColor: '#1b3984'
  }

  let geometry: THREE.BufferGeometry | null = null
  let material: THREE.PointsMaterial | null = null

  /**
   * Geometry
   */
  geometry = new THREE.BufferGeometry()

  const positions = new Float32Array(parameters.count * 3)
  const colors = new Float32Array(parameters.count * 3)

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)

  for (let i = 0; i < parameters.count; i += 1) {
    // Position
    const i3 = i * 3

    const radius = Math.random() * parameters.radius

    const spinAngle = radius * parameters.spin
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2

    const randomX =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius
    const randomY =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius
    const randomZ =
      Math.random() ** parameters.randomnessPower *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    // Color
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)

    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  /**
   * Material
   */
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  })

  return { geometry, material }
}

export default GalaxyObject
