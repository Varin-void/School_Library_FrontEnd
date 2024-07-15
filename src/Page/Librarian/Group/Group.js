import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Dropdown, DropdownButton, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import GroupDetail from '../../../Component/Group/GroupDetail';
import API from '../../../Ultils/API/API';
import { GROUP_DELETE, GROUP_URL } from '../../../Ultils/API/URL';
import { useSelector } from 'react-redux';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import GroupModal from '../../../Component/Group/GroupModal';
import MLoading from '../../../Component/MLoading';
import ViewObjectModel from '../../../Component/Group/ViewObjectModel';

export default function Group({ Assign }) {
  const [ViewModalShow, setViewModalShow] = useState(false);
  const [ViewDataModal, setViewDataModal] = useState({
    ID: "",
    Type: ""
  });
  const [Edit, setEdit] = useState("");
  const [Loading, setLoading] = useState(false);
  const token = useSelector(state => state.token);
  const [ModelShow, setModelShow] = useState(false);
  const [Sorter, setSorter] = useState("desc");
  const [ComboBoxTitle, setComboBoxTitle] = useState("DESC");
  const [Search, setSearch] = useState("");
  const [Data, setData] = useState([]);
  useEffect(() => {
    if (token !== "") {
      const params = {
        apiToken: token
      }
      try {
        setLoading(true);
        API.POST(GROUP_URL, params)
          .then(res => {
            setLoading(false);
            if (res.status === 1) {
              setData([...res.data]);
            }
          })
          .catch(err => {
            setLoading(false);
            DSweetAlert.ShowError(err);
          });
      }
      catch {
        setLoading(false);
        DSweetAlert.ShowError("Internal Server Error");
      }
    }
  }, [token])

  const GetData = (RESET, Sort) => {
    var params = {
      apiToken: token,
      name: "",
      sort: Sorter
    }
    if (RESET === undefined) {
      params.name = Search;
    }
    if (Sort !== undefined) {
      params.sort = Sort;
    }
    try {
      setLoading(true);
      API.POST(GROUP_URL, params)
        .then(res => {
          setLoading(false);
          if (res.status === 1) {
            setData([...res.data]);
          }
        })
        .catch(err => {
          setLoading(false);
          DSweetAlert.ShowError(err);
        });
    }
    catch {
      setLoading(false);
      DSweetAlert.ShowError("Internal Server Error");
    }
  }
  const HandleEdit = (id) => {
    setEdit("" + id);
    setModelShow(true);
  }
  const HandleDelete = (id) => {
    DSweetAlert.ShowConfirm("Are you sure you want to delete this?", () => {
      const params = {
        "apiToken": token,
        "id": "" + id
      }
      try {
        setLoading(true);
        API.POST(GROUP_DELETE, params)
          .then(res => {
            setLoading(false);
            if (res.status === 1) {
              DSweetAlert.ShowSuccess(res.message, () => {
                GetData();
              });
            } else {
              DSweetAlert.ShowError(res.message);
            }
          }).catch(err => {
            setLoading(false);
            DSweetAlert.ShowError(err);
          });
      }
      catch {
        setLoading(false);
        DSweetAlert.ShowError("Internal Server Error");
      }
    })

  }
  const HandleView = (ID, Type) => {
    setViewModalShow(true);
    setViewDataModal({
      ID: "" + ID,
      Type: Type
    });
  }
  return (
    <div className={(Assign === undefined && 'R-Shadow') + ' h-100'}>
      <Card className={(Assign === undefined && 'p-5 ') + ' h-100'}>
        {
          Assign === undefined &&
          <CardHeader className='bg-white'>
            <h2 className='text-center text-primary'>
              <strong>
                GROUP
              </strong>
            </h2>
          </CardHeader>
        }
        <CardBody>
          <div>
            <Row>
              <Col lg={9} sm={12}>
                <InputGroup>
                  <InputGroupText className='p-0 m-0' style={{ width: "120px" }}>
                    <DropdownButton id="dropdown-basic-button" title={ComboBoxTitle}>
                      <Dropdown.Item eventKey={"desc"} onClick={() => { setComboBoxTitle("DESC"); setSorter("desc"); GetData(undefined, "desc"); }} ><strong>DESC</strong></Dropdown.Item>
                      <Dropdown.Item eventKey={"asc"} onClick={() => { setComboBoxTitle("ASC"); setSorter("asc"); GetData(undefined, "asc"); }} ><strong>ASC</strong></Dropdown.Item>
                    </DropdownButton>
                  </InputGroupText>
                  <FloatingLabel controlId='floatingUsername' label="Name">
                    <Form.Control onKeyDown={event => (event.key === "Enter") && GetData()} type='text' placeholder='Name' value={Search} onChange={(e) => { setSearch(e.target.value) }}></Form.Control>
                  </FloatingLabel>
                </InputGroup>
              </Col>
              <Col lg={3} sm={12}>
                <ButtonGroup className='w-100 h-100 border-0 mt-lg-0 mt-3'>
                  <Button className='bg-primary border-0 w-25' onClick={() => { GetData() }}>
                    <strong>SEARCH</strong>
                  </Button>
                  <Button className='bg-danger border-0 w-25' onClick={() => { GetData(true); setSearch(""); }}>
                    <strong>RESET</strong>
                  </Button>
                  {
                    Assign === undefined &&
                    <Button className='bg-success border-0 w-25' onClick={() => { setModelShow(true); setEdit(""); }}>
                      <strong>ADD</strong>
                    </Button>
                  }
                </ButtonGroup>
              </Col>
            </Row>
          </div>
          <div className='mt-5'>
            <div style={{ overflowY: "scroll", maxHeight: "400px" }}>
              <div className="position-sticky top-0 bg-white" style={{ zIndex: "1" }}>
                <GroupDetail value={""} id={"ID"} Name={"Name"} TeacherCount={"Teachers"} BookCount={"Books"} StudentCount={"Students"} Row={false} />
              </div>
              {Data.map((item, index) => {
                return (
                  <div key={item.id}>
                    {
                      Assign !== undefined ?
                        <GroupDetail GetData={GetData} NotAssignYet={(item[Assign.Role.toLowerCase() + 's'].filter(user => user.id + "" === Assign.ID).length === 0) && true} Assign={Assign} value={index + 1} id={item.id} Name={item.name} TeacherCount={item.teachers.length} BookCount={item.books.length} StudentCount={item.students.length} HandleView={HandleView} HandleDelete={HandleDelete} HandleEdit={HandleEdit} Row={true} />
                        :
                        <GroupDetail NotAssignYet={false} Assign={Assign} value={index + 1} id={item.id} Name={item.name} TeacherCount={item.teachers.length} BookCount={item.books.length} StudentCount={item.students.length} HandleView={HandleView} HandleDelete={HandleDelete} HandleEdit={HandleEdit} Row={true} />
                    }
                  </div>
                )
              })}
            </div>
          </div>
        </CardBody>
      </Card>
      {
        Assign === undefined &&
        < ViewObjectModel ViewDataModal={ViewDataModal} show={ViewModalShow} onHide={() => { setViewModalShow(false); GetData(); }} />
      }
      {
        Assign === undefined &&
        <GroupModal Edit={Edit} show={ModelShow} onHide={() => { setModelShow(false); GetData(); }} />
      }
      {Loading && <MLoading />}
    </div >
  )
}
