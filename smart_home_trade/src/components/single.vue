<template>
	<div class="single">
		<el-input v-model="input" placeholder="请输入内容" @input="changeValue"></el-input>

	</div>

	</template>


<script>
  export default {
  	name:"single",
    data() {
      return {
       options4: [],
        value9: [],
        input:'',
        list: [],
        loading: false,
      };
    },
     mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
	 methods: {
	 	// changeValue(v){
	 	// 	if(v.length)

	 	// }
	      // remoteMethod(query) {
	      //   if (query !== '') {
	      //     this.loading = true;
	      //     setTimeout(() => {
	      //       this.loading = false;
	      //       this.options4 = this.list.filter(item => {
	      //         return item.label.toLowerCase()
	      //           .indexOf(query.toLowerCase()) > -1;
	      //       });
	      //     }, 200);
	      //   } else {
	      //     this.options4 = [];
	      //   }
	      // }
	    }
  };
</script>