import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

import { TextGeometry } from '../lib/TextGeometry.js'
import { FontLoader } from '../lib/FontLoader.js'
import { OrbitControls } from '../lib/OrbitControls.js'

const HomeObject = () => {
  const navigate = useNavigate()
  const createBox = () => {
    /**
     * Canvas
     */
    const canvas = document.querySelector('#home-object') as HTMLCanvasElement

    /**
     * Scene
     */
    const scene = new THREE.Scene()

    type Params = {
      count: number
      size: number
      radius: number
      branches: number
      spin: number
      randomness: number
      randomnessPower: number
      insideColor: string
      outsideColor: string
    }

    /**
     * Galaxy
     */
    const parameters: Params = {
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
    let points: THREE.Points<
      THREE.BufferGeometry,
      THREE.PointsMaterial
    > | null = null

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

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)

    /**
     * Size
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    /**
     * Mouse
     */
    const mouse = new THREE.Vector2()

    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / sizes.width) * 2 - 1
      mouse.y = -(event.clientY / sizes.height) * 2 + 1
    })

    /**
     * Raycaster
     */

    const raycaster = new THREE.Raycaster()

    let currentIntersect:
      | THREE.Intersection<THREE.Object3D<THREE.Event>>[]
      | null = null

    window.addEventListener('click', () => {
      if (currentIntersect) {
        navigate('/current-location')
      }
    })

    /**
     * Camera
     */
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    )
    camera.position.y = 2
    camera.position.z = 7
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Resize
     */
    window.addEventListener('resize', () => {
      // Update Sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      camera.aspect = sizes.width / sizes.height

      camera.updateProjectionMatrix()

      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Texture
     */
    const textureLoader = new THREE.TextureLoader()
    const matcapTexture = textureLoader.load(
      '/src/images/texture/matcaps/3.png'
    )

    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture
    })

    const clickTextTexture = textureLoader.load(
      '/src/images/texture/matcaps/1.png'
    )

    const clickTextMaterial = new THREE.MeshMatcapMaterial({
      matcap: clickTextTexture
    })

    /**
     * Text
     */
    const fontLoader = new FontLoader()

    fontLoader.load(
      '/src/fonts/droid/droid_serif_regular.typeface.json',
      (font) => {
        const textGeometry = new TextGeometry('Hoshimiru.', {
          font,
          size: 0.7,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        })
        textGeometry.center()

        const clickTextGeometry = new TextGeometry('Click', {
          font,
          size: 0.35,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        })
        clickTextGeometry.center()

        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.y = 2.5
        const clickText = new THREE.Mesh(clickTextGeometry, clickTextMaterial)
        clickText.position.y = 1.25

        scene.add(text)
        scene.add(clickText)

        const clock = new THREE.Clock()

        const tick = () => {
          const elapsedTime = clock.getElapsedTime()

          text.rotation.y = elapsedTime * -0.5
          window.requestAnimationFrame(tick)

          raycaster.setFromCamera(mouse, camera)

          const objectsToTest = [clickText]
          const intersects = raycaster.intersectObjects(objectsToTest)

          if (intersects.length) {
            currentIntersect = intersects
          } else {
            currentIntersect = null
          }
        }

        tick()
      }
    )

    /**
     * Animation
     */

    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      if (points) {
        points.rotation.y = elapsedTime * 0.25
      }

      controls.update()

      renderer.render(scene, camera)

      window.requestAnimationFrame(tick)
    }

    tick()
  }

  useEffect(() => {
    createBox()
  }, [])

  return <canvas id="home-object" />
}

export default HomeObject
