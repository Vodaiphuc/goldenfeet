const host = "http://localhost:8080/rest";
const app = angular.module("AdminApp", []);
app.controller("AdminCtrl", function ($scope, $http) {
    //Checklogin
    let sessionLogin = sessionStorage.getItem("User");
    if (sessionLogin != null) {
        const urlTaiKhoan = `${host}/khachhang/${sessionLogin}`;
        $http.get(urlTaiKhoan).then(resp => {
            if (resp.data.quyen.maQuyen == 1) {
                location.replace("/login?loginStatus=" + false);
                $scope.disableKhachHang=true;
            } else if (resp.data.quyen.maQuyen == 2) {
                $scope.disableKhachHang=true;
                $scope.username = sessionLogin;
                $scope.login = true;
            } else {
                $scope.disableKhachHang=false;
                $scope.username = sessionLogin;
                $scope.login = true;
            }
        });

    } else {
        $scope.login = false;
        location.replace("/login?loginStatus=" + false);
    }
    $scope.logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        location.replace("/login");
    };
    $scope.listGiay = [];
    $scope.srcImage = `http://localhost:8080/rest/files/images`;
    $scope.tenGiay="";
    $scope.load_all = function () {
        const url = `${host}/giay`;
        $http.get(url).then((resp) => {
            $scope.listGiay = resp.data;
            console.log("Sucsess", resp.data);
            $scope.pageNumber = 1;
            $scope.limit = 8;
            $scope.totalPage = getTotalPage($scope.listGiay, $scope.limit);
        })
    }
    $scope.search=(text)=>{
        $scope.tenGiay=text;
        const url = `${host}/searchgiay/${$scope.tenGiay}`;
        $http.get(url).then((resp) => {
            $scope.listGiay = resp.data;
            console.log("Sucsess", resp.data);
            $scope.pageNumber = 1;
            $scope.limit = 8;
            $scope.totalPage = getTotalPage($scope.listGiay, $scope.limit);
        })
    }
    $scope.setLimit = (soSanPham) => {
        $scope.pageNumber = 1;
        $scope.limit = soSanPham;
        $scope.totalPage = getTotalPage($scope.listGiay, $scope.limit);
    };
    $scope.setPageNumber = (pageNumber) => {
        $scope.pageNumber = pageNumber;
    };
    $scope.next = () => {
        if ($scope.pageNumber < $scope.totalPage) {
            $scope.pageNumber++;
        } else {
            $scope.pageNumber = 1;
        }
    };
    const getTotalPage = (arr, soSanPham) => {
        return Math.ceil(arr.length / soSanPham);
    };
    $scope.deleteGiay = (id) => {
        // const urlDanhGia = `${host}/danhgia/${id}`;
        // $http.delete(urlDanhGia).then(resp => {

        // })
        const urlGiay = `${host}/giay/${id}`;
        $http.delete(urlGiay).then(resp => {
            alert("Xóa thành công!");
            location.replace("/admin/index")
        })
    }
    $scope.load_all();
    $scope.detail = (id) => {
        location.replace("/admin/detail?idGiay=" + id);
    }
});
app.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});