THREE.DotScreenPass=function(e,r,s){void 0===THREE.DotScreenShader&&console.error("THREE.DotScreenPass relies on THREE.DotScreenShader");var i=THREE.DotScreenShader;this.uniforms=THREE.UniformsUtils.clone(i.uniforms),void 0!==e&&this.uniforms.center.value.copy(e),void 0!==r&&(this.uniforms.angle.value=r),void 0!==s&&(this.uniforms.scale.value=s),this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:i.vertexShader,fragmentShader:i.fragmentShader}),this.enabled=!0,this.renderToScreen=!1,this.needsSwap=!0,this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),this.scene=new THREE.Scene,this.quad=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),this.scene.add(this.quad)},THREE.DotScreenPass.prototype={render:function(e,r,s){this.uniforms.tDiffuse.value=s,this.uniforms.tSize.value.set(s.width,s.height),this.quad.material=this.material,this.renderToScreen?e.render(this.scene,this.camera):e.render(this.scene,this.camera,r,!1)}};