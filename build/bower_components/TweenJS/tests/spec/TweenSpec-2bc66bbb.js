describe("TweenJS",function(){beforeEach(function(){jasmine.DEFAULT_TIMEOUT_INTERVAL=2e3}),afterEach(function(){createjs.Tween.removeAllTweens()}),it("should animate x to 50",function(e){var t={x:0};createjs.Tween.get(t).to({x:50},25).call(function(){expect(t.x).toBe(50),e()})}),it("should animate in a specifc amount of time.",function(e){var t={x:0},n=Date.now();createjs.Tween.get(t).to({x:50},25).call(function(){expect(Date.now()-n).toBeInRange(48,52),e()})}),it("hasActiveTweens should return a boolean",function(){var e={x:0};expect(createjs.Tween.hasActiveTweens(e)).toBe(!1),createjs.Tween.get(e).to({x:50},500),expect(createjs.Tween.hasActiveTweens(e)).toBe(!0)}),it("tweens should fire change events",function(e){var t={x:0},n=createjs.Tween.get(t),o={change:function(){}};spyOn(o,"change"),n.on("change",o.change),n.to({x:50}),setTimeout(function(){expect(o.change).toHaveBeenCalled(),e()},50)}),it("setPaused() should work",function(e){var t={x:0},n=createjs.Tween.get(t),o={change:function(){}};spyOn(o,"change"),n.on("change",o.change),n.to({x:200},2e3),n.setPaused(!0),setTimeout(function(){n.setPaused(!1),n.on("change",function(){expect(o.change.calls.count()).toBe(1),e()})},250)}),it("setPosition() should work",function(){var e={x:0},t=createjs.Tween.get(e);t.to({x:200},2e3),t.setPaused(!0),t.setPosition(25),expect(e.x).toBe(2.5)}),it("wait() should work",function(e){var t=Date.now();createjs.Tween.get({}).wait(500).call(function(){expect(Date.now()-t).toBeInRange(450,510),e()})}),it("removeAllTweens() should work",function(){var e={};createjs.Tween.get(e).to({x:50},100),expect(createjs.Tween.hasActiveTweens(e)).toBe(!0),createjs.Tween.removeAllTweens(),expect(createjs.Tween.hasActiveTweens(e)).toBe(!1)}),it("removeTweens() should work",function(){var e={};createjs.Tween.get(e).to({x:50},100),expect(createjs.Tween.hasActiveTweens(e)).toBe(!0),createjs.Tween.removeTweens(e),expect(createjs.Tween.hasActiveTweens(e)).toBe(!1)}),it("tweens should loop",function(e){var t={},n={complete:function(){}};spyOn(n,"complete"),createjs.Tween.get(t,{loop:!0}).to({x:50},100).call(n.complete),setTimeout(function(){expect(n.complete.calls.count()).toBeGreaterThan(1),e()},500)})});