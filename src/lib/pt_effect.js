var Effect = new Object();

Effect.fadeAnim = function(element, in_out, effect){
	this.element = $(element);
	this.finish=effect.length-1;
	this.index=0;
	this.effect=effect;
	this.effect2 = ("Array"==typeof arguments[3]) ? arguments[3] : effect.reverse(false);	// 第４引数が存在すればそれがフェードアウトエフェクト
	this.effect3 = ("Array"==typeof arguments[4]) ? arguments[4] : null;	// 第5引数が存在すればロールアニメエフェクト
	this.lagtime = ("number"==typeof arguments[arguments.length-1]) ? arguments[arguments.length-1] : 80;	// 最後の引数が数字ならアニメーション間隔の時間
	if("fadein"==in_out){
		this.element.fi=true;
		this.fadeIn();
	} else if("fadeout"==in_out){
		this.element.fo=true;
		this.fadeOut();
	} else if("roll"==in_out){
		if(this.element.fi)	return;
		this.roll();
	}
}
Effect.fadeAnim.prototype = {
	fadeIn: function() {
		this.fadeCol(this.element);
		if(this.isFinished()){
			this.element.fi	= false;
			if( this.element.fo )	return new Effect.fadeAnim( this.element, "fadeout", this.effect2 );
			if( this.effect3 )	return new Effect.fadeAnim( this.element, "roll", this.effect3, this.effect2 );
			return;
		}
		this.index++;
		this.timer = setTimeout(this.fadeIn.bind(this), this.lagtime);
	},
	
	roll: function() {
		this.fadeCol(this.element);
		if(this.isFinished()){
			if( this.element.fo )	return new Effect.fadeAnim( this.element, "fadeout", this.effect2 );
			this.index=0;
		}
		this.index++;
		this.timer = setTimeout(this.roll.bind(this), this.lagtime);
	},
	
	fadeOut: function() {
		this.fadeCol(this.element);
		if(this.element.fi)	return;
		if(this.isFinished()){
			this.element.fo=false;
			return;
		}
		this.index++;
		this.timer = setTimeout(this.fadeOut.bind(this), this.lagtime);
	},
	
	isFinished: function() {
		return this.index >= this.finish;
	},
	
	fadeCol: function(element) {
		for( i in this.effect[this.index] )
			element.style[i]=this.effect[this.index][i];
	}
}

Effect.Fade = Class.create();
Effect.Fade.prototype = {
	initialize: function(element) {
		this.element = $(element);
		this.erase = arguments[1] ? 'block' : 'none';
		this.start	= 100;
		this.finish = 0;
		this.current = this.start;
		this.fade();
	},
	
	fade: function() {
		if (this.isFinished()) { this.element.style.display = this.erase; return; }
		if (this.timer) clearTimeout(this.timer);
		this.setOpacity(this.element, this.current);
		this.current -= 10;
		this.timer = setTimeout(this.fade.bind(this), 50);
	},
	
	isFinished: function() {
		return this.current <= this.finish;
	},
	
	setOpacity: function(element, opacity) {
		opacity = (opacity == 100) ? 99.999 : opacity;
		element.style.filter = "alpha(opacity:"+opacity+")";
		element.style.opacity = opacity/100 /*//*/;
	}
}

