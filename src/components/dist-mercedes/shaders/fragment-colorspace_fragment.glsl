vec4 outColorTest = linearToOutputTexel( gl_FragColor );
vec4 colorByNormals = vec4(vNormal, 1.0);

gl_FragColor = mix(colorByNormals, outColorTest, uProgress);