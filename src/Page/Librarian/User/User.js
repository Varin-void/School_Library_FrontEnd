import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import API from '../../../Ultils/API/API';
import { USER_DELETE, USER_GET_ALL, USER_SEARCH } from '../../../Ultils/API/URL';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Dropdown, DropdownButton, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import UserDetail from '../../../Component/User/UserDetail';
import { useNavigate } from 'react-router-dom';
import MLoading from '../../../Component/MLoading';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import UserObjectModal from '../../../Component/User/UserObjectModal';

export default function LibrarianScreen() {
  const token = useSelector(state => state.token);
  const Admin = useSelector(state => state.User);
  const [Loading, setLoading] = useState(false);
  const [ComboBoxTitle, setComboBoxTitle] = useState("All");
  const [Data, setData] = useState([]);
  const [Search, setSearch] = useState("");
  const [Role, setRole] = useState(0);
  const Navigate = useNavigate();
  const [ModalShow, setModalShow] = useState(false);
  const [ViewDataModal, setViewDataModal] = useState({
    ID: "8",
    Username: "Damon",
    Role: "Teacher"
  });

  useEffect(() => {
    if (token !== "") {
      try {
        setLoading(true);
        const param = { apiToken: token }
        API.POST(USER_GET_ALL, param)
          .then(res => {
            setLoading(false);
            res.data.forEach((item, index) => {
              res.data[index].Role = item.role.name;
            })
            setData([...res.data]);
          })
          .catch(error => {
            setLoading(false);
            DSweetAlert.ShowError(error)
          });
      }
      catch {
        setLoading(false);
        DSweetAlert.ShowError("Internal Server Error");
      }
    }
  }, [token])

  const getdata = (RESET, id) => {
    try {
      setLoading(true);
      const param = {
        apiToken: token,
        "username": "",
        "roleId": null,
      }

      if (RESET === undefined) {
        param.username = Search;
        if (id === undefined) {
          if (Role !== 0) {
            param.roleId = "" + Role;
          }
        } else {
          if (id !== 0) {
            param.roleId = "" + id;
          }
        }
      } else {
        setSearch("");
        setRole(0);
        setComboBoxTitle("All");
      }
      API.POST(USER_SEARCH, param)
        .then(res => {
          setLoading(false);
          res.data.forEach((item, index) => {
            res.data[index].Role = item.role.name;
          })
          setData([...res.data]);
        })
        .catch(error => {
          setLoading(false);
          DSweetAlert.ShowError(error)
        });
    }
    catch {
      setLoading(false);
      DSweetAlert.ShowError("Internal Server Error");
    }
  }
  const HandleEdit = (UserId) => {
    Navigate(`/Librarian/User-Edit/${UserId}`, {
      state: {
        userId: UserId,
      }
    });
  }
  const HandleAdd = () => {
    Navigate('/Librarian/User-Form');
  }
  const HandleDelete = (UserId) => {
    try {
      const params = {
        "apiToken": token,
        "id": "" + UserId
      };
      DSweetAlert.ShowConfirm("Are you sure you want to delete this?", () => {
        setLoading(true);
        API.POST(USER_DELETE, params)
          .then(res => {
            setLoading(false);
            if (res.status === 1) {
              DSweetAlert.ShowSuccess(res.message, () => {
                getdata();
              });
            } else {
              DSweetAlert.ShowError(res.message);
            }
          })
          .catch(error => {
            setLoading(false);
            DSweetAlert.ShowError(error);
          });
      })
    } catch {
      setLoading(false);
      DSweetAlert.ShowError("Internal Server Error");
    }
  }
  const HandleChangeRole = (id, Name) => {
    setComboBoxTitle(Name);
    setRole(id);
    getdata(undefined, id);
  }
  const HandleAssign = (id, username, Role) => {
    setViewDataModal({
      ID: "" + id,
      Username: "" + username,
      Role: "" + Role
    });
    setModalShow(true);
  }
  return (
    <div className='R-Shadow'>
      <Card className='p-5'>
        <CardHeader className='bg-white'>
          <h2 className='text-center text-primary'>USER</h2>
        </CardHeader>
        <CardBody>
          <div>
            <Row>
              <Col lg={9} sm={12}>
                <InputGroup>
                  <InputGroupText className='bg-primary p-0 m-0' style={{ width: "120px" }}>
                    <DropdownButton id="dropdown-basic-button" title={ComboBoxTitle}>
                      <Dropdown.Item className='w-100' eventKey={0} onClick={() => { HandleChangeRole(0, "All") }}>All</Dropdown.Item>
                      <Dropdown.Item className='w-100' eventKey={1} onClick={() => { HandleChangeRole(1, "Librarian") }}>Librarian</Dropdown.Item>
                      <Dropdown.Item className='w-100' eventKey={2} onClick={() => { HandleChangeRole(2, "Teacher") }}>Teacher</Dropdown.Item>
                      <Dropdown.Item className='w-100' eventKey={3} onClick={() => { HandleChangeRole(3, "Student") }}>Student</Dropdown.Item>
                    </DropdownButton>
                  </InputGroupText>
                  <FloatingLabel controlId="floatingUsername" label="Username">
                    <Form.Control  onKeyDown={event => (event.key === "Enter") && getdata()} type="text" placeholder="Username" value={Search} onChange={(e) => { setSearch(e.target.value) }} />
                  </FloatingLabel>
                </InputGroup>
              </Col>
              <Col lg={3}>
                <ButtonGroup className='h-100 w-100 border-0 mt-lg-0 mt-3'>
                  <Button className='bg-primary w-25' onClick={() => { getdata() }}>
                    <strong>SEARCH</strong>
                  </Button>
                  <Button className='bg-danger w-25 border-0' onClick={() => { getdata(true) }}>
                    <strong>RESET</strong>
                  </Button>
                  <Button className='bg-success w-25 border-0' onClick={HandleAdd}>
                    <strong>ADD</strong>
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </div>
          <div className='mt-5' style={{ height: "400px", overflowY: "scroll" }}>
            {Data.map((item, index) => {
              return (
                <div key={item.id}>
                  <UserDetail HandleAssign={HandleAssign} value={index + 1} {...item} HandleEdit={HandleEdit} HandleDelete={Admin.id !== item.id ? HandleDelete : false} />
                </div>
              )
            })}
          </div>
        </CardBody>
      </Card>
      {Loading && <MLoading />}
      <UserObjectModal ViewDataModal={ViewDataModal} show={ModalShow} onHide={() => { setModalShow(false) }} />
    </div>
  )
}

//FormData
//FromForm in backend
//IFormFile