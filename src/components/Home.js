const Home = () => {
  return (
    <>
      <div style={{ padding: "50px 0" }}>
        Website sử dụng API từ:{" "}
        <a href="https://reqres.in/" rel="noopener">
          https://reqres.in/
        </a>
        <ul style={{ marginTop: 10 }}>
          <h5>Account test</h5>
          <li>
            "email": <strong>eve.holt@reqres.in</strong>
          </li>
          <li>
            "password": <strong>cityslicka</strong>
          </li>
        </ul>
        <div style={{ marginTop: 20 }}>
          <h4>Các chức năng:</h4>
          <ol style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <li>Đăng nhập</li>
            <li>Thêm User</li>
            <li>Sửa User</li>
            <li>Xoá User</li>
            <li>Hiển thị tất cả các User</li>
            <li>Tìm kiếm User theo email</li>
            <li>Sắp xếp theo FistName</li>
            <li>Import User từ file .csv</li>
            <li>Export User từ file .csv</li>
            <li>Phân trang</li>
          </ol>
          <br />
          <h4>Công nghệ sử dụng</h4>
          <ul>
            <li>Redux</li>
            <li>Toastify library</li>
            <li>React-CSV library</li>
            <li>Lodash library</li>
            <li>React-BootStrap</li>
            <li>React-pagination</li>
            <li>Axios</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
