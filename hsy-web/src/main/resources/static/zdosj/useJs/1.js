var getMenuByAreaIdUrl = "/menuNode/getMenuNodeByAreaId";

/**
 * 菜单节点ID
 * @type {number}
 */
var menuNodeId = 0;

var areaId = 1;

var menuNodes = new Array();

// 初始化节点
var setting = {
    view: {
        selectedMulti: false
    },
    data: {
        key: {
            title: "t"
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        beforeCollapse: beforeCollapse,
        beforeExpand: beforeExpand,
        onCollapse: onCollapse,
        onExpand: onExpand
    }
};

function beforeClick(treeId, treeNode) {
    if (treeNode.isParent) {
        return true;
    } else {
        menuNodeId = treeNode.id;
        window.parent.sd.location.href = "2change.html?menuNodeId=" + menuNodeId;
    }
}

var log, className = "dark";
function beforeCollapse(treeId, treeNode) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " beforeCollapse ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
    return (treeNode.collapse !== false);
}
function onCollapse(event, treeId, treeNode) {
    showLog("[ " + getTime() + " onCollapse ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
}
function beforeExpand(treeId, treeNode) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " beforeExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
    return (treeNode.expand !== false);
}
function onExpand(event, treeId, treeNode) {
    showLog("[ " + getTime() + " onExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
}
function showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='" + className + "'>" + str + "</li>");
    if (log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
    }
}
function getTime() {
    var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        ms = now.getMilliseconds();
    return (h + ":" + m + ":" + s + " " + ms);
}

function expandNode(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        type = e.data.type,
        nodes = zTree.getSelectedNodes();
    if (type.indexOf("All") < 0 && nodes.length == 0) {
        alert("请先选择一个父节点");
    }

    if (type == "expandAll") {
        zTree.expandAll(true);
    } else if (type == "collapseAll") {
        zTree.expandAll(false);
    } else {
        var callbackFlag = $("#callbackTrigger").attr("checked");
        for (var i = 0, l = nodes.length; i < l; i++) {
            zTree.setting.view.fontCss = {};
            if (type == "expand") {
                zTree.expandNode(nodes[i], true, null, null, callbackFlag);
            } else if (type == "collapse") {
                zTree.expandNode(nodes[i], false, null, null, callbackFlag);
            } else if (type == "toggle") {
                zTree.expandNode(nodes[i], null, null, null, callbackFlag);
            } else if (type == "expandSon") {
                zTree.expandNode(nodes[i], true, true, null, callbackFlag);
            } else if (type == "collapseSon") {
                zTree.expandNode(nodes[i], false, true, null, callbackFlag);
            }
        }
    }
}

// 根据大区域ID获取菜单节点
function getMenuNodeByAreaId() {
    $.ajax({
        type: "GET",
        url: getMenuByAreaIdUrl,
        data: {
            areaId: areaId
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result != null) {
                pushMenuNode(result);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

// 拼接菜单节点
function pushMenuNode(result) {
    menuNodes.splice(0, menuNodes.length);
    for (var i = 0; i < result.length; i++) {
        var zNode = new Object();
        zNode.id = result[i].id;
        zNode.name = result[i].menuNodeName;
        zNode.pId = result[i].fatherId;
        zNode.isParent = isLeaf(result[i].isLeaf);

        zNode.myId = result[i].id;
        zNode.menuNodeName = result[i].menuNodeName;
        zNode.url = result[i].url;
        zNode.level = result[i].level;
        zNode.myFatherId = result[i].fatherId;

        menuNodes.push(zNode);
    }

    $.fn.zTree.init($("#treeDemo"), setting, menuNodes);
    $("#expandBtn").bind("click", {type: "expand"}, expandNode);
    $("#collapseBtn").bind("click", {type: "collapse"}, expandNode);
    $("#toggleBtn").bind("click", {type: "toggle"}, expandNode);
    $("#expandSonBtn").bind("click", {type: "expandSon"}, expandNode);
    $("#collapseSonBtn").bind("click", {type: "collapseSon"}, expandNode);
    $("#expandAllBtn").bind("click", {type: "expandAll"}, expandNode);
    $("#collapseAllBtn").bind("click", {type: "collapseAll"}, expandNode);
}

// 是否叶子节点
function isLeaf(leaf) {
    return (leaf == 0 ? true : false);
}