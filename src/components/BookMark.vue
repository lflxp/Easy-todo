<template>
  <div>
    <el-row>
      <el-col :span="24">
        <section>
          <div class="message-wrapper">
            <div class="counter">
              <div>本地有<strong id="count-local">--</strong>条书签</div>
              <div>线上有<strong id="count-repo">--</strong>个备份版本</div>
            </div>
          </div>
        </section>
      </el-col>
    </el-row>
    <el-row>
      <div style="margin-bottom: 20px;">
        <input type="text" name="greeting" id="filename" list="greetings" style="width: 100%;margin-top: 20px;height: 30px;" placeholder="选取备份文件（可自定义输入）">
        <!-- 使用style="display:none;"将datalist元素设定为不显示 -->
        <datalist id="greetings" style="display:none;"></datalist>
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-popover
          placement="top"
          width="160"
          v-model="v1">
          <p>确定上传吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="v1 = false">取消</el-button>
            <el-button type="primary" size="mini" id="upload">确定</el-button>
          </div>
          <el-button type="primary" slot="reference" style="width: 100%;">全量同步上传</el-button>
        </el-popover>
      </el-col>
      <el-col :span="6">
        <el-popover
          placement="top"
          width="160"
          v-model="v2">
          <p>确定全量同步下载吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="v2 = false">取消</el-button>
            <el-button type="primary" size="mini" id="download">确定</el-button>
          </div>
          <el-button type="success" style="width: 100%;" slot="reference">全量同步下载</el-button>
        </el-popover>
      </el-col>
      <el-col :span="6">
        <el-popover
          placement="top"
          width="160"
          v-model="v3">
          <p>确定删除远程书签吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="v3 = false">取消</el-button>
            <el-button type="primary" size="mini" id="clearonline">确定</el-button>
          </div>
          <el-button type="danger" style="width: 100%;" slot="reference">删除远程书签</el-button>
        </el-popover>
      </el-col>
      <el-col :span="6">
        <el-popover
          placement="top"
          width="160"
          v-model="v4">
          <p>确定删除本地书签吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="v4 = false">取消</el-button>
            <el-button type="primary" size="mini" id="clear">确定</el-button>
          </div>
          <el-button type="danger" style="width: 100%;" slot="reference">删除本地书签</el-button>
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        v1: false,
        v2: false,
        v3: false,
        v4: false,
        value: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    mounted() {
      let bg = chrome.extension.getBackgroundPage();
      // 清空标签
      document.getElementById('clear').onclick = function () {
        // let bg = chrome.extension.getBackgroundPage();
        bg.clearBookmarks();
        this.v4 = false
      }

      // 删除远程书签
      document.getElementById('clearonline').onclick = function () {
        let files = document.getElementById('filename').value
        if (files !== '' && files !== undefined) {
          // let bg = chrome.extension.getBackgroundPage()
          let github = new bg.Github()
          github.delete('bookmarks/' + files, '删除' + files)
        } else {
          alert('未选定文件名')
        }
        this.v3 = false
      }

      // 全量同步上传
      document.getElementById('upload').onclick = function () {
        let files = document.getElementById('filename').value
        if (files !== '' && files !== undefined) {
          // let bg = chrome.extension.getBackgroundPage()
          let github = new bg.Github()
          github.updateTags('bookmarks/' + files)
        } else {
          alert('未选定文件名')
        }
        this.v1 = false
      }

      // 全量同步下载
      document.getElementById('download').onclick = function () {
        let files = document.getElementById('filename').value
        if (files !== '' && files !== undefined) {
          // let bg = chrome.extension.getBackgroundPage()
          let github = new bg.Github()
          github.get('bookmarks/' + files)
        } else {
          alert('未选定文件名')
        }
        this.v2 = false
      }

      // let bg = chrome.extension.getBackgroundPage()
      let github = new bg.Github()
      github.getlist('bookmarks/', document.querySelector('#greetings'), document.querySelector('#count-repo'));

      // let element = document.querySelector('#greetings');
      // this.options.forEach((vds) => {
      //   var op = document.createElement('option');
      //   op.setAttribute('label', vds['label']);
      //   op.setAttribute('value', vds['value']);
      //   op.setAttribute('select', 'select')
      //   element.appendChild(op);
      // })
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      clear() {
        alert('1clear')
        // let bg = chrome.extension.getBackgroundPage()
        // bg.clearBookmarks()
      }
    }
  }
</script>

<style lang="less">
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .filename {
    display: inline-block;
    width: 100%;
    padding: 3px;
    margin: 5px 0;
    border: 1px solid #ddd;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 3px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.045);
    &:focus {
      border-color: #66afe9;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
    }
  }

  section {
    text-align: center;

    .message-wrapper {
      margin: 10px 0 15px 0;
      padding: 5px;
      color: #666;
      background-color: #f9f9f9;
      border-radius: 5px;
      font-size: 14px;

      .counter {
        strong {
          color: #f60;
        }
      }
    }
  }
</style>