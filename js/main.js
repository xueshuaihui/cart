var app = new Vue({
  el: '#app',
  data: {
    dataList: [],
    totalMoney: 0,
    allChecked: false
  },
  mounted: function(){
    this.cartView();
  },
  methods: {
    cartView: function(){
      this.$http.get('./data/cartData.json').then(function(res){
        this.dataList = res.data.result.list;
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
        if( dataList[i].checked ){
          totalMoney += dataList[i].productPrice * dataList[i].productQuantity;
        }
        
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
    },
    allSelected: function(){
       this.allChecked = !this.allChecked;
       this.dataList.forEach( (value, index) => {
        if(typeof value.checked === 'undefined'){
          this.$set(value, 'checked', true);
        }else {
          value.checked = this.allChecked;
        }
       });
       this.updateTotalMoney();
    },
    del: function(product){
      var index = this.dataList.indexOf( product );
      this.dataList.splice(index, 1);
      this.updateTotalMoney();
    }

  },
  filters: {
    moneyFilter: function(value){
      return value.toFixed(2);
    }
  }
  
})
