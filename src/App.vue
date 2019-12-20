<template>
	<div id="app">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
		<el-tab-pane label="备忘录" name="first">
			<todo></todo>
		</el-tab-pane>
		<el-tab-pane label="书签管理" name="third">
			<book-mark></book-mark>
		</el-tab-pane>
		<el-tab-pane label="云笔记" name="fourth">
			<note-book></note-book>
		</el-tab-pane>
		<el-tab-pane label="权限管理" name="second">
			<login></login>
		</el-tab-pane>
		</el-tabs>

		<div class="text-right text" style="margin-top: 15px">
		本插件已开源至 <a href="http://github.com/lflxp/Easy-todo" target="_blank" style="color: #20a0ff;outline: none">lflxp / Easy-todo</a>
		</div>	
	</div>
</template>

<script>
	import Login from './components/Login'
	import BookMark from './components/BookMark'
	import Todo from './components/Todo'
	import NoteBook from './components/NoteBook'
	
	export default {
		name: 'app',
		components: {
			Login,
			BookMark,
			Todo,
			NoteBook
		},
		data() {
			return {
        		activeName: 'first'
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>
