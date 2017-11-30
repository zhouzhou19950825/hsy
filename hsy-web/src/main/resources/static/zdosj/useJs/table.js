/*************************************** edit *************************************/
var getMenuByAreaIdUrl = "/menuNode/getMenuNodeByAreaId";

var getMenuByIdUrl = "/menuNode/getMenuNodeById";

var getAreaTableByMenuNodeIdUrl = "/areaTable/getAreaTableByMenuNodeId";

var updateMenuNodeUrl = "/menuNode/updateMenuNode";

var updateAreaTableUrl = "/areaTable/updateAreaTable";

var getCountryByAreaIdUrl = "/country/getCountryByAreaId";

var getAreaTableDataByCountryIdAndTableHeadNodeIdUrl = "/areaTableData/getAreaTableDataByCountryIdAndTableHeadNodeId";

var updateAreaTableDataUrl = "/areaTableData/updateAreaTableData";

var deleteMenuNodeUrl = "/menuNode/deleteMenuNode";

var updateOneMenuNodeUrl = "/menuNode/updateOneMenuNode"

var menuNodes = new Array();

var countries = "";

var areaId = 1;

// 初始化节点
var setting = {
    view: {
        selectedMulti: false
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        keep: {
            parent: true,
            leaf: true
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeDrag: beforeDrag,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove,
        onClick: zTreeOnClick
    }
};

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
}

// 删除菜单节点
function remove(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
    }
    var callbackFlag = $("#callbackTrigger").attr("checked");
    zTree.removeNode(treeNode, callbackFlag);

    if (treeNode.level === 0) {
        deleteMenuNode(treeNode.myId);
        if (treeNode.isLeaf === 1) {
            deleteByMenuNodeId(treeNode.myId, "areaTable", "AreaTable");
            deleteByMenuNodeId(treeNode.myId, "areaTableData", "AreaTableData");
            deleteByMenuNodeId(treeNode.myId, "tableHeadNode", "TableHeadNode");
        } else {
            deleteNextMenuNodes(treeNode);
        }
    } else {
        deleteMenuNode(treeNode.myId);
        var treeFatherNode = getTheMenuNodeById(treeNode.myFatherId);
        var nextLevelMenuNodes = getNextLevelMenuNodes(treeFatherNode.myId);
        // if (nextLevelMenuNodes.length === 1) {
        //     treeFatherNode.isParent = false;
        //     updateOneMenuNode(treeFatherNode);
        // }
        if (treeNode.isLeaf === 1) {
            deleteByMenuNodeId(treeNode.myId, "areaTable", "AreaTable");
            deleteByMenuNodeId(treeNode.myId, "areaTableData", "AreaTableData");
            deleteByMenuNodeId(treeNode.myId, "tableHeadNode", "TableHeadNode");
        } else {
            deleteNextMenuNodes(treeNode);
        }
    }

    getMenuNodeByAreaId();
}

// 更新一个菜单节点
// function updateOneMenuNode(menuNode) {
//     $.ajax({
//         type: "GET",
//         url: updateOneMenuNodeUrl,
//         async: false, // 取消异步请求
//         data: {
//             id: menuNode.myId,
//             isLeaf: isTheParent(menuNode.isParent)
//         },
//         beforeSend: function (XMLHttpRequest) {
//         },
//         success: function (result) {
//             if (result === null) {
//
//             }
//         },
//         complete: function (XMLHttpRequest, textStatus) {
//         },
//         error: function () {
//         }
//     });
// }

// 获取下一行的节点
function getNextLevelMenuNodes(fatherId) {
    var nextLevelMenuNodes = new Array();
    for (var i = 0; i < menuNodes.length; i++) {
        if (menuNodes[i].myFatherId === fatherId) {
            nextLevelMenuNodes.push(menuNodes[i]);
        }
    }
    return nextLevelMenuNodes;
}

