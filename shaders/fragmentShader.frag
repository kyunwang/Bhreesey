const fragment = `
	// Runs after the vertexShader
	uniform float uTime;
	uniform float uScale;

	uniform int isBlack;

	varying float vFrequency;
	varying float vPos;

	const float frequenctNum = 256.0;
	const vec3 baseColor = vec3(0.95, 0.25, 0.3);
	// const vec3 baseColor = vec3(0.0, 0.65, 0.7);

	void main() {
		float f = smoothstep(0.0, 0.00002, vFrequency * vFrequency) * vFrequency;

		// Calculating the everchanging color. Will probably take the lowest (min?)
		float red = min(1.0, baseColor.r + f * 1.9);
		float green = min(1.0, baseColor.g + f * 3.6);
		float blue = min(1.0, baseColor.b + f * 0.01);
		float sum = red + blue + green;

		blue = min(1.0, blue + 0.3);
		green = max(0.0, green - 0.1);

		
		// CHECK: What is this offset for?
		float offsetSum = (sum - (red + blue + green) / 3.0) / 3.0;
		
		blue += offsetSum + min(vPos * 2.0, -0.2);
		red += offsetSum + min(vPos * 0.5, 0.2);
		green += offsetSum - vPos * max(0.3, vFrequency * 2.0);

		vec3 color;

		color = vec3(red, green, blue);

		gl_FragColor = vec4(color, 1.0);
	}
`