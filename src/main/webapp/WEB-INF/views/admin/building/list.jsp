<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/common/taglib.jsp" %>
<c:url var="buildingListURL" value="/admin/building-list"/>
<c:url var="buildingAPI" value="/api/building"/>

<html>
<head>
    <title>
        <%--<spring:message code="label.user.list"/>--%>
        Danh sách tòa nhà
    </title>
</head>

<body>
    <div class="main-content">
        <div class="main-content-inner">
            <div class="breadcrumbs" id="breadcrumbs">
                <script type="text/javascript">
                    try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
                </script>

                <ul class="breadcrumb">
                    <li>
                        <i class="ace-icon fa fa-home home-icon"></i>
                        <a href="#">Trang chủ</a>
                    </li>
                    <li class="active">Quản lý tòa nhà</li>
                </ul><!-- /.breadcrumb -->
            </div>

            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="widget-box ui-sortable-handle">
                            <div class="widget-header">
                                <h5 class="widget-title">Tìm kiếm</h5>

                                <div class="widget-toolbar">

                                    <a href="#" data-action="collapse">
                                        <i class="ace-icon fa fa-chevron-up"></i>
                                    </a>
                                </div>
                            </div>

                            <div class="widget-body" style="font-family: 'Times New Roman', Times, serif;">
                                <div class="widget-main">
                                    <form:form id="listForm" modelAttribute="modelSearch" action="${buildingListURL}" method="GET">
                                        <div class="row">
                                            <div class="from-group">
                                                <div class="col-xs-12">
                                                    <div class="col-xs-6">
                                                        <label class="name">Tên tòa nhà</label>
<%--                                                        <input id="name" type="text" class="form-control" name="name" value="${modelSearch.name}">--%>
                                                        <form:input class="form-control" path="name"/>
                                                    </div>
                                                    <div class="col-xs-6">
                                                        <label class="name">Diện tích sàn</label>
                                                        <input type="number" class="form-control" name="floorArea" value="${modelSearch.floorArea}">
                                                    </div>
                                                </div>
                                                <div class="col-xs-12">
                                                    <div class="col-xs-2">
                                                        <label class="name">Quận</label>
                                                        <form:select class="form-control" path="district">
                                                            <form:option value="">---Chọn Quận---</form:option>
                                                            <form:options items="${districts}"></form:options>
                                                        </form:select>
                                                    </div>
                                                    <div class="col-xs-5">
                                                        <label class="name">Phường</label>
<%--                                                        <input type="text" class="form-control" name="ward" value="${modelSearch.ward}">--%>
                                                        <form:input class="form-control" path="ward"/>
                                                    </div>
                                                    <div class="col-xs-5">
                                                        <label class="name">Đường</label>
<%--                                                        <input type="text" class="form-control" name="street" value="">--%>
                                                        <form:input class="form-control" path="street"/>
                                                    </div>
                                                </div>

                                                <div class="col-xs-12">
                                                    <div class="col-xs-4">
                                                        <label class="name">Số tầng hầm</label>
                                                        <input type="text" class="form-control" name="numberOfBasement" value="">
                                                    </div>
                                                    <div class="col-xs-4">
                                                        <label class="name">Hướng</label>
                                                        <input type="text" class="form-control" name="direction" value="">
                                                    </div>
                                                </div>

                                                <div class="col-xs-12">
                                                    <div class="col-xs-3">
                                                        <label class="name">Diện tích từ</label>
                                                        <input type="number" class="form-control" name="areaFrom" value="${modelSearch.areaFrom}">
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <label class="name">Diện tích đến</label>
                                                        <input type="number" class="form-control" name="areaTo" value="${modelSearch.areaTo}">
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <label class="name">Giá thuê từ</label>
                                                        <input type="number" class="form-control" name="rentPriceFrom" value="">
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <label class="name">Giá thuê đến</label>
                                                        <input type="number" class="form-control" name="rentPriceTo" value="">
                                                    </div>
                                                </div>

                                                <div class="col-xs-12">
                                                    <div class="col-xs-5">
                                                        <label class="name">Tên quản lý</label>
                                                        <input type="text" class="form-control" name="managerName" value="">
                                                    </div>
                                                    <div class="col-xs-5">
                                                        <label class="name">SĐT quản lý</label>
                                                        <input type="text" class="form-control" name="managerPhone" value="">
                                                    </div>