// 删除此菜单节点下的节点
function deleteNextMenuNodes(menuNode) {
    var needDeleteMenuNodes = new Array();
    for (var i = 0; i < menuNodes.length; i++) {
        var useMenuNode = menuNodes[i];
        for (var j = 0; j < menuNodes[i].level - menuNode.level; j++) {
            useMenuNode = getTheMenuNodeById(useMenuNode.myFatherId);
        }
        if (useMenuNode.myId === menuNode.myId) {
            deleteMenuNode(menuNodes[i].myId);
            if (menuNodes[i].isLeaf === 1) {
                deleteByMenuNodeId(menuNodes[i].myId, "areaTable", "AreaTable");
                deleteByMenuNodeId(menuNodes[i].myId, "areaTableData", "AreaTableData");
                deleteByMenuNodeId(menuNodes[i].myId, "tableHeadNode", "TableHeadNode");
            }
            needDeleteMenuNodes.push(menuNodes[i]);
        }
    }
    for (var i = 0; i < needDeleteMenuNodes.length; i++) {
        menuNodes.remove(needDeleteMenuNodes[i]);
    }
}

// 根据菜单节点
function deleteByMenuNodeId(deletedMenuNodeId, deletedNodeName, deletedNodeTable) {
    $.ajax({
        type: "GET",
        url: "/" + deletedNodeName + "/delete" + deletedNodeTable + "ByMenuNodeId",
        async: false, // 取消异步请求
        data: {
            menuNodeId: deletedMenuNodeId
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result === null) {

            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

// 根据ID获取menuNode
function getTheMenuNodeById(id) {
    for (var i = 0; i < menuNodes.length; i++) {
        if (menuNodes[i].myId === id) {
            return menuNodes[i];
        }
    }
}

// 删除菜单节点
function deleteMenuNode(id) {
    $.ajax({
        type: "GET",
        url: deleteMenuNodeUrl,
        async: false, // 取消异步请求
        data: {
            id: id
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result === null) {

            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

$(function () {
    getMenuNodeByAreaId();
})

// 是否叶子节点
function isLeaf(leaf) {
    return (leaf == 0 ? true : false);
}

// 点击事件
function zTreeOnClick(event, treeId, treeNode) {
    clearHeadNodes();
    if (!treeNode.isParent) {
        var addHtml = "";

        addHtml += "<form id='areaTableForm'>";
        addHtml += "<label>请输入菜单名</label>";
        addHtml += "<input id='menuNodeName' type='text' name=''>";
        addHtml += "<label id='areaTableNameLabel'>请输入表格中文名</label>";
        addHtml += "<input id='areaTableName' type='text' name=''>"
        addHtml += "<label id='areaTableEnglishNameLabel'>请输入表格英文名</label>";
        addHtml += "<input id='areaTableEnglishName' type='text' name=''>";
        addHtml += "<label>请输入添加单元格内容</label>";
        addHtml += "<input type='text' name='' id='scanner'>";
        addHtml += "<table border='1' cellspacing='0' id='table1'>";
        addHtml += "<tbody id='myTable'>";
        addHtml += "</tbody>";
        addHtml += "</table>";
        addHtml += "<br/>";
        addHtml += "</form>";
        addHtml += "<button id='addChildrenHeadNodeButton' class='btn btn-small' onclick='addChildrenHeadNode()'>添加节点</button>";
        addHtml += "<button id='addFatherHeadNodeButton' class='btn btn-small' onclick='addFatherHeadNode()'>添加初节点</button>";
        addHtml += "<button id='deleteHeadNodeButton' class='btn btn-small' onclick='deleteHeadNode()'>删除节点</button>";
        addHtml += "<button id='updateInformationButton' class='btn btn-small' onclick='updateInformation()'>保存信息</button>";
        addHtml += "<button id='addAreaTableDataButton' class='btn btn-small' onclick='addAreaTableData()'>添加表格数据</button>";

        $("#right-table").html(addHtml);

        nowMenuNode = treeNode;
        menuNodeId = treeNode.myId;
        getMenuNodeById(treeNode.myId);
        getAreaTableByMenuNodeId(treeNode.myId);
        buildTableHeadNodeByAreaTableId();
    } else {
        nowMenuNode = treeNode;
        menuNodeId = treeNode.myId;
        var addHtml = "";

        addHtml += "<form id='areaTableForm'>";
        addHtml += "<label>请输入菜单名</label>";
        addHtml += "<input id='menuNodeName' type='text' name=''>";
        addHtml += "</form>";
        addHtml += "<button class='btn btn-small' onclick='updateInformation()'>保存信息</button>";

        $("#right-table").html(addHtml);

        getMenuNodeById(treeNode.myId);
    }
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

// 根据ID获取菜单节点
function getMenuNodeById(myId) {
    $.ajax({
        type: "GET",
        url: getMenuByIdUrl,
        data: {
            id: parseInt(myId)
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result != null) {
                $("#menuNodeName").val(result.menuNodeName);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

// 保存信息
function updateInformation() {
    var a = menuNodeId;
    updateMenuNode();
    if (!nowMenuNode.isParent) {
        updateAreaTable();
    }
    getMenuNodeByAreaId();
}

// 更新菜单节点信息
function updateMenuNode() {
    $.ajax({
        type: "GET",
        url: updateMenuNodeUrl,
        async: false, // 取消异步请求
        data: {
            menuNodeId: menuNodeId,
            menuNodeName: $("#menuNodeName").val()
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result === null) {
                alert("保存失败");
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

// 更新表格名
function updateAreaTable() {
    $.ajax({
        type: "GET",
        url: updateAreaTableUrl,
        async: false, // 取消异步请求
        data: {
            menuNodeId: menuNodeId,
            areaTableName: $("#areaTableName").val(),
            areaTableEnglishName: $("#areaTableEnglishName").val()
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result === null) {
                alert("保存失败");
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

// 添加表格数据
function addAreaTableData() {
    // 获取所有的国家地区
    getCountryByAreaId();

    var addTableHtml = "";

    for (var i = 0; i < countries.length; i++) {
        addTableHtml += "<tr><td id='" + countries[i].id + "'>" + countries[i].countryName + "</td>";
        for (var j = 0; j < leafNodes.length; j++) {
            if (leafNodes[j].id != -1) {
                addTableHtml += "<td id='" + countries[i].id + "_" + leafNodes[j].id + "' contentEditable='true'></td>";
            }
        }
        addTableHtml += "</tr>";
    }

    $("#myTable").append(addTableHtml);
    // $("#addChildrenHeadNodeButton").css('display', 'none');
    // $("#addFatherHeadNodeButton").css('display', 'none');
    // $("#updateInformationButton").css('display', 'none');
    // $("#addAreaTableDataButton").css('display', 'none');
    $("#updateAreaTableDatasAAA").css('display', 'none');
    $("#right-table").append("<button id='updateAreaTableDatasAAA' class='btn btn-small' onclick=updateAreaTableDatas()>保存</button>");

    // 获取所有数据
    for (var i = 0; i < countries.length; i++) {
        for (var j = 0; j < leafNodes.length; j++) {
            if (leafNodes[j].id != -1) {
                getAreaTableDataByCountryIdAndTableHeadNodeId(countries[i].id, leafNodes[j].id);
            }
        }
    }
}

// 保存
function updateAreaTableDatas() {
    for (var i = 0; i < countries.length; i++) {
        for (var j = 0; j < leafNodes.length; j++) {
            if (leafNodes[j].id != -1) {
                updateAreaTableData(countries[i].id, leafNodes[j].id);
            }
        }
    }
}

// 更新单个节点数据
function updateAreaTableData(countryId, tableHeadNodeId) {
    var useId = countryId + "_" + tableHeadNodeId;
    var content = $("#" + useId).text();
    $.ajax({
        type: "GET",
        url: updateAreaTableDataUrl,
        // async: false, // 取消异步请求
        data: {
            countryId: countryId,
            tableHeadNodeId: tableHeadNodeId,
            menuNodeId: menuNodeId,
            content: content
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            $("#" + countryId + "_" + tableHeadNodeId).html(result.content);
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

// 根据国家ID和叶子节点ID获取或添加数据
function getAreaTableDataByCountryIdAndTableHeadNodeId(countryId, tableHeadNodeId) {
    $.ajax({
        type: "GET",
        url: getAreaTableDataByCountryIdAndTableHeadNodeIdUrl,
        // async: false, // 取消异步请求
        data: {
            countryId: countryId,
            tableHeadNodeId: tableHeadNodeId,
            menuNodeId: menuNodeId
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            $("#" + countryId + "_" + tableHeadNodeId).html(result.content);
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

// 获取所有的国家地区
function getCountryByAreaId() {
    $.ajax({
        type: "GET",
        url: getCountryByAreaIdUrl,
        async: false, // 取消异步请求
        data: {
            areaId: areaId
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result !== null) {
                countries = result;
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

/********************************************** table ****************************************************/

var addTableHeadNodeUrl = "/tableHeadNode/addTableHeadNode";
var getAllTableHeadNodeByMenuNodeIdUrl = "/tableHeadNode/getAllTableHeadNodeByMenuNodeId";
var updateTableHeadNodeUrl = "/tableHeadNode/updateTableHeadNode";
var deleteTableHeadNodeUrl = "/tableHeadNode/deleteTableHeadNode";
var deleteAreaTableDataUrl = "/areaTableData/deleteAreaTableData"

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

headNodes.push(countryTableHeadNode);

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

    var newCountryTableHeadNode = {
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

    headNodes.push(newCountryTableHeadNode);
}

/**
 * 通过表格ID开始获取头节点进行拼装
 */
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

// 初始化
function init() {
    // 获取所有的叶子结点
    getLeafNodes();

    // 获取树的高度
    getDeep();

    // 获取所有的非叶子结点
    getNotLeafNodes();
}

// 获取宽高
function setHeightAndWeight() {
    // 设置叶子结点高度
    setLeafNodeHeight();

    // 设置非叶子结点宽度
    setNotLeafNodesWeight();
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
                var levelFatherNode = getHeadNodeById(levelNodes[j].fatherId);
                levelNodes[j].myGroup = levelFatherNode.myGroup * 100 + j;
            }
        }
        updateHeadNodes(levelNodes);
    }
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
            myGroup: myNode.myGroup
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

// 设置非叶子结点宽度
function setNotLeafNodesWeight() {
    for (var i = 0; i < notLeafNodes.length; i++) {
        var notLeafNodeWeight = 0;
        for (var j = 0; j < leafNodes.length; j++) {
            var middleNode = leafNodes[j];
            for (var k = 0; k < (leafNodes[j].level - notLeafNodes[i].level); k++) {
                middleNode = getHeadNodeById(middleNode.fatherId);
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

// 设置叶子结点高度
function setLeafNodeHeight() {
    for (var i = 0; i < leafNodes.length; i++) {
        if (leafNodes[i].level < deepestNodeLevel) {
            leafNodes[i].height = deepestNodeLevel - leafNodes[i].level + 1;
        }
    }
    updateHeadNodes(leafNodes);
}

// 根据ID获取节点
function getHeadNodeById(fatherId) {
    for (var i = 0; i < headNodes.length; i++) {
        if (headNodes[i].id == fatherId) {
            return headNodes[i];
        }
    }
    return null;
}

// 获取树的高度
function getDeep() {
    for (var i = 0; i < leafNodes.length; i++) {
        if (leafNodes[i].level >= deepestNodeLevel) {
            deepestNodeLevel = leafNodes[i].level;
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

// 获取所有的非叶子结点
function getNotLeafNodes() {
    for (var i = 0; i < headNodes.length; i++) {
        if (headNodes[i].isLeaf != 1) {
            notLeafNodes.push(headNodes[i]);
        }
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

/***********************************************************************************************************/

function bind() {
    $('#table1 td').each(function () {
        $(this).click(function () {
            $(this).addClass('th_active').siblings().removeClass('th_active');
            $(this).parent().siblings().find('td').removeClass('th_active'); // 设置点击td的颜色
        });
    });
}

function addChildrenHeadNode() {
    var tdId = $(".th_active").attr("id");

    if (tdId === null || tdId === undefined || tdId === '') {
        alert("请选择父节点");
    } else {
        if (parseInt(tdId) == -1) {
            alert("此节点下不能添加！");
        } else {
            var addedNode = getHeadNodeById(tdId);

            addedNode.isParent = true;

            var addedNodes = new Array();

            addedNodes.push(addedNode);

            updateHeadNodes(addedNodes);

            var addNode = {
                headNodeName: $("#scanner").val(),
                fatherId: addedNode.id,
                level: addedNode.level + 1,
                isParent: false,
                height: 1,
                weight: 1,
                menuNodeId: menuNodeId
            };

            addNewNodes(addNode);

            bind();
            return false;
        }
    }
}

// 添加新节点
function addNewNodes(addNode) {
    var a = addNode;
    $.ajax({
        type: "GET",
        url: addTableHeadNodeUrl,
        data: {
            tableHeadNodeName: addNode.headNodeName,
            fatherId: addNode.fatherId,
            level: addNode.level,
            isLeaf: isTheParent(addNode.isParent),
            menuNodeId: menuNodeId,
            myGroup: 0
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result != null) {
                addNode.id = result.id;
                var addNodes = new Array();
                addNodes.push(addNode);
                updateHeadNodes(addNodes);
                clearHeadNodes();
                buildTableHeadNodeByAreaTableId();
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (err) {
            alert(err.toString());
        }
    });
}

// 添加父节点
function addFatherHeadNode() {
    var addNode = {
        headNodeName: $("#scanner").val(),
        fatherId: 0,
        level: 1,
        isLeaf: 1,
        height: 1,
        weight: 1,
        menuNodeId: menuNodeId
    };

    addNewNodes(addNode);
}

// 删除节点
function deleteHeadNode() {
    var tdId = $(".th_active").attr("id");

    if (tdId === null || tdId === undefined || tdId === '') {
        alert("请选择需要删除的节点");
    } else {
        var selectNode = getHeadNodeById(tdId);
        if (selectNode.level === 1) {
            deleteTableHeadNode(tdId);
            deleteHeadNodes(selectNode);
            if (selectNode.isLeaf === 1) {
                deleteAreaTableData(tdId);
            }
        } else {
            var selectFatherHeadNode = new Object();
            selectFatherHeadNode = getHeadNodeById(selectNode.fatherId);
            var nextLevelHeadNodes = getNextLevelHeadNodes(selectFatherHeadNode.id);
            if (nextLevelHeadNodes.length === 1) {
                selectFatherHeadNode.isParent = false;
                var toUpdateHeadNodes = new Array();
                toUpdateHeadNodes.push(selectFatherHeadNode);
                updateHeadNodes(toUpdateHeadNodes);
                deleteTableHeadNode(tdId);
                deleteHeadNodes(selectNode);
                if (selectNode.isLeaf === 1) {
                    deleteAreaTableData(tdId);
                }
            } else {
                deleteTableHeadNode(tdId);
                deleteHeadNodes(selectNode);
                if (selectNode.isLeaf === 1) {
                    deleteAreaTableData(tdId);
                }
            }
        }

        buildTableHeadNodeByAreaTableId();
    }
}

// 获取节点下一层
function getNextLevelHeadNodes(id) {
    var nextLevelHeadNodes = new Array();
    for (var i = 0; i < headNodes.length; i++) {
        if (headNodes[i].fatherId === id) {
            nextLevelHeadNodes.push(headNodes[i]);
        }
    }
    return nextLevelHeadNodes;
}

// 删除某节点下的节点
function deleteHeadNodes(deleteHeadNode) {
    for (var i = 0; i < headNodes.length; i++) {
        var useHeadNode = headNodes[i];
        for (var j = 0; j < headNodes[i].level - deleteHeadNode.level; j++) {
            useHeadNode = getHeadNodeById(useHeadNode.fatherId);
        }
        if (useHeadNode.id === deleteHeadNode.id) {
            deleteTableHeadNode(headNodes[i].id);
            if (headNodes[i].isLeaf === 1) {
                deleteAreaTableData(headNodes[i].id);
            }
        }
    }
}

// 删除节点下的数据
function deleteAreaTableData(tableHeadNodeId) {
    $.ajax({
        type: "GET",
        url: deleteAreaTableDataUrl,
        data: {
            tableHeadNodeId: tableHeadNodeId
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result === "SUCCESS") {

            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (err) {
            alert(err.toString());
        }
    });
}

// 删除节点Ajax
function deleteTableHeadNode(id) {
    $.ajax({
        type: "GET",
        url: deleteTableHeadNodeUrl,
        async: false, // 取消异步请求
        data: {
            id: id
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {
            if (result === "SUCCESS") {

            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (err) {
            alert(err.toString());
        }
    });
}

function isTheParent(parent) {
    var a = (parent === true);
    var b = (parent == true);
    return (parent == true ? 0 : 1);
}