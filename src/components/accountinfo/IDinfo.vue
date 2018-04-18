<template>
  <div class="accountInfo_view">
    <filiter></filiter>
    <div class="main_content IDinfo_view">
      <h4>账户证件信息</h4>
      <form>
        <div class="form-group idcard clearfix">
          <label class="control-label pull-left">身份证明类型</label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group idcard clearfix">
          <label class="control-label pull-left">身份证明号码<span class="must">*</span></label>
          <input class="control-input pull-left" type="text">
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">身份证明</label>
          <ul class="imgs idcards pull-left clearfix">
            <li>
              <div class="preview pull-left"></div>
              <div class="upload clearfix">
                <label class="pull-left">身份证明A</label>
                <a href="javascript:;" class="file pull-right">选择文件
                  <input type="file" id="platform_logo" name="platform_logo" @change="onFileChange">
                </a>
              </div>
            </li>
            <li>
              <div class="preview pull-left"></div>
              <div class="upload clearfix">
                <label class="pull-left">身份证明B</label>
                <a href="javascript:;" class="file pull-right">选择文件
                  <input type="file" id="platform_logo" name="platform_logo" @change="onFileChange">
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="form-group clearfix">
          <label class="control-label pull-left">地址证明</label>
          <ul class="imgs address pull-left clearfix">
            <li>
              <div class="preview pull-left"></div>
              <div class="upload clearfix">
                <label class="pull-left">地址证明A</label>
                <a href="javascript:;" class="file pull-right">选择文件
                  <input type="file" id="platform_logo" name="platform_logo" @change="onFileChange">
                </a>
              </div>
            </li>
            <li>
              <div class="preview pull-left"></div>
              <div class="upload clearfix">
                <label class="pull-left">地址证明</label>
                <a href="javascript:;" class="file pull-right">选择文件
                  <input type="file" id="platform_logo" name="platform_logo" @change="onFileChange">
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="operates clearfix">
          <a class="cancel pull-left">取消</a>
          <a class="edit pull-left">编辑</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import filiter from './filiter.vue'
let $self = ''
export default {
  name: 'IDinfo',
  components: {
    'filiter': filiter
  },
  created () {
    $self = this
  },
  methods: {
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0], e.target.id)
    },
    createImage (file, id) {
      let reader = new FileReader()
      reader.onload = (e) => {
        let params = e.target.result
        let aa = document.getElementById(id).value.toLowerCase().split('.')
        let $type = aa[aa.length - 1]
        if ($type === 'png' || $type === ' jpeg ' || $type === 'jpg' || $type === 'gif' || $type === 'ico') {
          let imagSize = document.getElementById('platform_logo').files[0].size
          if (imagSize < 1024 * 1024 * 5) {
            $self.$http.post('/support-center/common/upload-img',
              params,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'charset': 'utf-8'
                },
                emulateJSON: true
              }).then((res) => {
                if (res.body.code === 10000) {
                  $self.platformInfo.platformLogo = res.body.result
                } else {
                  // toast(res.body.msg, 2000, 'error')
                }
              }, (error) => {
                console.log('error', error)
              })
            return true
          } else {
            // toast('请选择小于5M的图片', 2000, 'error')
          }
        } else {
          // toast('请选择格式为*.png、*.jpeg、*.jpg、*.gif、*.ico 的图片', 2000, 'error')
        }
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../assets/sass/accountinfo.scss'
</style>
