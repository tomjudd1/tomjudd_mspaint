// Copyright (c) 2013 Fabrice Robinet
//  * Redistributions of source code must retain the above copyright
//  * Redistributions in binary form must reproduce the above copyright
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
var global=window;!function(e,t){"object"==typeof exports?t(module.exports):"function"==typeof define&&define.amd?define([],function(){return t(e)}):t(e)}(this,function(e){"use strict";var t=["buffers","bufferViews","images","videos","samplers","textures","shaders","programs","techniques","materials","accessors","meshes","cameras","lights","skins","nodes","scenes","animations"],s=Object.create(Object.prototype,{_rootDescription:{value:null,writable:!0},rootDescription:{set:function(e){this._rootDescription=e},get:function(){return this._rootDescription}},baseURL:{value:null,writable:!0},_isAbsolutePath:{value:function(e){var t=new RegExp("^"+window.location.protocol,"i");return e.match(t)?!0:!1}},resolvePathIfNeeded:{value:function(e){return this._isAbsolutePath(e)?e:this.baseURL+e}},_resolvePathsForCategories:{value:function(e){e.forEach(function(e){var t=this.json[e];if(t){var s=Object.keys(t);s.forEach(function(e){var s=t[e];s.path=this.resolvePathIfNeeded(s.path)},this)}},this)}},_json:{value:null,writable:!0},json:{enumerable:!0,get:function(){return this._json},set:function(e){this._json!==e&&(this._json=e,this._resolvePathsForCategories(["buffers","shaders","images","videos"]))}},_path:{value:null,writable:!0},getEntryDescription:{value:function(e,t){var s=null,n=t;return s=this.rootDescription[n],s?s?s[e]:null:(console.log("ERROR:CANNOT find expected category named:"+n),null)}},_stepToNextCategory:{value:function(){return this._state.categoryIndex=this.getNextCategoryIndex(this._state.categoryIndex+1),-1!==this._state.categoryIndex?(this._state.categoryState.index=0,!0):!1}},_stepToNextDescription:{enumerable:!1,value:function(){var e=this._state.categoryState,t=e.keys;return t?(e.index++,e.keys=null,e.index>=t.length?this._stepToNextCategory():!1):(console.log("INCONSISTENCY ERROR"),!1)}},hasCategory:{value:function(e){return this.rootDescription[e]?!0:!1}},_handleState:{value:function(){for(var e={buffers:this.handleBuffer,bufferViews:this.handleBufferView,shaders:this.handleShader,programs:this.handleProgram,techniques:this.handleTechnique,materials:this.handleMaterial,meshes:this.handleMesh,cameras:this.handleCamera,lights:this.handleLight,nodes:this.handleNode,scenes:this.handleScene,images:this.handleImage,animations:this.handleAnimation,accessors:this.handleAccessor,skins:this.handleSkin,samplers:this.handleSampler,textures:this.handleTexture,videos:this.handleVideo},s=!0;-1!==this._state.categoryIndex;){var n=t[this._state.categoryIndex],i=this._state.categoryState,a=i.keys;if(a||(i.keys=a=Object.keys(this.rootDescription[n]),!a||0!=a.length)){var o=n,r=a[i.index],h=this.getEntryDescription(r,o);if(h){if(e[o]&&e[o].call(this,r,h,this._state.userInfo)===!1){s=!1;break}this._stepToNextDescription()}else if(this.handleError){this.handleError("INCONSISTENCY ERROR: no description found for entry "+r),s=!1;break}}else this._stepToNextDescription()}this.handleLoadCompleted&&this.handleLoadCompleted(s)}},_loadJSONIfNeeded:{enumerable:!0,value:function(e){var t=this;if(this._json)e&&e(this.json);else{var s=this._path,n=s.lastIndexOf("/");this.baseURL=0!==n?s.substring(0,n+1):"";var i=new XMLHttpRequest;i.open("GET",s,!0),i.addEventListener("load",function(){t.json=JSON.parse(i.responseText),e&&e(t.json)},!1),i.send(null)}}},_buildLoader:{value:function(e){function t(t){s.rootDescription=t,e&&e(this)}var s=this;this._loadJSONIfNeeded(t)}},_state:{value:null,writable:!0},_getEntryType:{value:function(){for(var e=t,s=0;s<e.length;s++){var n=this.rootDescription[e[s]];if(n)return e[s]}return null}},getNextCategoryIndex:{value:function(e){for(var s=e;s<t.length;s++)if(this.hasCategory(t[s]))return s;return-1}},load:{enumerable:!0,value:function(e,t){var s=this;this._buildLoader(function(){var n=s.getNextCategoryIndex.call(s,0);-1!==n&&(s._state={userInfo:e,options:t,categoryIndex:n,categoryState:{index:"0"}},s._handleState())})}},initWithPath:{value:function(e){return this._path=e,this._json=null,this}},_knownURLs:{writable:!0,value:{}},loaderContext:{value:function(){return"undefined"==typeof this._knownURLs[this._path]&&(this._knownURLs[this._path]=Object.keys(this._knownURLs).length),"__"+this._knownURLs[this._path]}},initWithJSON:{value:function(e,t){return this.json=e,this.baseURL=t,t||console.log("WARNING: no base URL passed to Reader:initWithJSON"),this}}});return e&&(e.glTFParser=s),s});