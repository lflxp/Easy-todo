<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="仓库地址" prop="url">
            <el-input type="text" v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="私有Token" prop="token">
            <el-input type="password" v-model="ruleForm.token"></el-input>
        </el-form-item>
        <el-form-item label="笔记本目录" prop="notebook">
            <el-input type="text" v-model="ruleForm.notebook"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存配置</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
  import storage from '@/storage'
  export default {
    data() {
      return {
        ruleForm: {
          url: '',
          token: '',
          notebook: ''
        },
        rules: {
          url: [
            { required: true, message: '请输入仓库完整URL地址', trigger: 'blur' },
            { min: 3, max: 100, message: '请输入仓库完整URL地址', trigger: 'blur' }
          ],
          token: [
            { required: true, message: '请输入私有访问接口Token', trigger: 'blur' },
            { min: 3, max: 100, message: '请输入私有访问接口Token', trigger: 'blur' }
          ],
          notebook: [
            { required: true, message: '请输入notebook项目目录', trigger: 'blur' },
            { min: 3, max: 100, message: '请输入notebook项目目录', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
      let _this = this
      let key = ['username', 'repos', 'token', 'localnum', 'notebook']
      let username;
      let repos;
      let token;
      let localnum;
      let notebook;

      let bg = chrome.extension.getBackgroundPage();

      chrome.storage.local.get(key, function (result) {
        username = result.username;
        repos = result.repos;
        token = result.token;
        localnum = result.localnum;
        notebook = result.notebook;

        if (localnum === '' || localnum === undefined) {
          bg.countBookmarks(document.querySelector('#count-local'))
        }
        
        _this.ruleForm.url = 'https://github.com/' + username + '/' + repos
        _this.ruleForm.token = token
        _this.ruleForm.notebook = notebook
      })

      // 获取目录
      // let github = new bg.Github();
      // github.getlist('bookmarks/', $('#greetings'), $('#count-repo'));
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit success',this.ruleForm);

            let tmp = this.ruleForm.url.split('/')
            let username = tmp[tmp.length - 2]
            let repos = tmp[tmp.length - 1]
            let token = this.ruleForm.token
            let notebook = this.ruleForm.notebook

            storage.set({ 'username': username, 'repos': repos, 'token': token, 'notebook': notebook })
            
            chrome.storage.local.set({ 'username': username, 'repos': repos, 'token': token, 'notebook': notebook }, () => {
              let bg = chrome.extension.getBackgroundPage()
              let github = new bg.Github()
              github.create('todo/create')
              chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'img/icon.png',
                title: '保存配置',
                message: '认证配置成功'
              })
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>