<%--                                                    <div class="col-xs-2">--%>
<%--                                                        <label class="name">Nhân viên</label>--%>
<%--                                                        <select class="form-control">--%>
<%--                                                            <option value="">---Chọn Nhân Viên---</option>--%>
<%--                                                            <option value="2">Nguyễn Xuân Mạnh</option>--%>
<%--                                                            <option value="3">Nguyễn Xuân Nam</option>--%>
<%--                                                        </select>--%>
<%--                                                    </div>--%>
                                                    <div class="col-xs-2">
                                                        <label class="name">Nhân viên</label>
                                                        <form:select class="form-control" path="staffId">
                                                            <form:option value="">---Chọn Nhân Viên---</form:option>
                                                            <form:options items="${listStaffs}"/>
                                                        </form:select>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12">
                                                    <div class="col-xs-6">
                                                        <form:checkboxes items="${typeCodes}" path="typeCode"/>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12">
                                                    <div class="col-xs-6">
                                                        <button type="button" class="btn btn-xs btn-danger" id="btnSearchBuilding">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                                                            </svg>
                                                            Tìm Kiếm
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form:form>

                                </div>
                            </div>

                            <div class="pull-right">
                                <a href="/admin/building-edit">
                                    <button class="btn btn-info" title="Thêm tòa nhà">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building-add" viewBox="0 0 16 16">
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
                                            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1z"/>
                                            <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                        </svg>
                                    </button>
                                </a>

                                <button class="btn btn-danger" title="Xóa tòa nhà" id="btnDeleteBuilding">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building-dash" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1"/>
                                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1z"/>
                                        <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bảng danh sách -->
                <div class="row">
                    <div class="col-xs-12">
                        <table id="tableList" style="margin: 3em 0 0;" class="table table-striped table-bordered table-hover">
                            <thead>
<%--                            <tr>--%>
<%--                                <th class="center">--%>
<%--                                    <label class="pos-rel">--%>
<%--                                        <input type="checkbox" name="checkList" value="" class="ace">--%>
<%--                                        <span class="lbl"></span>--%>
<%--                                    </label>--%>
<%--                                </th>--%>
<%--                                <th>Tên tòa nhà</th>--%>
<%--                                <th>Địa chỉ</th>--%>
<%--                                <th>Số tầng hầm</th>--%>
<%--                                <th>Tên quản lý</th>--%>
<%--                                <th>Số điện thoại quản lý</th>--%>
<%--                                <th>D.Tích sàn</th>--%>
<%--                                <th>D.Tích trống</th>--%>
<%--                                <th>D.Tích thuê</th>--%>
<%--                                <th>Phí mô giới</th>--%>
<%--                                <th>Thao tác</th>--%>
<%--                            </tr>--%>
                            </thead>

                            <tbody>
<%--                            <c:forEach var="item" items="${buildingList}">--%>
<%--                                <tr>--%>
<%--                                    <td class="center">--%>
<%--                                        <label class="pos-rel">--%>
<%--                                            <input type="checkbox" class="ace" name="checkList" value="${item.id}">--%>
<%--                                            <span class="lbl"></span>--%>
<%--                                        </label>--%>
<%--                                    </td>--%>

<%--                                    <td>${item.name}</td>--%>
<%--                                    <td>${item.address}</td>--%>
<%--                                    <td>${item.numberOfBasement}</td>--%>
<%--                                    <td>${item.managerName}</td>--%>
<%--                                    <td>${item.managerPhone}</td>--%>
<%--                                    <td>${item.floorArea}</td>--%>
<%--                                    <td>${item.rentArea}</td>--%>
<%--                                    <td>${item.id}</td>--%>
<%--                                    <td>${item.id}</td>--%>

<%--                                    <td>--%>
<%--                                        <div class="hidden-sm hidden-xs btn-group">--%>
<%--                                            <button class="btn btn-xs btn-success" title="Giao tòa nhà" onclick="assignmentBuilding(${item.id})">--%>
<%--                                                <i class="ace-icon glyphicon glyphicon-list"></i>--%>
<%--                                            </button>--%>

<%--                                            <a class="btn btn-xs btn-info" title="Sửa tòa nhà" href="/admin/building-edit-${item.id}">--%>
<%--                                                <i class="ace-icon fa fa-pencil bigger-120"></i>--%>
<%--                                            </a>--%>

