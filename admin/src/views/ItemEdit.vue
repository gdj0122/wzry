<template>
  <div>
    <h1>{{id?"编辑":"新建"}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :action='uploadUrl'
          :headers="getAuthHeaders()"
          :on-success="afterUpload"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props:{
    id:{}
  },
  data(){
    return {
      model:{},
    }
  },
  methods:{
     async save(){
       let res;
       if (this.id){
        res = await this.$http.put(`rest/items/${this.id}`,this.model)
       }else {
        res = await this.$http.post('rest/items',this.model)
       }
       this.$router.push('/items/list')
       this.$message({
         type:'success',
         message:"保存成功了"
       })
       console.log(res);
    },
    async fetch(){
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },
    afterUpload(res) {
      console.log(res);
      this.$set(this.model,'icon',res.url)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
  created(){
    this.id && this.fetch()
  }
}
</script>
