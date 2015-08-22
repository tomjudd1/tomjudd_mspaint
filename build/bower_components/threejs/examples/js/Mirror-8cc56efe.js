THREE.ShaderLib.mirror={uniforms:{mirrorColor:{type:"c",value:new THREE.Color(8355711)},mirrorSampler:{type:"t",value:null},textureMatrix:{type:"m4",value:new THREE.Matrix4}},vertexShader:["uniform mat4 textureMatrix;","varying vec4 mirrorCoord;","void main() {","vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","vec4 worldPosition = modelMatrix * vec4( position, 1.0 );","mirrorCoord = textureMatrix * worldPosition;","gl_Position = projectionMatrix * mvPosition;","}"].join("\n"),fragmentShader:["uniform vec3 mirrorColor;","uniform sampler2D mirrorSampler;","varying vec4 mirrorCoord;","float blendOverlay(float base, float blend) {","return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );","}","void main() {","vec4 color = texture2DProj(mirrorSampler, mirrorCoord);","color = vec4(blendOverlay(mirrorColor.r, color.r), blendOverlay(mirrorColor.g, color.g), blendOverlay(mirrorColor.b, color.b), 1.0);","gl_FragColor = color;","}"].join("\n")},THREE.Mirror=function(r,e,t){THREE.Object3D.call(this),this.name="mirror_"+this.id,t=t||{},this.matrixNeedsUpdate=!0;var i=void 0!==t.textureWidth?t.textureWidth:512,o=void 0!==t.textureHeight?t.textureHeight:512;this.clipBias=void 0!==t.clipBias?t.clipBias:0;var a=new THREE.Color(void 0!==t.color?t.color:8355711);this.renderer=r,this.mirrorPlane=new THREE.Plane,this.normal=new THREE.Vector3(0,0,1),this.mirrorWorldPosition=new THREE.Vector3,this.cameraWorldPosition=new THREE.Vector3,this.rotationMatrix=new THREE.Matrix4,this.lookAtPosition=new THREE.Vector3(0,0,-1),this.clipPlane=new THREE.Vector4;var s=void 0!==t.debugMode?t.debugMode:!1;if(s){var n=new THREE.ArrowHelper(new THREE.Vector3(0,0,1),new THREE.Vector3(0,0,0),10,16777088),m=new THREE.Geometry;m.vertices.push(new THREE.Vector3(-10,-10,0)),m.vertices.push(new THREE.Vector3(10,-10,0)),m.vertices.push(new THREE.Vector3(10,10,0)),m.vertices.push(new THREE.Vector3(-10,10,0)),m.vertices.push(m.vertices[0]);var l=new THREE.Line(m,new THREE.LineBasicMaterial({color:16777088}));this.add(n),this.add(l)}e instanceof THREE.PerspectiveCamera?this.camera=e:(this.camera=new THREE.PerspectiveCamera,console.log(this.name+": camera is not a Perspective Camera!")),this.textureMatrix=new THREE.Matrix4,this.mirrorCamera=this.camera.clone(),this.mirrorCamera.matrixAutoUpdate=!0,this.texture=new THREE.WebGLRenderTarget(i,o),this.tempTexture=new THREE.WebGLRenderTarget(i,o);var h=THREE.ShaderLib.mirror,d=THREE.UniformsUtils.clone(h.uniforms);this.material=new THREE.ShaderMaterial({fragmentShader:h.fragmentShader,vertexShader:h.vertexShader,uniforms:d}),this.material.uniforms.mirrorSampler.value=this.texture,this.material.uniforms.mirrorColor.value=a,this.material.uniforms.textureMatrix.value=this.textureMatrix,THREE.Math.isPowerOfTwo(i)&&THREE.Math.isPowerOfTwo(o)||(this.texture.generateMipmaps=!1,this.tempTexture.generateMipmaps=!1),this.updateTextureMatrix(),this.render()},THREE.Mirror.prototype=Object.create(THREE.Object3D.prototype),THREE.Mirror.prototype.constructor=THREE.Mirror,THREE.Mirror.prototype.renderWithMirror=function(r){this.updateTextureMatrix(),this.matrixNeedsUpdate=!1;var e=r.camera;r.camera=this.mirrorCamera,r.renderTemp(),r.material.uniforms.mirrorSampler.value=r.tempTexture,this.render(),this.matrixNeedsUpdate=!0,r.material.uniforms.mirrorSampler.value=r.texture,r.camera=e,r.updateTextureMatrix()},THREE.Mirror.prototype.updateTextureMatrix=function(){this.updateMatrixWorld(),this.camera.updateMatrixWorld(),this.mirrorWorldPosition.setFromMatrixPosition(this.matrixWorld),this.cameraWorldPosition.setFromMatrixPosition(this.camera.matrixWorld),this.rotationMatrix.extractRotation(this.matrixWorld),this.normal.set(0,0,1),this.normal.applyMatrix4(this.rotationMatrix);var r=this.mirrorWorldPosition.clone().sub(this.cameraWorldPosition);r.reflect(this.normal).negate(),r.add(this.mirrorWorldPosition),this.rotationMatrix.extractRotation(this.camera.matrixWorld),this.lookAtPosition.set(0,0,-1),this.lookAtPosition.applyMatrix4(this.rotationMatrix),this.lookAtPosition.add(this.cameraWorldPosition);var e=this.mirrorWorldPosition.clone().sub(this.lookAtPosition);e.reflect(this.normal).negate(),e.add(this.mirrorWorldPosition),this.up.set(0,-1,0),this.up.applyMatrix4(this.rotationMatrix),this.up.reflect(this.normal).negate(),this.mirrorCamera.position.copy(r),this.mirrorCamera.up=this.up,this.mirrorCamera.lookAt(e),this.mirrorCamera.updateProjectionMatrix(),this.mirrorCamera.updateMatrixWorld(),this.mirrorCamera.matrixWorldInverse.getInverse(this.mirrorCamera.matrixWorld),this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.mirrorCamera.projectionMatrix),this.textureMatrix.multiply(this.mirrorCamera.matrixWorldInverse),this.mirrorPlane.setFromNormalAndCoplanarPoint(this.normal,this.mirrorWorldPosition),this.mirrorPlane.applyMatrix4(this.mirrorCamera.matrixWorldInverse),this.clipPlane.set(this.mirrorPlane.normal.x,this.mirrorPlane.normal.y,this.mirrorPlane.normal.z,this.mirrorPlane.constant);var t=new THREE.Vector4,i=this.mirrorCamera.projectionMatrix;t.x=(Math.sign(this.clipPlane.x)+i.elements[8])/i.elements[0],t.y=(Math.sign(this.clipPlane.y)+i.elements[9])/i.elements[5],t.z=-1,t.w=(1+i.elements[10])/i.elements[14];var o=new THREE.Vector4;o=this.clipPlane.multiplyScalar(2/this.clipPlane.dot(t)),i.elements[2]=o.x,i.elements[6]=o.y,i.elements[10]=o.z+1-this.clipBias,i.elements[14]=o.w},THREE.Mirror.prototype.render=function(){this.matrixNeedsUpdate&&this.updateTextureMatrix(),this.matrixNeedsUpdate=!0;for(var r=this;void 0!==r.parent;)r=r.parent;void 0!==r&&r instanceof THREE.Scene&&this.renderer.render(r,this.mirrorCamera,this.texture,!0)},THREE.Mirror.prototype.renderTemp=function(){this.matrixNeedsUpdate&&this.updateTextureMatrix(),this.matrixNeedsUpdate=!0;for(var r=this;void 0!==r.parent;)r=r.parent;void 0!==r&&r instanceof THREE.Scene&&this.renderer.render(r,this.mirrorCamera,this.tempTexture,!0)};