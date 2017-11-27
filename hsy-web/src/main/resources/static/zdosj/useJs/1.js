var getMenuByAreaIdUrl = "/menuNode/getMenuNodeByAreaId";
var addTableHeadNodeUrl = "/tableHeadNode/addTableHeadNode";
var getAllTableHeadNodeByMenuNodeIdUrl = "/tableHeadNode/getAllTableHeadNodeByMenuNodeId";
var updateTableHeadNodeUrl = "/tableHeadNode/updateTableHeadNode";
var getAreaTableByMenuNodeIdUrl = "/areaTable/getAreaTableByMenuNodeId";

/**
 * 菜单节点ID
 * @type {number}
 */
var menuNodeId = 0;

// 菜单节点
var nowMenuNode = new Object();

// 全部节点
var headNodes = new Array();

// 叶子结点
var leafNodes = new Array();

// 非叶子结点
var notLeafNodes = new Array();

// 树的深度
var deepestNodeLevel = 0;

var countryTableHeadNode = {
    id: -1,
    headNodeName: "国家或地区",
    fatherId: 0,
    level: 1,
    isLeaf: 1,
    myGroup: 0,
    height: 1,
    weight: 1,
    menuNodeId: menuNodeId,
    isParent: false
};

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
        showAreaTable(treeNode.id);
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

$(function () {
    getMenuNodeByAreaId();
})

// 是否叶子节点
function isLeaf(leaf) {
    return (leaf == 0 ? true : false);
}

function showAreaTable(menuNodeId) {
    getAreaTableByMenuNodeId(menuNodeId);
    buildTableHeadNodeByAreaTableId();
}

