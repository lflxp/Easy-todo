webpackJsonp([1],{120:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(219),r=n.n(o),a=n(218),i=n.n(a),s=n(221),l=n.n(s),c=n(220),u=n.n(c);e.default={name:"app",components:{Login:r.a,BookMark:i.a,Todo:l.a,NoteBook:u.a},data:function(){return{activeName:"first"}},methods:{handleClick:function(t,e){console.log(t,e)}}}},121:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{value:"",form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}}},mounted:function(){var t=chrome.extension.getBackgroundPage();document.getElementById("clear").onclick=function(){t.clearBookmarks()},document.getElementById("clearonline").onclick=function(){var e=document.getElementById("filename").value;if(""!==e&&void 0!==e){(new t.Github).delete("bookmarks/"+e,"删除"+e)}else alert("未选定文件名")},document.getElementById("upload").onclick=function(){var e=document.getElementById("filename").value;if(""!==e&&void 0!==e){(new t.Github).updateTags("bookmarks/"+e)}else alert("未选定文件名")},document.getElementById("download").onclick=function(){var e=document.getElementById("filename").value;if(""!==e&&void 0!==e){(new t.Github).get("bookmarks/"+e)}else alert("未选定文件名")},(new t.Github).getlist("bookmarks/",document.querySelector("#greetings"),document.querySelector("#count-repo"))},methods:{onSubmit:function(){console.log("submit!")},clear:function(){alert("1clear")}}}},122:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(62);e.default={data:function(){return{ruleForm:{url:"",token:"",notebook:""},rules:{url:[{required:!0,message:"请输入仓库完整URL地址",trigger:"blur"},{min:3,max:100,message:"请输入仓库完整URL地址",trigger:"blur"}],token:[{required:!0,message:"请输入私有访问接口Token",trigger:"blur"},{min:3,max:100,message:"请输入私有访问接口Token",trigger:"blur"}],notebook:[{required:!0,message:"请输入notebook项目目录",trigger:"blur"},{min:3,max:100,message:"请输入notebook项目目录",trigger:"blur"}]}}},mounted:function(){var t=this,e=["username","repos","token","localnum","notebook"],n=void 0,o=void 0,r=void 0,a=void 0,i=void 0,s=chrome.extension.getBackgroundPage();chrome.storage.local.get(e,function(e){n=e.username,o=e.repos,r=e.token,a=e.localnum,i=e.notebook,""!==a&&void 0!==a||s.countBookmarks(document.querySelector("#count-local")),t.ruleForm.url="https://github.com/"+n+"/"+o,t.ruleForm.token=r,t.ruleForm.notebook=i})},methods:{submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;console.log("submit success",e.ruleForm);var n=e.ruleForm.url.split("/"),r=n[n.length-2],a=n[n.length-1],i=e.ruleForm.token,s=e.ruleForm.notebook;o.a.set({username:r,repos:a,token:i,notebook:s}),chrome.storage.local.set({username:r,repos:a,token:i,notebook:s},function(){(new(chrome.extension.getBackgroundPage().Github)).create("todo/create"),chrome.notifications.create(null,{type:"basic",iconUrl:"img/icon.png",title:"保存配置",message:"认证配置成功"})})})},resetForm:function(t){this.$refs[t].resetFields()}}}},123:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(223),r=n.n(o);e.default={components:{Tree:r.a},data:function(){return{activeNames:["1"],url:"https://api.github.com",user:"lflxp",repos:"tags",token:"",headers:{Authorization:"token "+this.token,"Content-type":"application/json"},sha:""}},methods:{get:function(){fetch(this.url+"/repos/"+this.user+"/"+this.repos+"/contents/todo",{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"token "+this.token})}).then(function(t){return t.json()}).catch(function(t){return console.error("Error:",t)}).then(function(t){console.log("get",t),t.forEach(function(t,e){console.log(t,e)})})},gettree:function(){fetch(this.url+"/repos/"+this.user+"/"+this.repos+"/git/trees/"+this.sha,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"token "+this.token})}).then(function(t){return t.json()}).catch(function(t){console.log("error",t)}).then(function(t){console.log("gettree",t)})},gettreer:function(){fetch(this.url+"/repos/"+this.user+"/"+this.repos+"/git/trees/"+this.sha+"?recursive=1",{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"token "+this.token})}).then(function(t){return t.json()}).catch(function(t){console.log("error",t)}).then(function(t){console.log("gettreer",t)})},handleChange:function(t){console.log(t)},goBack:function(){console.log("go back")}}}},124:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(63),r=n.n(o),a=n(62),i=n(222),s=n.n(i);e.default={components:{TodoItem:s.a},data:function(){return{online:!1,v1:!1,v2:!1,v3:!1,v4:!1,show:!0,selectClass:"a_info",content:"",textarea:"",dialogVisible:!1,store:{a_info:{name:"记录",list:[]},b_important:{name:"重要",list:[]},c_urgency:{name:"紧急",list:[]}}}},created:function(){this.init()},mounted:function(){(new(chrome.extension.getBackgroundPage().Github)).getlist("todo/",document.querySelector("#todo_greetings"),"")},methods:{openonline:function(t){this.online=t},upload:function(){var t=this;a.a.get("easyTodoStorage").then(function(e){var n=document.getElementById("todo_filename").value;if(""!==n&&void 0!==n){(new(chrome.extension.getBackgroundPage().Github)).updateTodo("todo/"+n,e),t.v1=!1,t.$message({type:"success",message:"同步上传成功"})}else t.$message({type:"danger",message:"未选定文件名"})})},clearonline:function(){var t=document.getElementById("todo_filename").value;if(""!==t&&void 0!==t){(new(chrome.extension.getBackgroundPage().Github)).delete("todo/"+t,"删除"+t),this.$message({type:"success",message:"删除远程完成"})}else this.$message({type:"danger",message:"未选定文件名"});this.v4=!1},download:function(){var t=document.getElementById("todo_filename").value;if(""!==t&&void 0!==t){(new(chrome.extension.getBackgroundPage().Github)).getTodo("todo/"+t,a.a),this.$message({type:"success",message:"下载同步完成"})}else this.$message({type:"danger",message:"未选定文件名"});this.v2=!1},doClear:function(){a.a.set({easyTodoStorage:{a_info:{name:"记录",list:[]},b_important:{name:"重要",list:[]},c_urgency:{name:"紧急",list:[]}}}),this.v3=!1,this.$message({type:"success",message:"清空完毕"})},init:function(){var t=this;a.a.get("easyTodoStorage").then(function(e){t.$set(t.$data,"store",e||{a_info:{name:"记录",list:[]},b_important:{name:"重要",list:[]},c_urgency:{name:"紧急",list:[]}})})},doConfirm:function(t){if(""===t.trim())return this.$message({type:"warning",message:"不能为空哦"});this.store[this.selectClass].list.splice(0,0,{content:t,showBody:!1,remind:""}),this.content="",this.textarea="",this.dialogVisible=!1,this.setStore()},setStore:function(){var t=this.store;for(var e in t){var n=t[e].list,o=!0,i=!1,s=void 0;try{for(var l,c=r()(n);!(o=(l=c.next()).done);o=!0){var u=l.value;u.showBody=!1,u.remind&&(u.remind=u.remind.toString())}}catch(t){i=!0,s=t}finally{try{!o&&c.return&&c.return()}finally{if(i)throw s}}}a.a.set({easyTodoStorage:t})},showTextArea:function(){this.textarea=this.content,this.dialogVisible=!0}}}},125:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(63),r=n.n(o);e.default={props:["type","data"],data:function(){return{pickerOptions0:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}}}},filters:{date2str:function(t){var e=new Date(t),n=e.getMonth()+1,o=e.getDate();return n<10&&(n="0"+n),o<10&&(o="0"+o),n+"-"+o}},computed:{remindLength:function(){return this.data.list.filter(function(t){return t.remind}).length}},created:function(){var t=this;this.$nextTick(function(){t.setDatePickerDefault()})},methods:{setDatePickerDefault:function(){var t=!0,e=!1,n=void 0;try{for(var o,a=r()(this.data.list);!(t=(o=a.next()).done);t=!0){var i=o.value;this.$set(i,"remind",i.remind||"")}}catch(t){e=!0,n=t}finally{try{!t&&a.return&&a.return()}finally{if(e)throw n}}},deleteList:function(t){this.$delete(this.data.list,t),this.setStore()},dateChange:function(t){this.data.list[t].read=!1,this.setStore()},setStore:function(){this.$emit("saved")}}}},126:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(64),r=n.n(o),a=n(128);e.default={components:{MarkdownEditor:a.a},data:function(){return{visible:!1,input1:"",currentSha:"",currentPath:"",showmarkdown:!0,content:"19870828",dialogTableVisible:!1,listLoading:!0,total:0,pagesize:5,currentPage:1,show1:!0,tableData:[{id:1,date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{id:2,date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄",hasChildren:!0},{id:3,date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄",children:[{id:31,date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{id:32,date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"}]},{id:4,date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}],notebook:"",url:"https://api.github.com",user:"",repos:"",token:"",sha:""}},mounted:function(){this.init()},methods:{deleted:function(t){var e={message:"delete "+t.path,branch:"master",sha:t.sha};fetch(this.url+"/repos/"+this.user+"/"+this.repos+"/contents/"+t.path,{method:"DELETE",body:r()(e),headers:new Headers({"Content-Type":"application/json",Authorization:"token "+this.token})}).then(function(t){return t.json()}).catch(function(t){return console.error("Error:",t)}).then(function(e){console.log("github delete success"+r()(e)),chrome.notifications.create(null,{type:"basic",iconUrl:"images/icon16.png",title:"NoteBook删除",message:"远程NoteBook "+t.path+" 删除完毕！"})})},newone:function(){var t=this;this.content="",this.currentPath="",this.dialogTableVisible=!0,this.showmarkdown=!1,this.$nextTick(function(){t.showmarkdown=!0})},init:function(){var t=this,e=["username","repos","token","notebook"],n=void 0,o=void 0,r=void 0,a=void 0;chrome.storage.local.get(e,function(e){n=e.username,o=e.repos,r=e.token,a=e.notebook,t.user=n,t.repos=o,t.token=r,t.notebook=a,t.get()})},updates:function(){var t=this;this.dialogTableVisible=!1;var e={message:"更新文件 "+this.notebook+"/"+this.currentPath+this.currentSha,content:window.btoa(unescape(encodeURIComponent(this.content))),sha:this.currentSha};fetch(this.url+"/repos/"+this.user+"/"+this.repos+"/contents/"+this.notebook+"/"+this.currentPath,{method:"PUT",body:r()(e),headers:new Headers({"Content-Type":"application/json",Authorization:"token "+this.token})}).then(function(t){return t.json()}).catch(function(t){chrome.notifications.create(null,{type:"basic",iconUrl:"images/icon16.png",title:"更新文件错误",message:t})}).then(function(e){chrome.notifications.create(null,{type:"basic",iconUrl:"images/icon16.png",title:"更新notebook",message:"成功 "+t.notebook+"/"+t.currentPath})})},cChange:function(t){this.currentPage=t},handleSizeChange:function(t){this.pagesize=t},getContents:function(t,e){var n=this;fetch(this.url+"/repos/"+this.user+"/"+this.repos+"/contents/"+t,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"token "+this.token})}).then(function(t){return t.json()}).catch(function(t){return console.error("Error:",t)}).then(function(o){console.log("getContents",o),n.dialogTableVisible=!0,n.content=decodeURIComponent(escape(window.atob(o.content))),n.currentPath=t.replace("notebook/",""),n.currentSha=e,n.showmarkdown=!1,n.$nextTick(function(){n.showmarkdown=!0})})},get:function(){var t=this;fetch(this.url+"/repos/"+this.user+"/"+this.repos+"/contents/"+this.notebook,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"token "+this.token})}).then(function(t){return t.json()}).catch(function(t){return console.error("Error:",t)}).then(function(e){console.log("get",e),t.tableData=[],e.forEach(function(e,n){var o=e;o.id=n,"dir"===o.type&&(o.hasChildren=!0),t.tableData.push(o)}),t.total=t.tableData.length,t.show1=!1,t.$nextTick(function(){t.show1=!0,t.listLoading=!1})})},load:function(t,e,n){var o=this;console.log("load",t,e,n),fetch(this.url+"/repos/"+this.user+"/"+this.repos+"/contents/"+t.path,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"token "+this.token})}).then(function(t){return t.json()}).catch(function(t){return console.error("Error:",t)}).then(function(t){console.log("get",t);var e=[];t.forEach(function(t,n){var r=t;r.id=n+o.total,"dir"===r.type&&(r.hasChildren=!0),e.push(r)}),n(e)})}}}},127:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(65),r=n.n(o),a=n(213),i=n.n(a),s=n(199);n.n(s);e.default={name:"MarkdownEditor",props:{value:{type:String,default:""},options:{type:Object,default:function(){return{}}},localCache:{type:Boolean,default:!0}},data:function(){return{editor:null}},methods:{addEvents:function(){var t=this;this.editor.codemirror.on("change",function(){var e=t.editor.value();t.localCache&&(localStorage.markdownContent=e),t.$emit("input",e),t.$emit("on-change",e)}),this.editor.codemirror.on("focus",function(){t.$emit("on-focus",t.editor.value())}),this.editor.codemirror.on("blur",function(){t.$emit("on-blur",t.editor.value())})}},mounted:function(){this.editor=new i.a(r()(this.options,{element:this.$refs.editor})),this.addEvents();var t=localStorage.markdownContent;t&&this.editor.value(t)}}},128:function(t,e,n){"use strict";var o=n(224),r=n.n(o);e.a=r.a},129:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=n.n(o),a=n(97),i=n.n(a),s=n(94),l=n.n(s),c=n(95),u=(n.n(c),n(96));n.n(u);r.a.use(l.a),r.a.config.productionTip=!1,new r.a({el:"#app",template:"<App/>",components:{App:i.a}})},199:function(t,e){},200:function(t,e){},201:function(t,e){},202:function(t,e){},217:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA1UlEQVQ4T6WT6xEBQRCEuzOQATKQgZMJESgREIIMyIAMkIEQTgRk0GrU7pW9fVjMv62a/ubRs8SfwZxe0gTACcADwIxkm8otATYATDQyCMltNUDSAMABQONERwALktZNEFEHTmyt2wjvcXWjBJAUwFpdZnaz6o+SApwBTDOAC0k/1islBbDFDX8CuPnvpdMgGRQNHpLmAHYfbsvc2PucPqDUvte0JMcRQJIdzrrysjs3ug4k1VT3/BtJu9DYBZ8hyezydpp9Zm8Upb9gFbyo+fozVe4CT3b1SRGGGH2EAAAAAElFTkSuQmCC"},218:function(t,e,n){function o(t){n(202)}var r=n(11)(n(121),n(229),o,null,null);t.exports=r.exports},219:function(t,e,n){var o=n(11)(n(122),n(230),null,null,null);t.exports=o.exports},220:function(t,e,n){var o=n(11)(n(123),n(231),null,null,null);t.exports=o.exports},221:function(t,e,n){var o=n(11)(n(124),n(232),null,null,null);t.exports=o.exports},222:function(t,e,n){function o(t){n(200)}var r=n(11)(n(125),n(225),o,null,null);t.exports=r.exports},223:function(t,e,n){var o=n(11)(n(126),n(226),null,null,null);t.exports=o.exports},224:function(t,e,n){function o(t){n(201)}var r=n(11)(n(127),n(228),o,null,null);t.exports=r.exports},225:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo-item",class:t.type},[o("div",{staticClass:"el-card box-card"},[o("div",{staticClass:"el-card__header"},[o("div",{staticClass:"clearfix card-header"},[o("el-row",[o("el-col",{attrs:{span:4}},[t._v(t._s(t.data.name))]),t._v(" "),o("el-col",{staticClass:"text-right",attrs:{span:20}},[t._v("\n\t\t\t\t\t\t\t共有待办 "+t._s(t.data.list.length)+" 条，提醒 "+t._s(t.remindLength)+" 条\n\t\t\t\t\t\t")])],1)],1)]),t._v(" "),o("div",{staticClass:"el-card__body scrollbar"},t._l(t.data.list,function(e,r){return o("div",{staticClass:"text list-item"},[o("el-row",[o("el-col",{attrs:{span:e.remind?14:22}},[o("p",{staticClass:"text-ellipsis",staticStyle:{cursor:"pointer"},on:{click:function(n){e.showBody=!e.showBody,t.dateValueIndex=r}}},[o("span",{staticStyle:{font:"bold",color:"black"}},[t._v(t._s(r)+".")]),t._v("\n\t\t\t\t\t\t\t\t"+t._s(e.content)+"\n                            ")])]),t._v(" "),o("el-col",{directives:[{name:"show",rawName:"v-show",value:e.remind,expression:"item.remind"}],staticClass:"text-center",attrs:{span:8}},[o("span",{staticClass:"list-item-remind",class:t.type+"-back"},[o("img",{staticStyle:{height:"12px","margin-top":"4px"},attrs:{src:n(217)}}),t._v("\n                                "+t._s(t._f("date2str")(e.remind))+"\n                                "),o("i",{staticStyle:{cursor:"pointer"},on:{click:function(t){e.remind=""}}},[t._v("×")])])]),t._v(" "),o("el-col",{staticClass:"text-right",attrs:{span:2}},[o("span",{staticClass:"el-icon-circle-cross",staticStyle:{cursor:"pointer",font:"bold",color:"red"},on:{click:function(e){return t.deleteList(r)}}},[t._v("×")])])],1),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.showBody,expression:"item.showBody"}],staticClass:"list-item-body"},[t._v("\n\t\t\t\t\t\t"+t._s(e.content)+"\n\n\t\t\t\t\t\t"),o("div",{staticStyle:{"margin-top":"5px"}},[t._v("\n\t\t\t\t\t\t\t设置提醒：\n\n\t\t\t\t\t\t\t"),o("el-date-picker",{attrs:{type:"date",size:"mini",placeholder:"选择日期"},on:{change:function(e){return t.dateChange(r)}},model:{value:e.remind,callback:function(n){t.$set(e,"remind",n)},expression:"item.remind"}})],1)])],1)}),0)])])},staticRenderFns:[]}},226:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"mini",type:"success"},on:{click:function(e){return t.newone()}}},[t._v("新增")]),t._v(" "),t.show1?n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{"element-loading-text":"加载中...",data:t.tableData.slice((t.currentPage-1)*t.pagesize,t.currentPage*t.pagesize),"row-key":"id",lazy:"",load:t.load,size:"mini","tooltip-effect":"dark","tree-props":{children:"children",hasChildren:"hasChildren"}}},[n("el-table-column",{attrs:{prop:"name",label:"文件名",sortable:"",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return["file"===e.row.type?n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.getContents(e.row.path,e.row.sha)}}},[t._v(t._s(e.row.name))]):n("span",[t._v(t._s(e.row.name))])]}}],null,!1,3358064146)}),t._v(" "),n("el-table-column",{attrs:{prop:"html_url",label:"在线查看"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-popover",{attrs:{trigger:"hover",placement:"right"}},[n("p",[t._v(t._s(e.row.html_url))]),t._v(" "),n("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[n("a",{attrs:{href:e.row.html_url,target:"_blank"}},[t._v("查看")])])])]}}],null,!1,1639770389)}),t._v(" "),n("el-table-column",{attrs:{prop:"path",label:"路径"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-popover",{attrs:{trigger:"hover",placement:"top"}},[n("p",[t._v(t._s(e.row.path))]),t._v(" "),n("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[n("el-tag",{attrs:{size:"medium",type:"danger"}},[t._v(t._s(e.row.path))])],1)])]}}],null,!1,3945575217)}),t._v(" "),n("el-table-column",{attrs:{prop:"size",label:"文件大小"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-popover",{attrs:{trigger:"hover",placement:"top"}},[n("p",[t._v("SHA: "+t._s(e.row.sha))]),t._v(" "),n("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[n("el-tag",{attrs:{size:"medium",type:"success"}},[t._v(t._s(e.row.size))])],1)])]}}],null,!1,1450240317)}),t._v(" "),n("el-table-column",{attrs:{prop:"op",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return t.deleted(e.row)}}},[t._v("删除")])]}}],null,!1,1221828382)})],1):t._e(),t._v(" "),n("div",{staticStyle:{"text-align":"center","margin-top":"30px"}},[n("el-pagination",{attrs:{background:"",layout:"total,sizes,prev, pager, next,jumper","page-sizes":[5,10,20,50,100,200,300,400],"page-size":t.pagesize,total:t.total,"current-page":t.currentPage},on:{"size-change":t.handleSizeChange,"current-change":t.cChange}})],1),t._v(" "),n("el-dialog",{attrs:{visible:t.dialogTableVisible,width:"90%",top:"0","show-close":!1},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[t.showmarkdown?n("markdown-editor",{model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}):t._e(),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-input",{staticStyle:{"margin-bottom":"20px"},attrs:{placeholder:"请输入内容"},model:{value:t.currentPath,callback:function(e){t.currentPath=e},expression:"currentPath"}},[n("template",{slot:"prepend"},[t._v("文件路径")]),t._v(" "),n("el-button",{attrs:{slot:"append"},on:{click:function(e){return t.updates()}},slot:"append"},[t._v("提交")])],2),t._v(" "),n("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")])],1)],1)],1)},staticRenderFns:[]}},227:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"备忘录",name:"first"}},[n("todo")],1),t._v(" "),n("el-tab-pane",{attrs:{label:"书签管理",name:"third"}},[n("book-mark")],1),t._v(" "),n("el-tab-pane",{attrs:{label:"云笔记",name:"fourth"}},[n("note-book")],1),t._v(" "),n("el-tab-pane",{attrs:{label:"权限管理",name:"second"}},[n("login")],1)],1),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-right text",staticStyle:{"margin-top":"15px"}},[t._v("\n\t本插件已开源至 "),n("a",{staticStyle:{color:"#20a0ff",outline:"none"},attrs:{href:"http://github.com/lflxp/Easy-todo",target:"_blank"}},[t._v("lflxp / Easy-todo")])])}]}},228:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"markdown-wrapper"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],ref:"editor",domProps:{value:t.value},on:{input:function(e){e.target.composing||(t.value=e.target.value)}}})])},staticRenderFns:[]}},229:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",[n("el-col",{attrs:{span:24}},[n("section",[n("div",{staticClass:"message-wrapper"},[n("div",{staticClass:"counter"},[n("div",[t._v("本地有"),n("strong",{attrs:{id:"count-local"}},[t._v("--")]),t._v("条书签")]),t._v(" "),n("div",[t._v("线上有"),n("strong",{attrs:{id:"count-repo"}},[t._v("--")]),t._v("个备份版本")])])])])])],1),t._v(" "),n("el-row",[n("div",{staticStyle:{"margin-bottom":"20px"}},[n("input",{staticStyle:{width:"100%","margin-top":"20px",height:"30px"},attrs:{type:"text",name:"greeting",id:"filename",list:"greetings",placeholder:"选取备份文件（可自定义输入）"}}),t._v(" "),n("datalist",{staticStyle:{display:"none"},attrs:{id:"greetings"}})])]),t._v(" "),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",id:"upload"}},[t._v("全量同步上传")])],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"success",id:"download"}},[t._v("全量同步下载")])],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"danger",id:"clearonline"}},[t._v("删除远程书签")])],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"danger",id:"clear"}},[t._v("删除本地书签")])],1)],1)],1)},staticRenderFns:[]}},230:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,"status-icon":"",rules:t.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"仓库地址",prop:"url"}},[n("el-input",{attrs:{type:"text"},model:{value:t.ruleForm.url,callback:function(e){t.$set(t.ruleForm,"url",e)},expression:"ruleForm.url"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"私有Token",prop:"token"}},[n("el-input",{attrs:{type:"password"},model:{value:t.ruleForm.token,callback:function(e){t.$set(t.ruleForm,"token",e)},expression:"ruleForm.token"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"笔记本目录",prop:"notebook"}},[n("el-input",{attrs:{type:"text"},model:{value:t.ruleForm.notebook,callback:function(e){t.$set(t.ruleForm,"notebook",e)},expression:"ruleForm.notebook"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("保存配置")]),t._v(" "),n("el-button",{on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("重置")])],1)],1)},staticRenderFns:[]}},231:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("tree")],1)},staticRenderFns:[]}},232:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",{directives:[{name:"show",rawName:"v-show",value:t.online,expression:"online"}],staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[n("el-col",{attrs:{span:12}},[n("input",{staticStyle:{width:"100%",height:"35px"},attrs:{type:"text",name:"todo_greeting",id:"todo_filename",list:"todo_greetings",placeholder:"选取备份文件（可自定义输入）"}}),t._v(" "),n("datalist",{staticStyle:{display:"none"},attrs:{id:"todo_greetings"}})]),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.v1,callback:function(e){t.v1=e},expression:"v1"}},[n("p",[t._v("确定上传吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.v1=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.upload(t.content)}}},[t._v("确定")])],1),t._v(" "),n("el-button",{staticStyle:{width:"100%"},attrs:{slot:"reference",type:"primary"},slot:"reference"},[t._v("上传")])],1)],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.v2,callback:function(e){t.v2=e},expression:"v2"}},[n("p",[t._v("确定下载覆盖吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.v2=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.download(t.content)}}},[t._v("确定")])],1),t._v(" "),n("el-button",{staticStyle:{width:"100%"},attrs:{slot:"reference",type:"success"},slot:"reference"},[t._v("下载")])],1)],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-popover",{staticStyle:{padding:"5px"},attrs:{placement:"top",width:"160"},model:{value:t.v4,callback:function(e){t.v4=e},expression:"v4"}},[n("p",[t._v("确定删除远程数据吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.v4=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.clearonline()}}},[t._v("确定")])],1),t._v(" "),n("el-button",{staticStyle:{width:"100%"},attrs:{slot:"reference",type:"danger"},slot:"reference"},[t._v("远程清空")])],1)],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.v3,callback:function(e){t.v3=e},expression:"v3"}},[n("p",[t._v("确定清空本地数据吗？")]),t._v(" "),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.v3=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doClear()}}},[t._v("确定")])],1),t._v(" "),n("el-button",{staticStyle:{width:"100%"},attrs:{slot:"reference",type:"danger"},slot:"reference"},[t._v("本地清空")])],1)],1)],1),t._v(" "),n("el-row",{attrs:{gutter:10}},[n("el-col",{attrs:{span:18}},[n("el-input",{staticClass:"top-input",class:t.selectClass,attrs:{placeholder:"请输入内容","on-icon-click":t.showTextArea},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doConfirm(t.content)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}},[n("el-select",{attrs:{slot:"prepend"},slot:"prepend",model:{value:t.selectClass,callback:function(e){t.selectClass=e},expression:"selectClass"}},[n("el-option",{attrs:{label:"记录",value:"a_info"}}),t._v(" "),n("el-option",{attrs:{label:"重要",value:"b_important"}}),t._v(" "),n("el-option",{attrs:{label:"紧急",value:"c_urgency"}})],1)],1)],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(e){return t.doConfirm(t.content)}}},[t._v("确定")])],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:t.openonline},model:{value:t.online,callback:function(e){t.online=e},expression:"online"}})],1)],1),t._v(" "),n("el-row",{staticStyle:{"margin-top":"20px"},attrs:{type:"flex",justify:"space-between",gutter:20}},t._l(t.store,function(e,o){return n("el-col",{key:o,attrs:{span:8}},[n("todo-item",{attrs:{type:o,data:e},on:{saved:t.setStore}})],1)}),1),t._v(" "),n("el-dialog",{attrs:{title:"输入待办事项",visible:t.dialogVisible,size:"large"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-input",{attrs:{type:"textarea",rows:5,placeholder:"请输入内容"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}}),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.doConfirm(t.textarea)}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},234:function(t,e){},62:function(t,e,n){"use strict";var o=n(130),r=n.n(o),a=n(64),i=(n.n(a),n(19)),s=(n.n(i),{});s.set=function(t){chrome.storage.sync.set(t)},s.get=function(t){return new r.a(function(e){chrome.storage.sync.get(t,function(n){e(n[t])})})},e.a=s},95:function(t,e){},96:function(t,e){},97:function(t,e,n){var o=n(11)(n(120),n(227),null,null,null);t.exports=o.exports}},[129]);
//# sourceMappingURL=app.a0ee2f08ee0d6bc1c731.js.map