<%--                                            <button class="btn btn-xs btn-danger" title="Xóa tòa nhà" onclick="deleteBuilding(${item.id})">--%>
<%--                                                <i class="ace-icon fa fa-trash-o bigger-120"></i>--%>
<%--                                            </button>--%>
<%--                                        </div>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>
<%--                            </c:forEach>--%>
                                <form:form modelAttribute="buildingList">
                                    <display:table name="buildingList.listResult" cellspacing="0" cellpadding="0"
                                                   requestURI="${buildingListURL}" partialList="true" sort="external"
                                                   size="${buildingList.totalItems}" defaultsort="2" defaultorder="ascending"
                                                   id="tableList" pagesize="${buildingList.maxPageItems}"
                                                   export="false"
                                                   class="table table-fcv-ace table-striped table-bordered table-hover dataTable no-footer"
                                                   style="margin: 3em 0 1.5em;">

                                        <display:column title="<fieldset class='form-group'>
                                                                    <input type='checkbox' id='checkAll' class='check-box-element'/>
                                                                </fieldset>"
                                                        class="center select-cell"
                                                        headerClass="center select-cell">
                                            <fieldset>
                                                <input type="checkbox" name="checkList" value="${tableList.id}"
                                                       id="checkbox_${tableList.id}" class="check-box-element"/>
                                            </fieldset>
                                        </display:column>

                                        <display:column headerClass="text-left" property="name" title="Tên toà nhà"/>
                                        <display:column headerClass="text-left" property="address" title="Địa chỉ"/>
                                        <display:column headerClass="text-left" property="numberOfBasement" title="Số tầng hầm"/>
                                        <display:column headerClass="text-left" property="managerName" title="Tên quản lí"/>
                                        <display:column headerClass="text-left" property="managerPhone" title="SĐT quản lí"/>
                                        <display:column headerClass="text-left" property="floorArea" title="D.tích sàn"/>
                                        <display:column headerClass="text-left" property="rentArea" title="D.tích thuê"/>
                                        <display:column headerClass="text-left" property="rentPrice" title="Giá Thuê"/>
                                        <display:column headerClass="text-left" property="brokerageFee" title="Phí môi giới"/>

                                        <display:column headerClass="col-actions" title="Thao tác">
                                            <a title="Giao toà nhà" class="btn btn-xs btn-success" onclick="assignmentBuilding(${tableList.id});">
                                                <i class="ace-icon glyphicon glyphicon-list"></i>
                                            </a>

                                            <a class="btn btn-xs btn-info" title="Sửa tòa nhà"
                                               href='<c:url value="/admin/building-edit-${tableList.id}"/>'>
                                                <i class="ace-icon fa fa-pencil bigger-120"></i>
                                            </a>

                                            <a class="btn btn-xs btn-danger" title="Xóa tòa nhà" onclick="deleteBuilding(${tableList.id})">
                                                <i class="ace-icon fa fa-trash-o bigger-120"></i>
                                            </a>
                                        </display:column>
                                    </display:table>
                                </form:form>

                            </tbody>
                        </table>
                    </div><!-- /.span -->
                </div>

            </div><!-- /.page-content -->
        </div>
    </div><!-- /.main-content -->

    <div class="modal fade" id="assignmentBuildingModal" role="dialog" style="font-family: 'Times New Roman', Times, serif;">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Danh sách nhân viên</h4>
                </div>
                <div class="modal-body">
                    <table class="table table-striped table-bordered table-hover" id="staffList">
                        <thead>
                            <tr>
                                <th>Chọn</th>
                                <th>Tên nhân viên</th>
                            </tr>
                        </thead>

                        <tbody>
                        </tbody>
                    </table>
                    <input type="hidden" id="buildingId" name="buildingId" value="">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" id="btnassignmentBuilding">Giao tòa nhà</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        function assignmentBuilding(buildingId){
            $('#assignmentBuildingModal').modal();
            loadStaff(buildingId);
            $('#buildingId').val(buildingId);
        }

        function loadStaff(buildingId){
            $.ajax({
                type: "GET",
                url: "${buildingAPI}/" + buildingId + '/staffs',
                dataType: 'json',
                success: function (response) {
                    var row = '';
                    $.each(response.data, function (index,item){
                        row += '<tr>';
                        row += '<td class="text-center"><input type="checkbox" value="' + item.staffId + '" id="checkbox_' + item.staffId + '" class="check-box-element" ' + item.checked + '/></td>';
                        row += '<td class="text-center">' + item.fullName + '</td>';
                        row += '</tr>';
                    });
                    $('#staffList tbody').html(row);
                    console.info("Success");
                },
                error: function(response){
                    console.log("failed");
                    window.location.href = "<c:url value="/admin/building-list?message=error"/>";
                    console.log(response);
                }
            });
        }

        $('#btnassignmentBuilding').click(function (e) {
            e.preventDefault();
            var data = {};
            data['buildingId'] = $('#buildingId').val();
            var staffs = $('#staffList').find('tbody input[type = checkbox]:checked').map(function(){
                return $(this).val();
            }).get();
            data['staffs'] = staffs;
            if(data['staffs'] != ''){
                assignment(data);
            }
            console.log("ok");
        })

        function assignment(data){
            $.ajax({
                url: "${buildingAPI}/" + 'assignment',
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: 'json',
                success: function (response) {
                    console.info("Success");
                },
                error: function(response){
                    console.info("Giao Không Thành Công!");
                    window.location.href = "<c:url value="/admin/building-list?message=error"/>";
                    console.log(response);
                }
            });
        }

        $('#btnSearchBuilding').click(function (e){
            e.preventDefault();
            $('#listForm').submit();
        });

        function deleteBuilding(id){
            var buildingId = [id];
            deleteBuildings(buildingId);
        }

        $('#btnDeleteBuilding').click(function (e) {
            e.preventDefault();
            var data = {};
            var buildingIds = $('#tableList').find('tbody input[type = checkbox]:checked').map(function(){
                return $(this).val();
            }).get();
            deleteBuildings(buildingIds);
        })

        function deleteBuildings(data){
            window.location.reload(true);
            $.ajax({
                type: "Delete",
                url: "${buildingAPI}/" + data,
                data: JSON.stringify(data),
                contentType: "application/json",
                // dataType: "JSON",
                success: function () {
                    console.log("Success");
                },
                error: function(){
                    console.log("failed");
                    console.log(respond);
                }
            });
        }
    </script>

</body>
</html>
