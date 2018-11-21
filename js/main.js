var app = new Vue({
  el: '#app',
  data: {
    dataList: [],
    totalMoney: 0
  },
  mounted: function(){
    this.cartView();
  },
  methods: {
    cartView: function(){
      this.$http.get('./data/cartData.json').then(function(res){
        console.log( res );
        this.dataList = res.data.result.list;
        this.totalMoney = res.data.result.totalMoney;
      })
    },
    updateNumber: function(product, type){
      if( type > 0 ){
        product.productQuantity++;
      }else if( type < 0){
        product.productQuantity <= 1 ? 1: product.productQuantity--;
      }
      this.updateTotalMoney();
    },
    updateTotalMoney: function(){
      let totalMoney = 0;
      var dataList = this.dataList;
      for(var i in dataList){
        totalMoney += dataList[i].productPrice * dataList[i].productQuantity;
      }
      this.totalMoney = totalMoney;
    },
    selected: function(product){
      if(typeof product.checked === 'undefined'){
        this.$set(product, 'checked', true);
      }else {
        product.checked = !product.checked;
      }
      this.updateTotalMoney();
    }

  }
  
})
