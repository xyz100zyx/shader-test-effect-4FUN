varying vec3 vPosition;
varying vec3 vNormal;

void main(){

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;

    vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

    vNormal = modelNormal;
    vPosition = modelPosition.xyz;

    gl_Position = projectedPosition;

}