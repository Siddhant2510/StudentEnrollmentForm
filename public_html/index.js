var token = "90932522|-31949277278813104|90949179";
var DbName = "Student_DB";
var relName = "StudentData";
$("#save").attr("disabled", true);
$("#change").attr("disabled", true);
$("#reset").attr("disabled", true);
$("#fullName").attr("disabled", true);
$("#class").attr("disabled", true);
$("#birthDate").attr("disabled", true);
$("#address").attr("disabled", true);
$("#enrollDate").attr("disabled", true);
$("#rollNo").focus();
function createJsonString() {
    var jsonStrObj = {
        "rollNo": $("#rollNo").val()
    }
    var jsonString = JSON.stringify(jsonStrObj);
    return jsonString;
}
function fillFormWithFoundData(data) {
    $("#fullName").val(data.fullName);
    $("#class").val(data.class);
    $("#birthDate").val(data.birthDate);
    $("#address").val(data.address);
    $("#enrollDate").val(data.enrollDate);
}
function enableInput() {
    if ($("#rollNo").val() !== "") {
        $("#fullName").attr("disabled", false);
        $("#class").attr("disabled", false);
        $("#birthDate").attr("disabled", false);
        $("#address").attr("disabled", false);
        $("#enrollDate").attr("disabled", false);
    } else {
        $("#fullName").attr("disabled", true);
        $("#class").attr("disabled", true);
        $("#birthDate").attr("disabled", true);
        $("#address").attr("disabled", true);
        $("#enrollDate").attr("disabled", true);
    }
}
function checkRoll() {
    var jsonObjStr = createJsonString();
    var findReqStr = createFIND_ALL_RECORDSRequest(token, DbName, relName, jsonObjStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(findReqStr,
            "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({async: true});
    if (resultObj.status === 400) {
        $("#save").attr("disabled", false);
        $("#reset").attr("disabled", false);
    } else if (resultObj.status === 200) {
        fillFormWithFoundData(resultObj.data[0].record);
        $("#change").attr("disabled", false);
        $("#reset").attr("disabled", false);
    }
    $("#fullName").focus();
}
function validateAndGetFormData() {
    var rollNoVar = $("#rollNo").val();
    if (rollNoVar === "") {
        alert("Eoll No. is Required Value");
        $("#rollNo").focus();
        return "";
    }
    var fullNameVar = $("#fullName").val();
    if (fullNameVar === "") {
        alert("Student Name is Required Value");
        $("#fullName").focus();
        return "";
    }
    var classVar = $("#class").val();
    if (classVar === "") {
        alert("Class is Required Value");
        $("#class").focus();
        return "";
    }
    var birthDateVar = $("#birthDate").val();
    if (birthDateVar === "") {
        alert("Date of Birth is Required Value");
        $("#birthDate").focus();
        return "";
    }
    var addressVar = $("#address").val();
    if (addressVar === "") {
        alert("Address is Required Value");
        $("#address").focus();
        return "";
    }
    var enrollDateVar = $("#enrollDate").val();
    if (enrollDateVar === "") {
        alert("Enrollment Date is Required Value");
        $("#enrollDate").focus();
        return "";
    }
    var jsonStrObj = {
        rollNo: rollNoVar,
        fullName: fullNameVar,
        class: classVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollDate: enrollDateVar
    };
    return JSON.stringify(jsonStrObj);
}
function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollDate").val("");

    $("#rollNo").focus();
    $("#save").attr("disabled", true);
    $("#change").attr("disabled", true);
    $("#reset").attr("disabled", true);
    $("#fullName").attr("disabled", true);
    $("#class").attr("disabled", true);
    $("#birthDate").attr("disabled", true);
    $("#address").attr("disabled", true);
    $("#enrollDate").attr("disabled", true);
}
function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(token,
            jsonStr, DbName, relName);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    resetForm();
}
function changeData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        alert("Invalid data");
        return;
    }
    var setReqStr = createSETRequest(token,
            jsonStr, DbName, relName, "UPDATE", "rollNo");
    jQuery.ajaxSetup({async: false});

    var resultObj = executeCommandAtGivenBaseUrl(setReqStr,
            "http://api.login2explore.com:5577", "/api/iml/set");
    jQuery.ajaxSetup({async: true});
    resetForm();
}