THREE.Geometry4=function(t){THREE.BufferGeometry.call(this);var r=new ArrayBuffer(3*t*4),e=new ArrayBuffer(3*t*4),o=new ArrayBuffer(2*t*4);this.attributes.position={array:new Float32Array(r,0,3*t),itemSize:3},this.attributes.normal={array:new Float32Array(e,0,3*t),itemSize:3},this.attributes.uv={array:new Float32Array(o,0,2*t),itemSize:2},this.vertices=new THREE.VectorArrayProxy(this.attributes.position),this.normals=new THREE.VectorArrayProxy(this.attributes.normal),this.uvs=new THREE.VectorArrayProxy(this.attributes.uv)},THREE.Geometry4.prototype=Object.create(THREE.BufferGeometry.prototype),THREE.Geometry4.prototype.constructor=THREE.Geometry4,THREE.VectorArrayProxy=function(t){this.attribute=t;for(var r=0,e=this.attribute.array.length/this.attribute.itemSize;e>r;r++)Object.defineProperty(this,r,{get:function(t){return function(){return this.getValue(t)}}(r),set:function(t){return function(r){return this.setValue(t,r)}}(r)})},THREE.VectorArrayProxy.prototype.getValue=function(t){var r=this.attribute.array.subarray(t*this.attribute.itemSize,(t+1)*this.attribute.itemSize);switch(this.attribute.itemSize){case 2:return new THREE.Vector2Proxy(r);case 3:return new THREE.Vector3Proxy(r)}},THREE.VectorArrayProxy.prototype.setValue=function(t,r){var e=this[t];e.copy(r)},THREE.Vector2Proxy=function(t){this.subarray=t},THREE.Vector2Proxy.prototype=Object.create(THREE.Vector2.prototype),THREE.Vector2Proxy.prototype.constructor=THREE.Vector2Proxy,Object.defineProperty(THREE.Vector2Proxy.prototype,"x",{get:function(){return this.subarray[0]},set:function(t){this.subarray[0]=t}}),Object.defineProperty(THREE.Vector2Proxy.prototype,"y",{get:function(){return this.subarray[1]},set:function(t){this.subarray[1]=t}}),THREE.Vector3Proxy=function(t){this.subarray=t},THREE.Vector3Proxy.prototype=Object.create(THREE.Vector3.prototype),THREE.Vector3Proxy.prototype.constructor=THREE.Vector3Proxy,Object.defineProperty(THREE.Vector3Proxy.prototype,"x",{get:function(){return this.subarray[0]},set:function(t){this.subarray[0]=t}}),Object.defineProperty(THREE.Vector3Proxy.prototype,"y",{get:function(){return this.subarray[1]},set:function(t){this.subarray[1]=t}}),Object.defineProperty(THREE.Vector3Proxy.prototype,"z",{get:function(){return this.subarray[2]},set:function(t){this.subarray[2]=t}});