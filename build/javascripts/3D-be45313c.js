function init(){container=document.createElement("div"),document.body.appendChild(container),camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,15e3),camera.position.z=500,scene=new THREE.Scene,hemiLight=new THREE.HemisphereLight(16777215,16777215,.5),hemiLight.color.setHSL(1,1,1),hemiLight.groundColor.setHSL(.095,1,.75),hemiLight.position.set(0,500,0),scene.add(hemiLight);var e=new THREE.DirectionalLight(16777215,.8);e.position.set(1,1,1.5),e.castShadow=!0,e.shadowDarkness=1,scene.add(e);var o=(new THREE.BoxGeometry(100,100,100),new THREE.SphereGeometry(100*scaler,circSegs,circSegs)),n=new THREE.SphereGeometry(10*scaler,circSegs,circSegs),i=new THREE.SphereGeometry(2*scaler,circSegs,circSegs),t=new THREE.CylinderGeometry(10,10,200,32),a=new THREE.CylinderGeometry(20,20,440,32),r=new THREE.CylinderGeometry(4,4,150,6),s=new THREE.SphereGeometry(.1*scaler,circSegs,circSegs),l=new THREE.SphereGeometry(10*scaler,circSegs,circSegs),c=new THREE.MeshLambertMaterial({color:6710886,shading:THREE.SmoothShading,overdraw:1}),d=new THREE.MeshLambertMaterial({color:16777215,shading:THREE.SmoothShading,overdraw:1}),w=new THREE.MeshLambertMaterial({color:10066329,shading:THREE.SmoothShading,overdraw:1}),h=(new THREE.MeshLambertMaterial({color:1970464,shading:THREE.SmoothShading,overdraw:1}),new THREE.MeshNormalMaterial),E=new THREE.MeshBasicMaterial({color:3355443});head=new THREE.Mesh(o,w),head.position.x=10,head.position.z=-400,head.castShadow=!0,head.receiveShadow=!0,scene.add(head),nose=new THREE.Mesh(t,w),nose.position.z=100*scaler,nose.rotation.x=90*(Math.PI/180),nose.position.y=-10*scaler,ears=new THREE.Mesh(a,w),ears.position.z=20*scaler,ears.rotation.z=90*(Math.PI/180),ears.position.y=0*scaler,lEye=new THREE.Mesh(n,d),lEye.position.z=100*scaler,lEye.position.x=10*scaler,lEye.castShadow=!0,lEye.receiveShadow=!0,head.add(lEye),followBall=new THREE.Mesh(s,h),followBall.rotation.x=25*(Math.PI/180),followBall.rotation.y=25*(Math.PI/180),scene.add(followBall),pencil=new THREE.Mesh(r,c),pencil.position.z=0*scaler,pencil.rotation.x=pencilRot*(Math.PI/180),pencil.position.x=0*scaler,pencil.position.y=0*scaler,pencil.position.z=pencilZ*scaler,followBall.add(pencil),hand=new THREE.Mesh(l,w),hand.position.x=-5*scaler,hand.position.y=20*scaler,hand.position.z=0*scaler,pencil.add(hand),rEye=new THREE.Mesh(n,d),rEye.position.z=100*scaler,rEye.position.x=-10*scaler,rEye.receiveShadow=!0,rEye.castShadow=!0,head.add(rEye),lPupil=new THREE.Mesh(i,E),lPupil.position.z=9*scaler,lPupil.position.x=0*scaler,lEye.add(lPupil),rPupil=new THREE.Mesh(i,E),rPupil.position.z=9*scaler,rPupil.position.x=0*scaler,rEye.add(rPupil);renderer=new THREE.WebGLRenderer({antialias:!0}),renderer.setPixelRatio(window.devicePixelRatio),renderer.setClearColor(13421772),renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(renderer.domElement),composer=new THREE.EffectComposer(renderer),composer.addPass(new THREE.RenderPass(scene,camera));var p=new THREE.ShaderPass(THREE.RGBShiftShader);p.uniforms.amount.value=.0025,composer.addPass(p);var m=new THREE.ShaderPass(THREE.FilmShader);m.renderToScreen=!0,composer.addPass(m),stats=new Stats,stats.domElement.style.position="absolute",stats.domElement.style.top="0px",stats.domElement.style.zIndex=100,window.addEventListener("resize",onWindowResize,!1)}function onWindowResize(){windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}function onDocumentMouseMove(e){mouseX=e.clientX-windowHalfX,mouseY=e.clientY-windowHalfY,movePen(e.clientX,e.clientY)}function onDocumentTouchMove(e){var o=e.changedTouches[0];mouseX=parseInt(o.clientX)-windowHalfX,mouseY=parseInt(o.clientY)-windowHalfY,movePen(o.clientX,o.clientY)}function movePen(e,o){var n=new THREE.Vector3;n.set(e/window.innerWidth*2-1,2*-(o/window.innerHeight)+1,.5),n.unproject(camera);var i=n.sub(camera.position).normalize(),t=-(camera.position.z/i.z+zplaneDepth);followPoint=camera.position.clone().add(i.multiplyScalar(t))}function onDocumentMouseDown(){pencil.position.z=(pencilZ+pencilDrawZ)*scaler,pencil.rotation.x=pencilDrawRot*(Math.PI/180)}function onDocumentMouseUp(){pencil.position.z=pencilZ*scaler,pencil.rotation.x=pencilRot*(Math.PI/180)}function animate(){requestAnimationFrame(animate),render(),stats.update()}function render(){var e=(.001*Date.now(),35e3),o=mouseY/e,n=mouseX/e,i=mouseX/e;camera.lookAt(head.position),head.rotation.x=o,head.rotation.y=n,head.rotation.z=i,lEye.lookAt(followPoint),rEye.lookAt(followPoint),followBall.position.x=followPoint.x,followBall.position.y=followPoint.y,followBall.position.z=followPoint.z,composer.render(scene,camera)}function resize(){stage.canvas.width=window.innerWidth,stage.canvas.height=window.innerHeight}var container,stats,camera,scene,renderer,composer,effect,geometry,head,hand,followBall,pencilZ=-40,pencilDrawZ=3,pencilRot=87,pencilDrawRot=90,mouseX=0,mouseY=0,followPoint=new THREE.Vector3,windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,scaler=2,circSegs=32,zplaneDepth=280;document.addEventListener("mousemove",onDocumentMouseMove,!1),document.addEventListener("mousedown",onDocumentMouseDown,!1),document.addEventListener("mouseup",onDocumentMouseUp,!1),document.addEventListener("touchmove",onDocumentTouchMove,!1),document.addEventListener("touchstart",onDocumentMouseDown,!1),document.addEventListener("touchend",onDocumentMouseUp,!1);