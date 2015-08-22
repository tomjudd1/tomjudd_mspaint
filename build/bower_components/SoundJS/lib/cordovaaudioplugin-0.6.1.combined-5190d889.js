/*!
* SoundJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
this.createjs=this.createjs||{},function(){"use strict";function t(t){this.AbstractLoader_constructor(t,!0,createjs.AbstractLoader.SOUND),this._media=null,this._loadTime=0,this._TIMER_FREQUENCY=100}var e=createjs.extend(t,createjs.AbstractLoader);e.load=function(){this._media=new Media(this._item.src,null,createjs.proxy(this._mediaErrorHandler,this)),this._media.seekTo(0),this._getMediaDuration()},e.toString=function(){return"[CordovaAudioLoader]"},e._mediaErrorHandler=function(){this._media.release(),this._sendError()},e._getMediaDuration=function(){this._result=1e3*this._media.getDuration(),this._result<0?(this._loadTime+=this._TIMER_FREQUENCY,this._loadTime>this._item.loadTimeout?this.handleEvent({type:"timeout"}):setTimeout(createjs.proxy(this._getMediaDuration,this),this._TIMER_FREQUENCY)):(this._media.release(),this._sendComplete())},createjs.CordovaAudioLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e,i,a){this.AbstractSoundInstance_constructor(t,e,i,a),this.playWhenScreenLocked=null,this._playStartTime=null,this._audioSpriteTimeout=null,this._audioSprite=!1,this._audioSpriteEndHandler=createjs.proxy(this._handleAudioSpriteComplete,this),this._mediaPlayFinishedHandler=createjs.proxy(this._handleSoundComplete,this),this._mediaErrorHandler=createjs.proxy(this._handleMediaError,this),this._mediaProgressHandler=createjs.proxy(this._handleMediaProgress,this),this._playbackResource=new Media(t,this._mediaPlayFinishedHandler,this._mediaErrorHandler,this._mediaProgressHandler),i?this._audioSprite=!0:this._setDurationFromSource()}var e=createjs.extend(t,createjs.AbstractSoundInstance);e.setMasterVolume=function(){this._updateVolume()},e.setMasterMute=function(){this._updateVolume()},e.destroy=function(){this.AbstractSoundInstance_destroy(),this._playbackResource.release()},e.getCurrentPosition=function(t,e){this._playbackResource.getCurrentPosition(t,e)},e.toString=function(){return"[CordovaAudioSoundInstance]"},e._handleMediaError=function(){clearTimeout(this.delayTimeoutId),this.playState=createjs.Sound.PLAY_FAILED,this._sendEvent("failed")},e._handleMediaProgress=function(){},e._handleAudioSpriteComplete=function(){this._playbackResource.pause(),this._handleSoundComplete()},e._handleCleanUp=function(){clearTimeout(this._audioSpriteTimeout),this._playbackResource.pause()},e._handleSoundReady=function(){this._playbackResource.seekTo(this._startTime+this._position),this._audioSprite&&(this._audioSpriteTimeout=setTimeout(this._audioSpriteEndHandler,this._duration-this._position)),this._playbackResource.play({playAudioWhenScreenIsLocked:this.playWhenScreenLocked}),this._playStartTime=Date.now()},e._pause=function(){clearTimeout(this._audioSpriteTimeout),this._playbackResource.pause(),this._playStartTime&&(this._position=Date.now()-this._playStartTime,this._playStartTime=null),this._playbackResource.getCurrentPosition(createjs.proxy(this._updatePausePos,this))},e._updatePausePos=function(t){this._position=1e3*t-this._startTime,this._playStartTime&&(this._playStartTime=Date.now())},e._resume=function(){this._audioSprite&&(this._audioSpriteTimeout=setTimeout(this._audioSpriteEndHandler,this._duration-this._position)),this._playbackResource.play({playAudioWhenScreenIsLocked:this.playWhenScreenLocked}),this._playStartTime=Date.now()},e._handleStop=function(){clearTimeout(this._audioSpriteTimeout),this._playbackResource.pause(),this._playbackResource.seekTo(this._startTime),this._playStartTime&&(this._position=0,this._playStartTime=null)},e._updateVolume=function(){var t=this._muted||createjs.Sound._masterMute?0:this._volume*createjs.Sound._masterVolume;this._playbackResource.setVolume(t)},e._calculateCurrentPosition=function(){return this._playStartTime&&(this._position=Date.now()-this._playStartTime+this._position,this._playStartTime=Date.now()),this._position},e._updatePosition=function(){this._playbackResource.seekTo(this._startTime+this._position),this._playStartTime=Date.now(),this._audioSprite&&(clearTimeout(this._audioSpriteTimeout),this._audioSpriteTimeout=setTimeout(this._audioSpriteEndHandler,this._duration-this._position))},e._handleLoop=function(){this._handleSoundReady()},e._updateStartTime=function(){this._audioSprite=!0,this.playState==createjs.Sound.PLAY_SUCCEEDED},e._updateDuration=function(){this._audioSprite,this.playState==createjs.Sound.PLAY_SUCCEEDED&&(clearTimeout(this._audioSpriteTimeout),this._audioSpriteTimeout=setTimeout(this._audioSpriteEndHandler,this._duration-this.position))},e._setDurationFromSource=function(){this._duration=createjs.Sound.activePlugin.getSrcDuration(this.src)},createjs.CordovaAudioSoundInstance=createjs.promote(t,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){"use strict";function t(){this.AbstractPlugin_constructor(),this._capabilities=i._capabilities,this._loaderClass=createjs.CordovaAudioLoader,this._soundInstanceClass=createjs.CordovaAudioSoundInstance,this._srcDurationHash={}}var e=createjs.extend(t,createjs.AbstractPlugin),i=t;i.playWhenScreenLocked=!1,i._capabilities=null,i.isSupported=function(){return i._generateCapabilities(),null!=i._capabilities},i._generateCapabilities=function(){if(null==i._capabilities&&(window.cordova||window.PhoneGap||window.phonegap)&&window.Media){var t=document.createElement("audio");if(null==t.canPlayType)return null;i._capabilities={panning:!1,volume:!0,tracks:-1};for(var e=createjs.Sound.SUPPORTED_EXTENSIONS,a=createjs.Sound.EXTENSION_MAP,s=0,o=e.length;o>s;s++){var r=e[s],n=a[r]||r;i._capabilities[r]="no"!=t.canPlayType("audio/"+r)&&""!=t.canPlayType("audio/"+r)||"no"!=t.canPlayType("audio/"+n)&&""!=t.canPlayType("audio/"+n)}}},e.create=function(t,e,i){var a=this.AbstractPlugin_create(t,e,i);return a.playWhenScreenLocked=this.playWhenScreenLocked,a},e.toString=function(){return"[CordovaAudioPlugin]"},e.setVolume=e.getVolume=e.setMute=null,e.getSrcDuration=function(t){return this._srcDurationHash[t]},e._handlePreloadComplete=function(t){var e=t.target.getItem().src;this._srcDurationHash[e]=t.result,this._audioSources[e]=t.result},e.removeSound=function(t){delete this._srcDurationHash[t],this.AbstractPlugin_removeSound(t)},createjs.CordovaAudioPlugin=createjs.promote(t,"AbstractPlugin")}(),this.createjs=this.createjs||{},function(){var t=createjs.CordovaAudioPlugin=createjs.CordovaAudioPlugin||{};t.version="0.6.1",t.buildDate="Thu, 21 May 2015 16:17:37 GMT"}();