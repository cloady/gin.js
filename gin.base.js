	(function() {
		this.gin = {
			/**
			* Create class
			*
			* @param [extClass] function Class extends
			* @param protoProps object/function Prototype properties
			* @param staticProps object/function Static properties
			* 
			* @return object
			*/

			class: function() {
				var newClass;
				if (typeof(arguments[0]) === 'function') {
					var extClass = arguments[0], protoProps = arguments[1], staticProps = arguments[2];
				} else {
					var extClass = null, protoProps = arguments[0], staticProps = arguments[1];
				}

				if (typeof(protoProps) === 'function') {
					extClass = protoProps;
					protoProps = extClass.prototype;
				}

				if (protoProps && protoProps.hasOwnProperty('constructor')) {
			      newClass = protoProps.constructor;
			    } else if (extClass) {
			      newClass = function(){ return extClass.apply(this, arguments); };
			    } else {
			      newClass = function(){  };
			    }

			    if (extClass) this.extend(newClass, extClass);
			    this.extend(newClass, staticProps);

			    if (extClass) {
			    	var Surrogate = function(){ this.constructor = newClass; };
			    	Surrogate.prototype = extClass.prototype;
			    	newClass.prototype = new Surrogate;
		    	}

			    if (protoProps) this.extend(newClass.prototype, protoProps);
			    if (extClass) newClass.__super__ = extClass.prototype;

			    return newClass;
			},

			/**
			* Extend two objects
			*
			* @param destObj object Destination object
			* @param sourceObj object Source Object
			*
			* @return object
			*/

			extend: function(destObj, sourceObj) {
				for(var k in sourceObj)
					if (sourceObj.hasOwnProperty(k))
	        			destObj[k] = sourceObj[k];
	        	return destObj;
			}
		};
	}).call(this);
