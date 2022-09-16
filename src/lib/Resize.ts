type ResizeProps = {
  sizes: { width: number; height: number }
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
}

const Resize = (props: ResizeProps) => {
  const { sizes, camera, renderer } = props
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
}

export default Resize
