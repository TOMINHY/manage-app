import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalComfirm from "./ModalComfirm";
import _, { debounce } from "lodash";
import "./TableUser.scss";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

const TableUsers = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModaedit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [dataExport, setDataExport] = useState([]);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  useEffect(() => {
    // call api
    getUser(1);
  }, []);
  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUser(res.data);
    }
  };
  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };
  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
  };

  const handleChange = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getUser(1);
    }
  }, 500);

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv files...", {
          pauseOnHover: false,
          delay: false,
        });
        return;
      }
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format Header CSV file", {
                  pauseOnHover: false,
                  delay: false,
                });
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_nam = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setListUser(result);
              }
            } else {
              toast.error("Wrong format CSV file", {
                pauseOnHover: false,
                delay: false,
              });
            }
          } else
            toast.error("Not found data on CSV file!", {
              pauseOnHover: false,
              delay: false,
            });
        },
      });
    }
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <strong>List Users:</strong>
        </span>
        <div className="group-btns">
          <label htmlFor="import" className="btn btn-warning">
            <i className="fa-solid fa-file-import"></i>&nbsp;
            <span className="text-btn">Import</span>
          </label>
          <input
            type="file"
            id="import"
            hidden
            onChange={(event) => handleImportCSV(event)}
          />

          <CSVLink
            data={dataExport}
            filename={"user.csv"}
            asyncOnClick={true}
            onClick={getUsersExport}
            className="btn btn-primary"
          >
            <i className="fa-solid fa-download"></i>&nbsp;
            <span className="text-btn">Export</span>
          </CSVLink>
          <button
            className="btn btn-success button-add-new"
            onClick={() => {
              setIsShowModalAddNew(true);
            }}
          >
            <i className="fa-solid fa-circle-plus"></i>&nbsp;
            <span className="text-btn">Add new</span>
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search user by email..."
          onChange={(event) => handleChange(event)}
        />
      </div>
      <div className="customize-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className="sort-header">
                  <span className="table-header">ID</span>
                  <span className="sort-header-icons">
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort("desc", "id")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort("asc", "id")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <span className="table-header">Email</span>
              </th>
              <th>
                <div className="sort-header">
                  <span className="table-header">First Name</span>
                  <span className="sort-header-icons">
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort("desc", "first_name")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort("asc", "first_name")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <span className="table-header">Last Name</span>
              </th>
              <th>
                <span className="table-header">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((item) => {
                return (
                  <tr key={item?.id}>
                    <td>{item?.id}</td>
                    <td>{item?.email}</td>
                    <td>{item?.first_name}</td>
                    <td>{item?.last_name}</td>
                    <td>
                      <div className="btn-actions">
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEditUser(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        //
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModaedit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalComfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};
export default TableUsers;
