THREE.CircleTypedGeometry=function(e,t,r,o){this.parameters={radius:e,segments:t,thetaStart:r,thetaLength:o},e=e||50,t=void 0!==t?Math.max(3,t):8,r=void 0!==r?r:0,o=void 0!==o?o:2*Math.PI;var a=t+2,y=new Uint16Array(3*t),n=new Float32Array(3*a),i=new Float32Array(3*a),E=new Float32Array(2*a);i[2]=1,E[0]=.5,E[1]=.5;for(var d=0,p=2,T=3,h=0;t>=h;h++){var s=r+h/t*o,c=e*Math.cos(s),l=e*Math.sin(s);n[T]=c,n[T+1]=l,i[T+2]=1,E[p]=(c/e+1)/2,E[p+1]=(l/e+1)/2,p+=2,T+=3,y[d]=0,y[d+1]=h+1,y[d+2]=h+2,d+=3}THREE.IndexedTypedGeometry.call(this),this.setArrays(y,n,i,E),this.boundingSphere=new THREE.Sphere(new THREE.Vector3,e)},THREE.CircleTypedGeometry.prototype=Object.create(THREE.IndexedTypedGeometry.prototype),THREE.CircleTypedGeometry.prototype.constructor=THREE.CircleTypedGeometry;