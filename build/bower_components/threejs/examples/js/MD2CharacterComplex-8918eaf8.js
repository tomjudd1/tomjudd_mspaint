THREE.MD2CharacterComplex=function(){function e(e,t){for(var s=THREE.UVMapping,a=[],o=0;o<t.length;o++)a[o]=THREE.ImageUtils.loadTexture(e+t[o],s,i),a[o].name=t[o];return a}function t(e,t){e.computeMorphNormals();var i=THREE.ImageUtils.generateDataTexture(1,1,new THREE.Color(16777215)),s=new THREE.MeshPhongMaterial({color:16755200,specular:1118481,shininess:50,wireframe:!0,shading:THREE.SmoothShading,map:i,morphTargets:!0,morphNormals:!0,metal:!0}),o=new THREE.MeshPhongMaterial({color:16777215,specular:1118481,shininess:50,wireframe:!1,shading:THREE.SmoothShading,map:t,morphTargets:!0,morphNormals:!0,metal:!0});o.wrapAround=!0;var h=new THREE.MorphBlendMesh(e,o);return h.rotation.y=-Math.PI/2,h.materialTexture=o,h.materialWireframe=s,h.autoCreateAnimations(a.animationFPS),h}function i(){a.loadCounter-=1,0===a.loadCounter&&a.onLoadComplete()}function s(e){return 1===e?1:-Math.pow(2,-10*e)+1}var a=this;this.scale=1,this.animationFPS=6,this.transitionFrames=15,this.maxSpeed=275,this.maxReverseSpeed=-275,this.frontAcceleration=600,this.backAcceleration=600,this.frontDecceleration=600,this.angularSpeed=2.5,this.root=new THREE.Object3D,this.meshBody=null,this.meshWeapon=null,this.controls=null,this.skinsBody=[],this.skinsWeapon=[],this.weapons=[],this.currentSkin=void 0,this.onLoadComplete=function(){},this.meshes=[],this.animations={},this.loadCounter=0,this.speed=0,this.bodyOrientation=0,this.walkSpeed=this.maxSpeed,this.crouchSpeed=.5*this.maxSpeed,this.activeAnimation=null,this.oldAnimation=null,this.enableShadows=function(e){for(var t=0;t<this.meshes.length;t++)this.meshes[t].castShadow=e,this.meshes[t].receiveShadow=e},this.setVisible=function(e){for(var t=0;t<this.meshes.length;t++)this.meshes[t].visible=e,this.meshes[t].visible=e},this.shareParts=function(e){this.animations=e.animations,this.walkSpeed=e.walkSpeed,this.crouchSpeed=e.crouchSpeed,this.skinsBody=e.skinsBody,this.skinsWeapon=e.skinsWeapon;var i=t(e.meshBody.geometry,this.skinsBody[0]);i.scale.set(this.scale,this.scale,this.scale),this.root.position.y=e.root.position.y,this.root.add(i),this.meshBody=i,this.meshes.push(i);for(var s=0;s<e.weapons.length;s++){var a=t(e.weapons[s].geometry,this.skinsWeapon[s]);a.scale.set(this.scale,this.scale,this.scale),a.visible=!1,a.name=e.weapons[s].name,this.root.add(a),this.weapons[s]=a,this.meshWeapon=a,this.meshes.push(a)}},this.loadParts=function(s){this.animations=s.animations,this.walkSpeed=s.walkSpeed,this.crouchSpeed=s.crouchSpeed,this.loadCounter=2*s.weapons.length+s.skins.length+1;for(var o=[],h=0;h<s.weapons.length;h++)o[h]=s.weapons[h][1];this.skinsBody=e(s.baseUrl+"skins/",s.skins),this.skinsWeapon=e(s.baseUrl+"skins/",o);var n=new THREE.JSONLoader;n.load(s.baseUrl+s.body,function(e){e.computeBoundingBox(),a.root.position.y=-a.scale*e.boundingBox.min.y;var s=t(e,a.skinsBody[0]);s.scale.set(a.scale,a.scale,a.scale),a.root.add(s),a.meshBody=s,a.meshes.push(s),i()});for(var m=function(e,s){return function(o){var h=t(o,a.skinsWeapon[e]);h.scale.set(a.scale,a.scale,a.scale),h.visible=!1,h.name=s,a.root.add(h),a.weapons[e]=h,a.meshWeapon=h,a.meshes.push(h),i()}},h=0;h<s.weapons.length;h++)n.load(s.baseUrl+s.weapons[h][0],m(h,s.weapons[h][0]))},this.setPlaybackRate=function(e){this.meshBody&&(this.meshBody.duration=this.meshBody.baseDuration/e),this.meshWeapon&&(this.meshWeapon.duration=this.meshWeapon.baseDuration/e)},this.setWireframe=function(e){e?(this.meshBody&&(this.meshBody.material=this.meshBody.materialWireframe),this.meshWeapon&&(this.meshWeapon.material=this.meshWeapon.materialWireframe)):(this.meshBody&&(this.meshBody.material=this.meshBody.materialTexture),this.meshWeapon&&(this.meshWeapon.material=this.meshWeapon.materialTexture))},this.setSkin=function(e){this.meshBody&&this.meshBody.material.wireframe===!1&&(this.meshBody.material.map=this.skinsBody[e],this.currentSkin=e)},this.setWeapon=function(e){for(var t=0;t<this.weapons.length;t++)this.weapons[t].visible=!1;var i=this.weapons[e];i&&(i.visible=!0,this.meshWeapon=i,this.activeAnimation&&(i.playAnimation(this.activeAnimation),this.meshWeapon.setAnimationTime(this.activeAnimation,this.meshBody.getAnimationTime(this.activeAnimation))))},this.setAnimation=function(e){e!==this.activeAnimation&&e&&(this.meshBody&&(this.meshBody.setAnimationWeight(e,0),this.meshBody.playAnimation(e),this.oldAnimation=this.activeAnimation,this.activeAnimation=e,this.blendCounter=this.transitionFrames),this.meshWeapon&&(this.meshWeapon.setAnimationWeight(e,0),this.meshWeapon.playAnimation(e)))},this.update=function(e){this.controls&&this.updateMovementModel(e),this.animations&&(this.updateBehaviors(e),this.updateAnimations(e))},this.updateAnimations=function(e){var t=1;this.blendCounter>0&&(t=(this.transitionFrames-this.blendCounter)/this.transitionFrames,this.blendCounter-=1),this.meshBody&&(this.meshBody.update(e),this.meshBody.setAnimationWeight(this.activeAnimation,t),this.meshBody.setAnimationWeight(this.oldAnimation,1-t)),this.meshWeapon&&(this.meshWeapon.update(e),this.meshWeapon.setAnimationWeight(this.activeAnimation,t),this.meshWeapon.setAnimationWeight(this.oldAnimation,1-t))},this.updateBehaviors=function(){var e,t,i=this.controls,s=this.animations;i.crouch?(e=s.crouchMove,t=s.crouchIdle):(e=s.move,t=s.idle),i.jump&&(e=s.jump,t=s.jump),i.attack&&(i.crouch?(e=s.crouchAttack,t=s.crouchAttack):(e=s.attack,t=s.attack)),(i.moveForward||i.moveBackward||i.moveLeft||i.moveRight)&&this.activeAnimation!==e&&this.setAnimation(e),Math.abs(this.speed)<.2*this.maxSpeed&&!(i.moveLeft||i.moveRight||i.moveForward||i.moveBackward)&&this.activeAnimation!==t&&this.setAnimation(t),i.moveForward&&(this.meshBody&&(this.meshBody.setAnimationDirectionForward(this.activeAnimation),this.meshBody.setAnimationDirectionForward(this.oldAnimation)),this.meshWeapon&&(this.meshWeapon.setAnimationDirectionForward(this.activeAnimation),this.meshWeapon.setAnimationDirectionForward(this.oldAnimation))),i.moveBackward&&(this.meshBody&&(this.meshBody.setAnimationDirectionBackward(this.activeAnimation),this.meshBody.setAnimationDirectionBackward(this.oldAnimation)),this.meshWeapon&&(this.meshWeapon.setAnimationDirectionBackward(this.activeAnimation),this.meshWeapon.setAnimationDirectionBackward(this.oldAnimation)))},this.updateMovementModel=function(e){var t=this.controls;this.maxSpeed=t.crouch?this.crouchSpeed:this.walkSpeed,this.maxReverseSpeed=-this.maxSpeed,t.moveForward&&(this.speed=THREE.Math.clamp(this.speed+e*this.frontAcceleration,this.maxReverseSpeed,this.maxSpeed)),t.moveBackward&&(this.speed=THREE.Math.clamp(this.speed-e*this.backAcceleration,this.maxReverseSpeed,this.maxSpeed));var i=1;if(t.moveLeft&&(this.bodyOrientation+=e*this.angularSpeed,this.speed=THREE.Math.clamp(this.speed+i*e*this.frontAcceleration,this.maxReverseSpeed,this.maxSpeed)),t.moveRight&&(this.bodyOrientation-=e*this.angularSpeed,this.speed=THREE.Math.clamp(this.speed+i*e*this.frontAcceleration,this.maxReverseSpeed,this.maxSpeed)),!t.moveForward&&!t.moveBackward)if(this.speed>0){var a=s(this.speed/this.maxSpeed);this.speed=THREE.Math.clamp(this.speed-a*e*this.frontDecceleration,0,this.maxSpeed)}else{var a=s(this.speed/this.maxReverseSpeed);this.speed=THREE.Math.clamp(this.speed+a*e*this.backAcceleration,this.maxReverseSpeed,0)}var o=this.speed*e;this.root.position.x+=Math.sin(this.bodyOrientation)*o,this.root.position.z+=Math.cos(this.bodyOrientation)*o,this.root.rotation.y=this.bodyOrientation}};