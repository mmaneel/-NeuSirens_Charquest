const vertexShader = () => {
  return `
      varying float x;
      varying float y;
      varying float z;
      varying vec3 vUv;

      uniform float u_time;
      uniform float u_amplitude;
      uniform float[64] u_data_arr;
      // uniform float u_sens_x;
      // uniform float u_sens_y;
    

      void main() {
        vUv = position;

        x = abs(position.x);
	      y = abs(position.y);

        float floor_x = round(x);
	      float floor_y = round(y);

        float x_multiplier = (32.0 - x) / 8.0;
        float y_multiplier = (32.0 - y) / 8.0;

      
        z = sin(u_data_arr[int(floor_x)] / 50.00 + u_data_arr[int(floor_y)] /50.00) * u_amplitude; //musicaly reactive standard wave
     

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
      }
    `;
};

const fragmentShader = () => {
  return `
    varying float x;
    varying float y;
    varying float z;
    varying vec3 vUv;

    
    uniform float u_color_r;
    uniform float u_color_g;
    uniform float u_color_b;
    

    void main() {
      

      
      gl_FragColor = vec4((u_color_r - abs(x)) / 32.0, (u_color_g - abs(y)) / 32.0, (abs(u_color_b) / 2.0) / 32.0, 1.0);
    }
  `;
};

export { vertexShader, fragmentShader };
