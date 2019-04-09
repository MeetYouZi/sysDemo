<template>
  <div>
    <el-upload
      :auto-upload="true"
      :action="uploadUrl"
      ref="upload"
      list-type="picture-card"
      :before-upload="fnBeforeUpload"
      :on-success="fnUploadSuccess"
      :file-list="fileList"
      :data="data_extra"
      :headers="uploadHeaders"
      :http-request="fnUploadRequest"
      :limit="limitNum"
      :on-exceed ='uploadMax'
      :disabled="disabled"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogImgVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import OSS from "ali-oss";
// import UploadFileApi from "../../utils/UploadFileApi";
// impoßrt * as util from "utils/common";

export default {
  name: "fileUpload",
  props: {
    limitNum: {
      type: Number,
      default: 3
    },
    fileList: {
      type: Array,
      default(){
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
    // data_extra: {
    //   type: Object,
    //   required: true
    // },
    // accept: {
    //   type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      data_extra: {},
      uploadUrl: "",
      uploadFileLength: 0,
      uploadFileSuccess: 0,
      uploadFileNames: [],
      uploadFileName: [],
      files: 10,
      uploadHeaders: {
        authorization: ""
      },
      // disabled: false,
      dialogImgVisible: false,
      dialogImageUrl: ''
    };
  },
  methods: {
    /**
     * @description [fnUploadRequest 覆盖默认的上传行为，实现自定义上传]
     * @author   youzi
     * @param    {object}   option [上传选项]
     * @return   {null}   [没有返回]
     */
    async fnUploadRequest(option) {
      try {
        let vm = this;
        // vm.disabled = true;
        // 获取OSS配置信息
        // let uploadFileApi = new UploadFileApi();
        // console.log(uploadFileApi)
        // let ret = await uploadFileApi.fileOssParams();
        // if (!(ret.data && ret.data.code === "0" && ret.data.data)) {
        //   throw new Error("获取OSS参数失败");
        // }
        // let ossData = JSON.parse(ret.data.data);
        // let ossData = UploadFileApi.client.options;
        let relativePath = '11';
        let client = new OSS({
          accessKeyId: 'LTAIwnJs9j5sRTIS',
          accessKeySecret: 'H4xvi5VrjcpHzKqvLTpn7BEg9qRkhK',
          bucket: 'miux',
          region: 'oss-cn-beijing'
        });
        let file = option.file;
        const point = file.name.lastIndexOf(".");
        let suffix = file.name.substr(point);
        let fileName = file.name.substr(0, point);
        let date = vm.dateFormat(new Date(), "yyyyMMddhhmmss");
        let fileNames = `${fileName}_${date}${suffix}`;
        // 分片上传文件
        let ret = await client.multipartUpload(relativePath + fileNames, file, {
          progress: async function(p) {
            let e = {};
            e.percent = p * 100;
            option.onProgress(e);
          }
        });
        if (ret.res.statusCode === 200) {
          // vm.disabled = false
          // option.onSuccess(ret)
          return ret;
        } else {
          // vm.disabled = false;
          option.onError("上传失败");
        }
      } catch (error) {
        console.log(error);
        // this.disabled = false;
        option.onError("上传失败");
        this.$message.error(error.message);
      }
    },
    fnBeforeUpload(file) {
      const isImage = file.type.indexOf('image')
      const isLt2M = file.size / 1024 / 1024 < 15
      if (isImage == -1) {
        this.$message.error('上传图片格式有误!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 15MB!')
        return false
      }
      return isImage && isLt2M
    },
    fnUploadExceed(file) {
      console.log(file,'file上传前')
    },
    handlePictureCardPreview(file){
      this.dialogImageUrl = file.url;
      this.dialogImgVisible = true;
    },
    handleRemove (file, fileList) {
      this.fileList.splice(this.fileList.findIndex(item => item.url === file.url), 1)
      this.$emit('uploadSuccess', fileList)
    },
    uploadMax () {
      this.$message.error(`最多上传${this.limitNum}张图片`)
    },
    /**
     * @description [fnUploadSuccess 文件上传成功的函数]
     * @author   shanshuizinong
     * @return   {null}  [没有返回]
     */
    async fnUploadSuccess(res) {
      // TODO
      console.log(res,'res')
      this.fileList.push({
        name: res.name,
        url: `http://miux.oss-cn-beijing.aliyuncs.com/${res.name}`
      })
      this.$emit('uploadSuccess', this.fileList)
    }
  },
  created(){
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