// 根据菜单节点ID获取表格
function getAreaTableByMenuNodeId(menuNodeId) {
    $.ajax({
        type: "GET",
        url: getAreaTableByMenuNodeIdUrl,
        data: {
            menuNodeId: menuNodeId
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result != null) {
                $("#areaTableName").val(result.areaTableName);
                $("#areaTableEnglishName").val(result.areaTableEnglishName);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

function buildTableHeadNodeByAreaTableId() {
    getAllNodes();
    startBuild();
}

function startBuild() {
    // 初始化
    init();

    // 获取宽高
    setHeightAndWeight();

    // 设置节点排序数
    setNodesMyGroup();

    // 排序
    sortMyNodes();

    // 生成表格
    generatingTable();

    bind();
}

// 排序
function sortMyNodes() {
    for (var i = 0; i < headNodes.length; i++) {
        for (var j = headNodes.length - 1; j > i; j--) {
            if (headNodes[j].myGroup < headNodes[j - 1].myGroup) {
                var temp = headNodes[j];
                headNodes[j] = headNodes[j - 1];
                headNodes[j - 1] = temp;
            }
        }
    }
}

// 设置节点排序数
function setNodesMyGroup() {
    for (var i = 0; i < deepestNodeLevel; i++) {
        var levelNodes = getLevelNodes(i);
        if (i === 0) {
            for (var j = 0; j < levelNodes.length; j++) {
                levelNodes[j].myGroup = j;
            }
        } else {
            for (var j = 0; j < levelNodes.length; j++) {
                var levelFatherNode = getNodeById(levelNodes[j].fatherId);
                levelNodes[j].myGroup = levelFatherNode.myGroup * 100 + j;
            }
        }
        updateHeadNodes(levelNodes);
    }
}

// 获取层级节点
function getLevelNodes(level) {
    // 层级节点
    var levelNodes = new Array();

    for (var i = 0; i < headNodes.length; i++) {
        if (headNodes[i].level === (level + 1)) {
            levelNodes.push(headNodes[i]);
        }
    }

    return levelNodes;
}

// 获取宽高
function setHeightAndWeight() {
    // 设置叶子结点高度
    setLeafNodeHeight();

    // 设置非叶子结点宽度
    setNotLeafNodesWeight();
}

// 设置非叶子结点宽度
function setNotLeafNodesWeight() {
    for (var i = 0; i < notLeafNodes.length; i++) {
        var notLeafNodeWeight = 0;
        for (var j = 0; j < leafNodes.length; j++) {
            var middleNode = leafNodes[j];
            for (var k = 0; k < (leafNodes[j].level - notLeafNodes[i].level); k++) {
                middleNode = getNodeById(middleNode.fatherId);
            }
            if (middleNode.id === notLeafNodes[i].id) {
                notLeafNodeWeight++;
            }
        }
        notLeafNodes[i].weight = notLeafNodeWeight;
    }

    // 更新根节点
    updateHeadNodes(notLeafNodes);
}

// 根据ID获取节点
function getNodeById(fatherId) {
    for (var i = 0; i < headNodes.length; i++) {
        if (headNodes[i].id == fatherId) {
            return headNodes[i];
        }
    }
}

// 设置叶子结点高度
function setLeafNodeHeight() {
    for (var i = 0; i < leafNodes.length; i++) {
        if (leafNodes[i].level < deepestNodeLevel) {
            leafNodes[i].height = deepestNodeLevel - leafNodes[i].level + 1;
        }
    }
    updateHeadNodes(leafNodes);
}

// 更新全部节点
function updateHeadNodes(myNodes) {
    for (var i = 0; i < myNodes.length; i++) {
        for (var j = 0; j < headNodes.length; j++) {
            if (myNodes[i].id === headNodes[j].id) {
                headNodes[j] = myNodes[i];
                break;
            }
        }
    }

    for (var i = 0; i < myNodes.length; i++) {
        if (myNodes[i].id !== -1) {
            updateTableHeadNode(myNodes[i]);
        }
    }
}

/**
 * 更新节点
 * @param node
 */
function updateTableHeadNode(myNode) {
    var a = myNode;
    $.ajax({
        type: "GET",
        url: updateTableHeadNodeUrl,
        async: false, // 取消异步请求
        data: {
            id: parseInt(myNode.id),
            isLeaf: isTheParent(myNode.isParent),
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result != null) {
                // buildTableHeadNodeByAreaTableId();
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

// 初始化
function init() {
    // 获取所有的叶子结点
    getLeafNodes();

    // 获取树的高度
    getDeep();

    // 获取所有的非叶子结点
    getNotLeafNodes();
}

// 获取所有的非叶子结点
function getNotLeafNodes() {
    for (var i = 0; i < headNodes.length; i++) {
        if (headNodes[i].isLeaf != 1) {
            notLeafNodes.push(headNodes[i]);
        }
    }
}

// 获取所有的叶子结点
function getLeafNodes() {
    for (var i = 0; i < headNodes.length; i++) {
        if (headNodes[i].isLeaf == 1) {
            leafNodes.push(headNodes[i]);
        }
    }
}

// 获取树的高度
function getDeep() {
    for (var i = 0; i < leafNodes.length; i++) {
        if (leafNodes[i].level >= deepestNodeLevel) {
            deepestNodeLevel = leafNodes[i].level;
        }
    }
}

// 获取所有节点
function getAllNodes() {
    $.ajax({
        type: "GET",
        url: getAllTableHeadNodeByMenuNodeIdUrl,
        async: false, // 取消异步请求
        data: {
            menuNodeId: menuNodeId
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result != null) {
                pushHeadNodes(result);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

// 将获取到的节点放置在全部节点中
function pushHeadNodes(result) {
    clearHeadNodes();
    for (var i = 0; i < result.length; i++) {
        var addCountryTableHeadNode = {
            id: result[i].id,
            headNodeName: result[i].tableHeadNodeName,
            fatherId: result[i].fatherId,
            level: result[i].level,
            isLeaf: result[i].isLeaf,
            myGroup: result[i].myGroup,
            height: result[i].height,
            weight: result[i].weight,
            menuNodeId: menuNodeId,
            isParent: isLeaf(result[i].isLeaf)
        }
        headNodes.push(addCountryTableHeadNode);
    }
}

// 清空HeadNodes数组
function clearHeadNodes() {
    deepestNodeLevel = 0;
    leafNodes.splice(0, leafNodes.length);
    notLeafNodes.splice(0, notLeafNodes.length);
    headNodes.splice(0, headNodes.length);
    headNodes.push(countryTableHeadNode);
}

// 生成表格
function generatingTable() {
    var myHtml = "";
    for (var i = 0; i < deepestNodeLevel; i++) {
        myHtml += "<tr>";
        var levelNodes = getLevelNodes(i);
        for (var j = 0; j < levelNodes.length; j++) {
            myHtml += "<td id='" + levelNodes[j].id + "' rowspan='" + levelNodes[j].height + "' colspan='" + levelNodes[j].weight + "'>" + levelNodes[j].headNodeName + "</td>";
        }
        myHtml += "</tr>";
    }
    $("#myTable").html(myHtml);
}