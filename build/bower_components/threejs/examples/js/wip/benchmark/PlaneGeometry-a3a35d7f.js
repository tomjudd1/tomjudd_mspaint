THREE.PlaneGeometry=function(e,t,o,r){THREE.Geometry.call(this),this.width=e,this.height=t,this.widthSegments=o||1,this.heightSegments=r||1;var h,s,c=e/2,n=t/2,E=this.widthSegments,i=this.heightSegments,a=E+1,l=i+1,p=this.width/E,m=this.height/i,H=new THREE.Vector3(0,0,1);for(s=0;l>s;s++)for(h=0;a>h;h++){var R=h*p-c,T=s*m-n;this.vertices.push(new THREE.Vector3(R,-T,0))}for(s=0;i>s;s++)for(h=0;E>h;h++){var w=h+a*s,y=h+a*(s+1),f=h+1+a*(s+1),u=h+1+a*s,g=new THREE.Vector2(h/E,1-s/i),v=new THREE.Vector2(h/E,1-(s+1)/i),V=new THREE.Vector2((h+1)/E,1-(s+1)/i),G=new THREE.Vector2((h+1)/E,1-s/i),d=new THREE.Face3(w,y,u);d.normal.copy(H),d.vertexNormals.push(H.clone(),H.clone(),H.clone()),this.faces.push(d),this.faceVertexUvs[0].push([g,v,G]),d=new THREE.Face3(y,f,u),d.normal.copy(H),d.vertexNormals.push(H.clone(),H.clone(),H.clone()),this.faces.push(d),this.faceVertexUvs[0].push([v.clone(),V,G.clone()])}},THREE.PlaneGeometry.prototype=Object.create(THREE.Geometry.prototype),THREE.PlaneGeometry.prototype.constructor=THREE.PlaneGeometry;