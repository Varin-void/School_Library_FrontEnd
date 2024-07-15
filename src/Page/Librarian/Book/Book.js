import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Dropdown, DropdownButton, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import BookDetail from '../../../Component/BookDetail';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../../../Ultils/API/API';
import { BOOK_DELETE, BOOK_URL } from '../../../Ultils/API/URL';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import MLoading from '../../../Component/MLoading';

export default function LibrarianBook({ Assign }) {
  const Navigate = useNavigate();
  const token = useSelector(state => state.token);
  const [Search, setSearch] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Sorter, setSorter] = useState("desc");
  const [ComboBoxTitle, setComboBoxTitle] = useState("DESC");
  const [Data, setData] = useState([]);
  const HandleSort = (value, Title) => {
    setComboBoxTitle(Title);
    setSorter(value);
  }
  useEffect(() => {
    if (token !== '') {
      try {
        API.POST(BOOK_URL, { apiToken: token, search: "", sort: "desc" })
          .then(res => {
            if (res.status === 1) {
              setData([...res.data]);
            } else {
              DSweetAlert.ShowError(res.message);
            }
          })
          .catch(err => {
            DSweetAlert.ShowError(err);
          })
      } catch {
        DSweetAlert.ShowError("Internal Server Error");
      }
    }
  }, [token])

  const GetData = (RESET, SorterCheck) => {
    try {
      setLoading(true);
      var params = {
        apiToken: token,
        search: "",
        sort: "desc"
      }
      if (RESET === undefined) {
        params.search = Search;
      }
      if (SorterCheck !== undefined) {
        params.sort = SorterCheck;
      } else {
        params.sort = Sorter;
      }
      API.POST(BOOK_URL, params)
        .then(res => {
          setLoading(false);
          if (res.status === 1) {
            setData([...res.data]);
          } else {
            DSweetAlert.ShowError(res.message);
          }
        })
        .catch(err => {
          setLoading(false);
          DSweetAlert.ShowError(err);
        })
    } catch {
      setLoading(false);
      DSweetAlert.ShowError("Internal Server Error");
    }
  }

  const HandleEdit = (id) => {
    Navigate(`/Librarian/Book-Edit/${id}`, { state: { id: id } });
  }
  const HandleDelete = (id) => {
    DSweetAlert.ShowConfirm("You are about to delete this!", () => {
      try {
        setLoading(true);
        const params = {
          "apiToken": token,
          "id": "" + id
        };
        API.POST(BOOK_DELETE, params)
          .then(res => {
            setLoading(false);
            if (res.status === 1) {
              DSweetAlert.ShowSuccess(res.message, () => {
                GetData();
              });
            } else {
              DSweetAlert.ShowError(res.message);
            }
          })
          .catch(err => {
            setLoading(false);
            DSweetAlert.ShowError(err);
          })
      }
      catch {
        setLoading(false);
        DSweetAlert.ShowSuccess("Internal Server Error");
      }
    });
  }

  const HandleAdd = () => {
    Navigate("/Librarian/Book-Form");
  }
  return (
    <div className={'h-100 ' + Assign ? "" : "R-Shadow"}>
      <Card className='p-5 h-100'>
        <CardHeader className='bg-white'>
          <h2 className='text-center text-primary'>BOOK</h2>
        </CardHeader>
        <CardBody>
          <div>
            <Row>
              <Col lg={9} sm={12}>
                <InputGroup>
                  <InputGroupText className='bg-primary p-0 m-0' style={{ width: "120px" }}>
                    <DropdownButton id="dropdown-basic-button" title={ComboBoxTitle}>
                      <Dropdown.Item eventKey={"desc"} onClick={() => { HandleSort("desc", "DESC"); GetData(undefined, "desc"); }} className='w-100'><strong>DESC</strong></Dropdown.Item>
                      <Dropdown.Item eventKey={"asc"} onClick={() => { HandleSort("asc", "ASC"); GetData(undefined, "asc"); }} className='w-100'><strong>ACS</strong></Dropdown.Item>
                    </DropdownButton>
                  </InputGroupText>
                  <FloatingLabel controlId="floatingTitle" label="Title">
                    <Form.Control onKeyDown={event => event.key === "Enter" && GetData()} type='text' placeholder='Title' value={Search} onChange={(e) => { setSearch(e.target.value); }}>
                    </Form.Control>
                  </FloatingLabel>
                </InputGroup>
              </Col>
              <Col lg={3}>
                <ButtonGroup className='h-100 w-100 border-0 mt-lg-0 mt-3'>
                  <Button className='bg-primary w-25' onClick={() => { GetData() }}>
                    <strong>
                      SEARCH
                    </strong>
                  </Button>
                  <Button className='bg-danger w-25 border-0' onClick={() => { GetData(true); setSearch(""); }}>
                    <strong>
                      RESET
                    </strong>
                  </Button>
                  {Assign ? "" :
                    <Button className='bg-success w-25 border-0' onClick={() => { HandleAdd(); }}>
                      <strong>
                        ADD
                      </strong>
                    </Button>
                  }
                </ButtonGroup>
              </Col>
            </Row>
          </div>
          <div className='mt-5' style={{ height: "400px", overflowY: "scroll" }}>
            <div className='position-sticky top-0 bg-white'>
              <BookDetail IsRow={false} value={""} title={"Title"} author={"Author"} description={"Description"} HandleEdit={HandleEdit} HandleDelete={HandleDelete} />
            </div>
            {Data.map((item, index) => {
              return <div key={item.id}>
                {Assign ?
                  <BookDetail GetData={GetData} InGroup={item.groups.includes(Assign.GroupId) === true ? true : false} Assign={Assign} IsRow={true} value={index + 1}  {...item} HandleEdit={HandleEdit} HandleDelete={HandleDelete} />
                  :
                  <BookDetail InGroup={undefined} Assign={Assign} IsRow={true} value={index + 1}  {...item} HandleEdit={HandleEdit} HandleDelete={HandleDelete} />
                }
              </div>
            })}
          </div>
        </CardBody>
      </Card>
      {Loading && <MLoading />}
    </div>
  )
}
