THREE.BabylonLoader=function(r){this.manager=void 0!==r?r:THREE.DefaultLoadingManager},THREE.BabylonLoader.prototype={constructor:THREE.ObjectLoader,load:function(r,e,a,t){var i=this,n=new THREE.XHRLoader(i.manager);n.setCrossOrigin(this.crossOrigin),n.load(r,function(r){e(i.parse(JSON.parse(r)))},a,t)},setCrossOrigin:function(r){this.crossOrigin=r},parse:function(r){var e=this.parseMaterials(r),a=this.parseObjects(r,e);return a},parseMaterials:function(r){for(var e={},a=0,t=r.materials.length;t>a;a++){var i=r.materials[a],n=new THREE.MeshPhongMaterial;n.name=i.name,n.color.fromArray(i.diffuse),n.emissive.fromArray(i.emissive),n.specular.fromArray(i.specular),n.shininess=i.specularPower,n.opacity=i.alpha,e[i.id]=n}if(r.multiMaterials)for(var a=0,t=r.multiMaterials.length;t>a;a++){var i=r.multiMaterials[a];console.warn("THREE.BabylonLoader: Multi materials not yet supported."),e[i.id]=new THREE.MeshPhongMaterial}return e},parseGeometry:function(r){var e=new THREE.BufferGeometry,a=new Uint16Array(r.indices);e.addAttribute("index",new THREE.BufferAttribute(a,1));for(var t=new Float32Array(r.positions),i=2,n=t.length;n>i;i+=3)t[i]=-t[i];if(e.addAttribute("position",new THREE.BufferAttribute(t,3)),r.normals){for(var o=new Float32Array(r.normals),i=2,n=o.length;n>i;i+=3)o[i]=-o[i];e.addAttribute("normal",new THREE.BufferAttribute(o,3))}if(r.uvs){var s=new Float32Array(r.uvs);e.addAttribute("uv",new THREE.BufferAttribute(s,2))}var l=r.subMeshes;if(l)for(var i=0,n=l.length;n>i;i++){var f=l[i];e.addDrawCall(f.indexStart,f.indexCount)}else e.addDrawCall(0,r.indices.length);return e},parseObjects:function(r,e){for(var a={},t=new THREE.Scene,i=r.cameras,n=0,o=i.length;o>n;n++){var s=i[n],l=new THREE.PerspectiveCamera(s.fov/Math.PI*180,1.33,s.minZ,s.maxZ);l.name=s.name,l.position.fromArray(s.position),s.rotation&&l.rotation.fromArray(s.rotation),a[s.id]=l}for(var f=r.lights,n=0,o=f.length;o>n;n++){var u,s=f[n];switch(s.type){case 0:u=new THREE.PointLight;break;case 1:u=new THREE.DirectionalLight;break;case 2:u=new THREE.SpotLight;break;case 3:u=new THREE.HemisphereLight}u.name=s.name,u.position.set(s.position[0],s.position[1],-s.position[2]),u.color.fromArray(s.diffuse),s.intensity&&(u.intensity=s.intensity),a[s.id]=u,t.add(u)}for(var d=r.meshes,n=0,o=d.length;o>n;n++){var E,s=d[n];if(s.indices){var m=this.parseGeometry(s);E=new THREE.Mesh(m,e[s.materialId])}else E=new THREE.Group;E.name=s.name,E.position.set(s.position[0],s.position[1],-s.position[2]),E.rotation.fromArray(s.rotation),s.rotationQuaternion&&E.quaternion.fromArray(s.rotationQuaternion),E.scale.fromArray(s.scaling),s.parentId?a[s.parentId].add(E):t.add(E),a[s.id]=E}return t}};