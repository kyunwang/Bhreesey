const vertex = `
	uniform float uTime;
	uniform float uScale;

	attribute float aFrequency;

	// Passes to the fragmentShader
	varying float vFrequency;
	varying float vPos;

	const float frequencyNum = 256.0;
	const float radius = 40.0;
	const float PI = 3.14159265;

	// CHECK: Need to check why this is so. What this sin15 means
	const float _sin15 = sin(PI / 10.0);
	const float _cos15 = cos(PI / 10.0);

	// void return nothing. main executes on GPU
	void main() {
		float frequency;
		float squareF = aFrequency * aFrequency;

		// CHECK: What is this smoothstep
		frequency = smoothstep(16.0, 7200.0, squareF) * squareF / (frequencyNum * frequencyNum);

		// Assign for fragment shader
		vFrequency = frequency;

		float _uScale = (1.0 - uScale * 0.5 / frequencyNum) * 3.0;

		// CHECK: Don't understand all this sin and cos
		float _sin = sin(uTime * 0.5);
		float _cos = cos(uTime * 0.5);

		mat2 rot = mat2(_cos, -_sin, _sin, _cos);
		mat2 rot15 = mat2(_cos15, -_sin15, _sin15, _cos15);

		// CHECK: Why reassign xy after reassignine xy already?
		vec2 _pos = rot * position.xz;
		vec3 newPos = vec3(_pos.x, position.y, _pos.y);
		newPos.xy = rot15 * newPos.xy;

		newPos = (1.0 + uScale / (frequencyNum * 2.0) ) * newPos;

		vPos = (newPos.x + newPos.y + newPos.z) / (3.0 * 120.0);


		// vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
		gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos + vFrequency * newPos * _uScale, 1.0);
	}
`