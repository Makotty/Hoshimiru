import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

import Resize from '../lib/Resize'
import sizes from './size'
import Texture from './Texture'
import GalaxyObject from './GalaxyObject'

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

    /**
     * Galaxy
     */

    let points: THREE.Points<
      THREE.BufferGeometry,
      THREE.PointsMaterial
    > | null = null

    // Points
    points = new THREE.Points(GalaxyObject().geometry, GalaxyObject().material)
    scene.add(points)

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
    Resize({ sizes, camera, renderer })

    /**
     * Text
     */
    const fontLoader = new FontLoader()

    fontLoader.load(
      // develop
      // '/fonts/droid/droid_serif_regular.typeface.json',
      // // Production
      '/fonts/droid_serif_regular.typeface.json',
      (font) => {
        const titleGeometry = new TextGeometry('Hoshimiru.', {
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
        titleGeometry.center()

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

        const title = new THREE.Mesh(titleGeometry, Texture().titleMaterial)
        title.position.y = 2.5
        const clickText = new THREE.Mesh(
          clickTextGeometry,
          Texture().clickTextMaterial
        )
        clickText.position.y = 1.25

        scene.add(title)
        scene.add(clickText)

        const clock = new THREE.Clock()

        const tick = () => {
          const elapsedTime = clock.getElapsedTime()

          title.rotation.y = elapsedTime * -0.5
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
