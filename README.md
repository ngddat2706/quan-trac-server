# quan-trac-server
* index.js - Tệp này về cơ bản sẽ là khai báo của ứng dụng Express 
* configs - File này dùng cấu hình cho các API / dịch vụ của bên thứ ba
         như passport / S3, v.v. Những thông số như keyAPI các kiểu
* routes - Thư mục này sẽ chứa tất cả các tuyến đường đã tạo bằng 
        cách sử dụng Express Router và kết hợp với Controllers
* controllers - Thư mục này sẽ chứa tất cả các chức năng để viết các API
* services - Thư mục này sẽ chứa tất cả các logic của các chức năng 
            trong Controller
* models - Thư mục này sẽ chứa tất cả các files như schema 
        và các chức năng cần thiết cho schema cũng sẽ nằm ở đây.
* middleware - Thư mục này sẽ chứa tất cả phần mềm trung gian,
        ví dụ như là xác thực