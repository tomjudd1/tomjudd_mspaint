THREE.BoxGeometry2=function(t,h,e,i,s,o){function r(t,h,e,i,s,o,r){var y,n,d,x=p.widthSegments,c=p.heightSegments,w=s/2,z=o/2,u=E.length;"x"===t&&"y"===h||"y"===t&&"x"===h?y="z":"x"===t&&"z"===h||"z"===t&&"x"===h?(y="y",c=p.depthSegments):("z"===t&&"y"===h||"y"===t&&"z"===h)&&(y="x",x=p.depthSegments);var H=x+1,R=c+1,T=s/x,a=o/c,f=new THREE.Vector3;for(f[y]=r>0?1:-1,d=0;R>d;d++)for(n=0;H>n;n++)g[t]=(n*T-w)*e,g[h]=(d*a-z)*i,g[y]=r,E.push(g.x,g.y,g.z);for(d=0;c>d;d++)for(n=0;x>n;n++){var S=n+H*d,v=n+H*(d+1),G=n+1+H*(d+1),l=n+1+H*d;m(3*S+u,3*v+u,3*l+u),m(3*v+u,3*G+u,3*l+u)}}var p=this;this.width=t,this.height=h,this.depth=e,this.widthSegments=i||1,this.heightSegments=s||1,this.depthSegments=o||1;var y=this.width/2,n=this.height/2,d=this.depth/2,g=new THREE.Vector3,E=[],x=[],m=function(t,h,e){x.push(E[t],E[t+1],E[t+2]),x.push(E[h],E[h+1],E[h+2]),x.push(E[e],E[e+1],E[e+2])};r("z","y",-1,-1,this.depth,this.height,y,0),r("z","y",1,-1,this.depth,this.height,-y,1),r("x","z",1,1,this.width,this.depth,n,2),r("x","z",1,-1,this.width,this.depth,-n,3),r("x","y",1,-1,this.width,this.height,d,4),r("x","y",-1,-1,this.width,this.height,-d,5),THREE.Geometry2.call(this,x.length/3),this.vertices.set(x)},THREE.BoxGeometry2.prototype=Object.create(THREE.Geometry2.prototype),THREE.BoxGeometry2.prototype.constructor=THREE.BoxGeometry2;