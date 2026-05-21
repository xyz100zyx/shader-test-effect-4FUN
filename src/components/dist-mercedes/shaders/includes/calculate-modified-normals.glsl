vec3 calculateModifiedNormal(in vec3 modifiedPos, in vec3 originalPos, in vec3 originalNormal) {
    
    return modifiedPos * originalNormal;
}