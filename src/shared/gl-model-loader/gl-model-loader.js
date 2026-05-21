import { GLTFLoader } from "three/examples/jsm/Addons.js";

const glModelsCached = new Map();

export class GLModelLoader {
  #gltfLoader;

  #cacheKey;

  constructor(cacheKey) {
    this.#gltfLoader = new GLTFLoader();

    if (cacheKey) this.#cacheKey = cacheKey;
  }

  async loadGLModel(url, onSuccess, onError, onProgress) {
    try {
      if (this.#cacheKey && glModelsCached.has(this.#cacheKey))
        return glModelsCached.get(this.#cacheKey);

      const loadingResult = await this.#gltfLoader.loadAsync(url, onProgress);

      onSuccess(loadingResult);
      if (this.#cacheKey) this.addToCache(loadingResult);

      return loadingResult;
    } catch (e) {
      onError(e);

      return null;
    }
  }

  addToCache(loadingResult) {
    glModelsCached.set(this.#cacheKey, loadingResult);
  }

  dispose() {
    glModelsCached.delete(this.#cacheKey);
  }
}
