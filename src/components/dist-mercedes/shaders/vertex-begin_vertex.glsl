vec3 customizedPosition = position;

float progress = uProgress;

float yMult = cnoise(customizedPosition) * sin(uTime);
float xMult = cnoise(customizedPosition) * cos(uTime);

float smoothedYMult = smoothstep(1.0, yMult, progress);
float smoothedXMult = smoothstep(1.0, xMult, progress);

customizedPosition.y *= smoothedYMult;
customizedPosition.x *= smoothedXMult;

vec3 transformed = customizedPosition;