Effect.Scale = Class.create();
Effect.Scale.prototype = {
	initialize: function(element, percent) {
		this.element = $(element);
		this.startScale		= 1.0;
		this.startHeight	 = this.element.offsetHeight;
		this.startWidth		= this.element.offsetWidth;
		this.currentHeight = this.startHeight;
		this.currentWidth	= this.startWidth;
		this.finishScale	 = (percent/100) /*//*/;
		if (this.element.style.fontSize=="") this.sizeEm = 1.0;
		if (this.element.style.fontSize.indexOf("em")>0)
			 this.sizeEm			= parseFloat(this.element.style.fontSize);
		if(this.element.effect_scale) {
			clearTimeout(this.element.effect_scale.timer);
			this.startScale	= this.element.effect_scale.currentScale;
			this.startHeight = this.element.effect_scale.startHeight;
			this.startWidth	= this.element.effect_scale.startWidth;
			if(this.element.effect_scale.sizeEm) 
				this.sizeEm		= this.element.effect_scale.sizeEm;			
		}
		this.element.effect_scale = this;
		this.currentScale	= this.startScale;
		this.factor				= this.finishScale - this.startScale;
		this.options			 = arguments[2] || {}; 
		this.scale();
	},
	
	scale: function() {
		if (this.isFinished()) { 
			this.setDimensions(this.element, this.startWidth*this.finishScale, this.startHeight*this.finishScale);
			if(this.sizeEm) this.element.style.fontSize = this.sizeEm*this.finishScale + "em";
			if(this.options.complete) this.options.complete(this);
			return; 
		}
		if (this.timer) clearTimeout(this.timer);
		if (this.options.step) this.options.step(this);
		this.setDimensions(this.element, this.currentWidth, this.currentHeight);
		if(this.sizeEm) this.element.style.fontSize = this.sizeEm*this.currentScale + "em";
		this.currentScale += (this.factor/10) /*//*/;
		this.currentWidth = this.startWidth * this.currentScale;
		this.currentHeight = this.startHeight * this.currentScale;
		this.timer = setTimeout(this.scale.bind(this), 50);
	},
	
	isFinished: function() {
		return (this.factor < 0) ? this.currentScale <= this.finishScale : this.currentScale >= this.finishScale;
	},
	
	setDimensions: function(element, width, height) {
		element.style.width = width + 'px';
		element.style.height = height + 'px';
	}
}

Effect.Squish = Class.create();
Effect.Squish.prototype = {
	initialize: function(element) {
		this.element = $(element);
		new Effect.Scale(this.element, 1, { complete: this.hide.bind(this) } );
	},
	hide: function() {
		this.element.style.display = 'none';
	} 
}

Effect.Puff = Class.create();
Effect.Puff.prototype = {
	initialize: function(element) {
		this.element = $(element);
		this.opacity = 100;
		this.startTop	= this.element.top || this.element.offsetTop;
		this.startLeft = this.element.left || this.element.offsetLeft;
		new Effect.Scale(this.element, 200, { step: this.fade.bind(this), complete: this.hide.bind(this) } );
	},
	fade: function(effect) {
		topd		= (((effect.currentScale)*effect.startHeight) - effect.startHeight)/2;
		leftd	 = (((effect.currentScale)*effect.startWidth) - effect.startWidth)/2;
		this.element.style.position='absolute';
		this.element.style.top = this.startTop-topd + "px";
		this.element.style.left = this.startLeft-leftd + "px";
		this.opacity -= 10;
		this.setOpacity(this.element, this.opacity); 
		if(navigator.appVersion.indexOf('AppleWebKit')>0) this.element.innerHTML += ''; //force redraw on safari
	},
	hide: function() {
		this.element.style.display = 'none';
	},
	setOpacity: function(element, opacity) {
		opacity = (opacity == 100) ? 99.999 : opacity;
		element.style.filter = "alpha(opacity:"+opacity+")";
		element.style.opacity = opacity/100 /*//*/;
	}
}

Effect.Appear = Class.create();
Effect.Appear.prototype = {
	initialize: function(element) {
		this.element = $(element);
		this.start	= 0;
		this.finish = 100;
		this.current = this.start;
		this.fade();
	},
	
	fade: function() {
		if (this.isFinished()) return;
		if (this.timer) clearTimeout(this.timer);
		this.setOpacity(this.element, this.current);
		this.current += 10;
		this.timer = setTimeout(this.fade.bind(this), 50);
	},
	
	isFinished: function() {
		return this.current > this.finish;
	},
	
	setOpacity: function(element, opacity) {
		opacity = (opacity == 100) ? 99.999 : opacity;
		element.style.filter = "alpha(opacity:"+opacity+")";
		element.style.opacity = opacity/100 /*//*/;
		element.style.display = '';
	}
}

Effect.ContentZoom = Class.create();
Effect.ContentZoom.prototype = {
	initialize: function(element, percent) {
		this.element = $(element);
		if (this.element.style.fontSize=="") this.sizeEm = 1.0;
		if (this.element.style.fontSize.indexOf("em")>0)
			 this.sizeEm = parseFloat(this.element.style.fontSize);
		if(this.element.effect_contentzoom) {
			this.sizeEm = this.element.effect_contentzoom.sizeEm;
		}
		this.element.effect_contentzoom = this;
		this.element.style.fontSize = this.sizeEm*(percent/100) + "em" /*//*/;
		if(navigator.appVersion.indexOf('AppleWebKit')>0) { this.element.scrollTop -= 1; };
	}
}
