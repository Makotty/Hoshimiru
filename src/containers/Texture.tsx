import * as THREE from 'three'

import matcap1 from '../images/texture/matcaps/1.png'
import matcap3 from '../images/texture/matcaps/3.png'

const Texture = () => {
  /**
   * Texture
   */
  const textureLoader = new THREE.TextureLoader()
  const matcapTexture = textureLoader.load(matcap3)

  const titleMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
  })

  const clickTextTexture = textureLoader.load(matcap1)

  const clickTextMaterial = new THREE.MeshMatcapMaterial({
    matcap: clickTextTexture
  })

  return { titleMaterial, clickTextMaterial }
}
export default Texture
