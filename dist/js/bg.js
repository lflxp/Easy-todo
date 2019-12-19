// omnibox 演示
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
	console.log('inputChanged: ' + text);
	if (!text) return;

	try {
		var result = []
		chrome.bookmarks.search(text, function (re) {
			re.forEach((data, index) => {
				if (data.url !== undefined) {
					result[index] = { content: data.url, description: data.title }
				}
            })
            if (result !== undefined) {
                console.log('result',result)
			    suggest(result)
            }
		})
	} catch (e) {
		console.error('error ', e)
	} finally {
		suggest(result)
	}
});

// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {
	console.log('inputEntered: ' + text);
	if (!text) return;
	openUrlCurrentTab(text);
});

// 获取当前选项卡ID
function getCurrentTabId(callback) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (callback) callback(tabs.length ? tabs[0].id : null);
	});
}

// 当前标签打开某个链接
function openUrlCurrentTab(url) {
	getCurrentTabId(tabId => {
		chrome.tabs.update(tabId, { url: url });
	})
}

const options = {
    type: 'normal',
    id: '1',
    title: '个人办公',
    visible: true
}

chrome.contextMenus.create(options)

const options1 = {
    type: 'normal',
    id: '2-1',
    title: '书签管理',
    visible: true,
    parentId: '1',
    onclick: function(){
        chrome.tabs.create({url: 'chrome://bookmarks'});
    }
}

chrome.contextMenus.create(options1)

const options2 = {
    type: 'normal',
    id: '3-1',
    title: 'todo-list',
    visible: true,
    checked: true,
    parentId: '1',
    contexts: ['all']
}
chrome.contextMenus.create(options2);

const options3 = {
    type: 'normal',
    id: '3-2',
    title: '记录',
    visible: true,
    checked: true,
    parentId: '3-1',
    contexts: ['all']
}
chrome.contextMenus.create(options3);

const options4 = {
    type: 'normal',
    id: '3-3',
    title: '重要',
    visible: true,
    checked: true,
    parentId: '3-1',
    contexts: ['all']
}
chrome.contextMenus.create(options4);

const options5 = {
    type: 'normal',
    id: '3-5',
    title: '紧急',
    visible: true,
    checked: true,
    parentId: '3-1',
    contexts: ['all']
}
chrome.contextMenus.create(options5);