<template>
    <div>
        <el-row :gutter="10" style="margin-bottom: 10px;" v-show="online">
            <el-col :span="12">
                    <input type="text" name="todo_greeting" id="todo_filename" list="todo_greetings" style="width: 100%;height: 35px;" placeholder="选取备份文件（可自定义输入）">
                    <!-- 使用style="display:none;"将datalist元素设定为不显示 -->
                    <datalist id="todo_greetings" style="display:none;"></datalist>
            </el-col>
            <el-col :span="3">
                <el-popover
                    placement="top"
                    width="160"
                    v-model="v1">
                    <p>确定上传吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="v1 = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="upload(content)">确定</el-button>
                    </div>
                    <el-button type="primary" slot="reference" style="width: 100%">上传</el-button>
                </el-popover>
            </el-col>
            <el-col :span="3">
                <el-popover
                    placement="top"
                    width="160"
                    v-model="v2">
                    <p>确定下载覆盖吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="v2 = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="download(content)">确定</el-button>
                    </div>
                    <el-button type="success" slot="reference" style="width: 100%">下载</el-button>
                </el-popover>
            </el-col>
            <el-col :span="3">
                <el-popover
                    style="padding: 5px;"
                    placement="top"
                    width="160"
                    v-model="v4">
                    <p>确定删除远程数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="v4 = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="clearonline()">确定</el-button>
                    </div>
                    <el-button type="danger" slot="reference" style="width: 100%">远程清空</el-button>
                </el-popover>
            </el-col>
            <el-col :span="3">
                <el-popover
                    placement="top"
                    width="160"
                    v-model="v3">
                    <p>确定清空本地数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="v3 = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="doClear()">确定</el-button>
                    </div>
                    <el-button type="danger" slot="reference" style="width: 100%">本地清空</el-button>
                </el-popover>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="18">
                <el-input placeholder="请输入内容"
                    v-model="content"
                    class="top-input"
                    @keyup.enter.native="doConfirm(content)"
                    :class="selectClass"
                    :on-icon-click="showTextArea">
                <el-select v-model="selectClass" slot="prepend">
                    <el-option label="记录" value="a_info"></el-option>
                    <el-option label="重要" value="b_important"></el-option>
                    <el-option label="紧急" value="c_urgency"></el-option>
                </el-select>
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="doConfirm(content)" style="width: 100%">确定</el-button>
            </el-col>
            <el-col :span="3">
                <el-switch
                    @change="openonline"
                    v-model="online"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </el-col>
        </el-row>
        
        <el-row type="flex" justify="space-between" :gutter="20" style="margin-top: 20px">
          <el-col :span="8" v-for="(v, k) in store" :key="k">
            <todo-item :type="k" :data="v" @saved="setStore"></todo-item>
          </el-col>
        </el-row>

        <el-dialog title="输入待办事项" :visible.sync="dialogVisible" size="large">
			<el-input
					type="textarea"
					:rows="5"
					placeholder="请输入内容"
					v-model="textarea">
			</el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="doConfirm(textarea)">确 定</el-button>
			</span>
		</el-dialog>
    </div>
</template>

<script>
import storage from '@/storage'
import TodoItem from './TodoItem'
export default {
    components: {
        TodoItem
    },
    data() {
        return {
            online: false,
            v1: false,
            v2: false,
            v3: false,
            v4: false,
            show: true,
            selectClass: 'a_info',
            content: '',
            textarea: '',
            dialogVisible: false,
            store: {
                a_info: {
                    name: '记录',
                    list: []
                },
                b_important: {
                    name: '重要',
                    list: []
                },
                c_urgency: {
                    name: '紧急',
                    list: []
                }
            }
        }
    },
    created(){
        this.init()
    },
    mounted() {
        let bg = chrome.extension.getBackgroundPage();
        let github = new bg.Github()
        github.getlist('todo/', document.querySelector('#todo_greetings'), '');
        this.getName()
    },
    methods: {
        saveName(name) {
          chrome.storage.local.set({ 'todoname': name }, () => {
            console.log('set  todoname name ok')
          })
        },
        getName() {
          chrome.storage.local.get(['todoname'], (result) =>{
            if (result.todoname !== undefined) {
              document.getElementById('todo_filename').value = result.todoname
            }
          })
        },
        openonline(state) {
            this.online = state
        },
        upload() {
            storage.get('easyTodoStorage').then(rs => {
                let files = document.getElementById('todo_filename').value
                if (files !== '' && files !== undefined) {
                    let bg = chrome.extension.getBackgroundPage()
                    let github = new bg.Github()
                    github.updateTodo('todo/' + files,rs)
                    this.saveName(files)
                    this.v1 = false
                    this.$message({
                        type:'success',
                        message: '同步上传成功'
                    })
                } else {
                    this.$message({
                        type:'danger',
                        message: '未选定文件名'
                    })
                }
            })
        },
        clearonline() {
            let files = document.getElementById('todo_filename').value
            if (files !== '' && files !== undefined) {
                let bg = chrome.extension.getBackgroundPage()
                let github = new bg.Github()
                github.delete('todo/' + files, '删除' + files)
                
                this.$message({
                    type:'success',
                    message: '删除远程完成'
                })
            } else {
                this.$message({
                    type:'danger',
                    message: '未选定文件名'
                })
            }
            this.v4 = false
        },
        download() {
            let files = document.getElementById('todo_filename').value
            if (files !== '' && files !== undefined) {
                let bg = chrome.extension.getBackgroundPage()
                let github = new bg.Github()
                github.getTodo('todo/' + files,storage)
                this.saveName(files)

                this.$message({
                    type:'success',
                    message: '下载同步完成'
                })
            } else {
                this.$message({
                    type:'danger',
                    message: '未选定文件名'
                })
            }
            this.v2 = false
        },
        doClear() {
            storage.set({
                easyTodoStorage: {
                    a_info: {
                        name: '记录',
                        list: []
                    },
                    b_important: {
                        name: '重要',
                        list: []
                    },
                    c_urgency: {
                        name: '紧急',
                        list: []
                    }
                }
            })
            this.v3 = false
            this.$message({
                type:'success',
                message: '清空完毕'
            })
        },
        init(){
            storage.get('easyTodoStorage').then(rs => {
                this.$set(this.$data, 'store', rs || {
                        a_info: {
                            name: '记录',
                            list: []
                        },
                        b_important: {
                            name: '重要',
                            list: []
                        },
                        c_urgency: {
                            name: '紧急',
                            list: []
                        }
                    })
            });
        },
        doConfirm(content){
            if (content.trim() === '') {
                return this.$message({
                    type: 'warning',
                    message: '不能为空哦'
                })
            }
            this.store[this.selectClass].list.splice(0, 0, {
                content: content,
                showBody: false,
                remind: ''
            });

            this.content = '';
            this.textarea = '';
            this.dialogVisible = false;
            this.setStore();
        },
        setStore(){
            var store = this.store;
            for (let k in store) {
                var list = store[k].list;
                for (let v of list) {
                    v.showBody = false
                    if(v.remind) {
                        v.remind = v.remind.toString();
                    }
                }
            }

            storage.set({
                easyTodoStorage: store
            })
        },
        showTextArea(){
            this.textarea = this.content;
            this.dialogVisible = true
        }
    }
}
</script>