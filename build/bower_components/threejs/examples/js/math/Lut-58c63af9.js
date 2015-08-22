THREE.Lut=function(e,t){this.lut=[],this.map=THREE.ColorMapKeywords[e],this.n=t,this.mapname=e;for(var i=1/this.n,n=0;1>=n;n+=i)for(var s=0;s<this.map.length-1;s++)if(n>=this.map[s][0]&&n<this.map[s+1][0]){var l=this.map[s][0],a=this.map[s+1][0],o=new THREE.Color(16777215),h=new THREE.Color(16777215).setHex(this.map[s][1]),d=new THREE.Color(16777215).setHex(this.map[s+1][1]);o=h.lerp(d,(n-l)/(a-l)),this.lut.push(o)}return this.set(this)},THREE.Lut.prototype={constructor:THREE.Lut,lut:[],map:[],mapname:"rainbow",n:256,minV:0,maxV:1,legend:null,set:function(e){return e instanceof THREE.Lut&&this.copy(e),this},setMin:function(e){return this.minV=e,this},setMax:function(e){return this.maxV=e,this},changeNumberOfColors:function(e){return this.n=e,new THREE.Lut(this.mapname,this.n)},changeColorMap:function(e){return this.mapname=e,new THREE.Lut(this.mapname,this.n)},copy:function(e){return this.lut=e.lut,this.mapname=e.mapname,this.map=e.map,this.n=e.n,this.minV=e.minV,this.maxV=e.maxV,this},getColor:function(e){e<=this.minV?e=this.minV:e>=this.maxV&&(e=this.maxV),e=(e-this.minV)/(this.maxV-this.minV);var t=Math.round(e*this.n);return t==this.n?t-=1:t,this.lut[t]},addColorMap:function(e,t){THREE.ColorMapKeywords[e]=t},setLegendOn:function(e){void 0===e&&(e={}),this.legend={},this.legend.layout=e.hasOwnProperty("layout")?e.layout:"vertical",this.legend.position=e.hasOwnProperty("position")?e.position:{x:21.5,y:8,z:5},this.legend.dimensions=e.hasOwnProperty("dimensions")?e.dimensions:{width:.5,height:3},this.legend.canvas=document.createElement("canvas"),this.legend.canvas.setAttribute("id","legend"),this.legend.canvas.setAttribute("hidden",!0),document.body.appendChild(this.legend.canvas),this.legend.ctx=this.legend.canvas.getContext("2d"),this.legend.canvas.setAttribute("width",1),this.legend.canvas.setAttribute("height",this.n),this.legend.texture=new THREE.Texture(this.legend.canvas),imageData=this.legend.ctx.getImageData(0,0,1,this.n),data=imageData.data,len=data.length,this.map=THREE.ColorMapKeywords[this.mapname];for(var t=0,i=1/this.n,n=1;n>=0;n-=i)for(var s=this.map.length-1;s>=0;s--)if(n<this.map[s][0]&&n>=this.map[s-1][0]){var l=this.map[s-1][0],a=this.map[s][0],o=new THREE.Color(16777215),h=new THREE.Color(16777215).setHex(this.map[s-1][1]),d=new THREE.Color(16777215).setHex(this.map[s][1]);o=h.lerp(d,(n-l)/(a-l)),data[4*t]=Math.round(255*o.r),data[4*t+1]=Math.round(255*o.g),data[4*t+2]=Math.round(255*o.b),data[4*t+3]=255,t+=1}return this.legend.ctx.putImageData(imageData,0,0),this.legend.texture.needsUpdate=!0,this.legend.legendGeometry=new THREE.PlaneBufferGeometry(this.legend.dimensions.width,this.legend.dimensions.height),this.legend.legendMaterial=new THREE.MeshBasicMaterial({map:this.legend.texture,side:THREE.DoubleSide}),this.legend.mesh=new THREE.Mesh(this.legend.legendGeometry,this.legend.legendMaterial),"horizontal"==this.legend.layout&&(this.legend.mesh.rotation.z=-90*(Math.PI/180)),this.legend.mesh.position.copy(this.legend.position),this.legend.mesh},setLegendOff:function(){return this.legend=null,this.legend},setLegendLayout:function(e){return this.legend?this.legend.layout==e?!1:"horizontal"!=e&&"vertical"!=e?!1:(this.layout=e,"horizontal"==e&&(this.legend.mesh.rotation.z=90*(Math.PI/180)),"vertical"==e&&(this.legend.mesh.rotation.z=-90*(Math.PI/180)),this.legend.mesh):!1},setLegendPosition:function(e){return this.legend.position=new THREE.Vector3(e.x,e.y,e.z),this.legend},setLegendLabels:function(e,t){if(!this.legend)return!1;"function"==typeof e&&(t=e),void 0===e&&(e={}),this.legend.labels={},this.legend.labels.fontsize=e.hasOwnProperty("fontsize")?e.fontsize:24,this.legend.labels.fontface=e.hasOwnProperty("fontface")?e.fontface:"Arial",this.legend.labels.title=e.hasOwnProperty("title")?e.title:"",this.legend.labels.um=e.hasOwnProperty("um")?" [ "+e.um+" ]":"",this.legend.labels.ticks=e.hasOwnProperty("ticks")?e.ticks:0,this.legend.labels.decimal=e.hasOwnProperty("decimal")?e.decimal:2,this.legend.labels.notation=e.hasOwnProperty("notation")?e.notation:"standard";var i={r:255,g:100,b:100,a:.8},n={r:255,g:0,b:0,a:1},s=4,l=document.createElement("canvas"),a=l.getContext("2d");a.font="Normal "+1.2*this.legend.labels.fontsize+"px "+this.legend.labels.fontface;{var o=a.measureText(this.legend.labels.title.toString()+this.legend.labels.um.toString());o.width}a.fillStyle="rgba("+i.r+","+i.g+","+i.b+","+i.a+")",a.strokeStyle="rgba("+n.r+","+n.g+","+n.b+","+n.a+")",a.lineWidth=s,a.fillStyle="rgba( 0, 0, 0, 1.0 )",a.fillText(this.legend.labels.title.toString()+this.legend.labels.um.toString(),s,this.legend.labels.fontsize+s);var h=new THREE.Texture(l);h.minFilter=THREE.LinearFilter,h.needsUpdate=!0;var d=new THREE.SpriteMaterial({map:h,useScreenCoordinates:!1}),r=new THREE.Sprite(d);if(r.scale.set(2,1,1),"vertical"==this.legend.layout&&r.position.set(this.legend.position.x+this.legend.dimensions.width,this.legend.position.y+.45*this.legend.dimensions.height,this.legend.position.z),"horizontal"==this.legend.layout&&r.position.set(1.015*this.legend.position.x,this.legend.position.y+.03*this.legend.dimensions.height,this.legend.position.z),this.legend.labels.ticks>0){var g={},m={};if("vertical"==this.legend.layout)var p=this.legend.position.y+.36*this.legend.dimensions.height,u=this.legend.position.y-.61*this.legend.dimensions.height;if("horizontal"==this.legend.layout)var c=this.legend.position.x+.75*this.legend.dimensions.height,E=this.legend.position.x-1.2*this.legend.dimensions.width;for(var x=0;x<this.legend.labels.ticks;x++){var f=(this.maxV-this.minV)/(this.legend.labels.ticks-1)*x;f=t?t(f):"scientific"==this.legend.labels.notation?f.toExponential(this.legend.labels.decimal):f.toFixed(this.legend.labels.decimal);var w=document.createElement("canvas"),y=w.getContext("2d");y.font="Normal "+this.legend.labels.fontsize+"px "+this.legend.labels.fontface;{var o=y.measureText(f.toString());o.width}y.fillStyle="rgba("+i.r+","+i.g+","+i.b+","+i.a+")",y.strokeStyle="rgba("+n.r+","+n.g+","+n.b+","+n.a+")",y.lineWidth=s,y.fillStyle="rgba( 0, 0, 0, 1.0 )",y.fillText(f.toString(),s,this.legend.labels.fontsize+s);var v=new THREE.Texture(w);v.minFilter=THREE.LinearFilter,v.needsUpdate=!0;var b=new THREE.SpriteMaterial({map:v,useScreenCoordinates:!1}),T=new THREE.Sprite(b);if(T.scale.set(2,1,1),"vertical"==this.legend.layout){var F=u+(p-u)*(f/(this.maxV-this.minV));T.position.set(this.legend.position.x+2.7*this.legend.dimensions.width,F,this.legend.position.z)}if("horizontal"==this.legend.layout){var F=E+(c-E)*(f/(this.maxV-this.minV));if(this.legend.labels.ticks>5)if(x%2===0)var H=1.7;else var H=2.1;else var H=1.7;T.position.set(F,this.legend.position.y-this.legend.dimensions.width*H,this.legend.position.z)}var R=new THREE.LineBasicMaterial({color:0,linewidth:2}),V=new THREE.Geometry;if("vertical"==this.legend.layout){var z=this.legend.position.y-.5*this.legend.dimensions.height+.01+this.legend.dimensions.height*(f/(this.maxV-this.minV))*.99;V.vertices.push(new THREE.Vector3(this.legend.position.x+.55*this.legend.dimensions.width,z,this.legend.position.z)),V.vertices.push(new THREE.Vector3(this.legend.position.x+.7*this.legend.dimensions.width,z,this.legend.position.z))}if("horizontal"==this.legend.layout){var z=this.legend.position.x-.5*this.legend.dimensions.height+.01+this.legend.dimensions.height*(f/(this.maxV-this.minV))*.99;V.vertices.push(new THREE.Vector3(z,this.legend.position.y-.55*this.legend.dimensions.width,this.legend.position.z)),V.vertices.push(new THREE.Vector3(z,this.legend.position.y-.7*this.legend.dimensions.width,this.legend.position.z))}var C=new THREE.Line(V,R);m[x]=C,g[x]=T}}return{title:r,ticks:g,lines:m}}},THREE.ColorMapKeywords={rainbow:[[0,"0x0000FF"],[.2,"0x00FFFF"],[.5,"0x00FF00"],[.8,"0xFFFF00"],[1,"0xFF0000"]],cooltowarm:[[0,"0x3C4EC2"],[.2,"0x9BBCFF"],[.5,"0xDCDCDC"],[.8,"0xF6A385"],[1,"0xB40426"]],blackbody:[[0,"0x000000"],[.2,"0x780000"],[.5,"0xE63200"],[.8,"0xFFFF00"],[1,"0xFFFFFF"]],grayscale:[[0,"0x000000"],[.2,"0x404040"],[.5,"0x7F7F80"],[.8,"0xBFBFBF"],[1,"0xFFFFFF"]]};