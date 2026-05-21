#include ./include/fragment-defines.glsl

uniform vec2 uResolution;
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main(){

    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);

    float intensity = dot(normal, DIRECTION);
    intensity = smoothstep(LOW, HIGHT, intensity);

    vec2 uv = gl_FragCoord.xy / uResolution.y;
    uv *= REPETITION_COUNT;
    uv = mod(uv, 1.0);

    float point = distance(uv, vec2(0.5));
    point = 1.0 - step(0.5 * intensity, point);

    vec3 color = mix(COLOR_FROM, COLOR_TO, point);

    float alpha = 1.0;
    bool isBlack = color.r == 0.0;
    if(isBlack) {
        alpha = mix(1.0, 0.0, sin(uTime));
    }

    gl_FragColor = vec4(
        vec3(color),alpha
    );

    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}