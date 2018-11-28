new Vue({
    el: '.container',
    data: {
        addressList: [],
        defaultlistnum: 3,
        checkindex: 0,
        defaultshippingmethods: 1
    },
    methods: {
        getAddressData: function(){
            this.$http.get('./data/address.json').then(function(res){
                if(res.status === 200){
                    this.addressList = res.data.result;
                }
            })
        },
        checkfun: function(index){
            this.checkindex = index;
        },
        setdefault: function(addressId){
            this.addressList.forEach(function(item, index){
                if(addressId === item.addressId){
                    item.isDefault = true;
                }else{
                    item.isDefault = false;
                }
            });
        },
        shippingmethods: function(num){
            this.defaultshippingmethods = num;
        }
    },
    computed: {
        defaultlist: function(){
            return this.addressList.slice(0, this.defaultlistnum);
        }
    },
    mounted() {
        this.getAddressData();
    },
})