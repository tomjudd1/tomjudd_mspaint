THREE.UCSCharacter=function(){function t(t,n){for(var o=THREE.UVMapping,e=[],a=0;a<n.length;a++)e[a]=THREE.ImageUtils.loadTexture(t+n[a],o,s.checkLoadComplete),e[a].name=n[a];return e}function n(t){for(var n=[],o=0;o<t.length;o++)n[o]=new THREE.MeshLambertMaterial({color:15658734,specular:10,map:t[o],skinning:!0,morphTargets:!0,wrapAround:!0});return n}var o,s=this;this.scale=1,this.root=new THREE.Object3D,this.numSkins,this.numMorphs,this.skins=[],this.materials=[],this.morphs=[],this.onLoadComplete=function(){},this.loadCounter=0,this.loadParts=function(e){this.numSkins=e.skins.length,this.numMorphs=e.morphs.length,this.loadCounter=1+e.skins.length,this.skins=t(e.baseUrl+"skins/",e.skins),this.materials=n(this.skins),this.morphs=e.morphs;var a=new THREE.JSONLoader;console.log(e.baseUrl+e.character),a.load(e.baseUrl+e.character,function(t){t.computeBoundingBox(),t.computeVertexNormals(),o=new THREE.SkinnedMesh(t,new THREE.MeshFaceMaterial),s.root.add(o);var n=t.boundingBox;s.root.scale.set(e.s,e.s,e.s),s.root.position.set(e.x,e.y-n.min.y*e.s,e.z),o.castShadow=!0,o.receiveShadow=!0,animation=new THREE.Animation(o,t.animation),animation.play(),s.setSkin(0),s.checkLoadComplete()})},this.setSkin=function(t){o&&s.materials&&(o.material=s.materials[t])},this.updateMorphs=function(t){if(o)for(var n=0;n<s.numMorphs;n++)o.morphTargetInfluences[n]=t[s.morphs[n]]/100},this.checkLoadComplete=function(){s.loadCounter-=1,0===s.loadCounter&&s.onLoadComplete()}};