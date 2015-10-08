(function(global) {
  this.container = this.class(this.component, {
    constructor: function(config) {
      global.extend({
        activeCls: 'active'
      }, config);
    },
  
    select: function(item) {
      if ((typeof(item) === 'number') && (!isNaN(item))) {
        return (this.config.select) ? 
          (this.config.select(this.children()[item])) : 
          (this.children()[item].className += this.config.activeCls);
      }
    },
    
    children: function(item) {
      return (!this.config.children) ? this.el.childNodes : this.querySelectorAll(this.config.children);
    },
    renderItem: function(item) {
      return (new global.component(item))).el;
    },
    render: function(data) {
      this.data = data;
      data.map(function(item) {
        this.el.appendChild(this.renderItem(item));
      });
    }
  });
}).call(this.gin, this.gin);
