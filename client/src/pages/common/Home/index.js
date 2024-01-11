import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <div className=" text-center">
        <PageTitle title={`اهلا ${user.name} مرحبا بك في "اسئلني"`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]}>
          {exams.map((exam) => (
            <Col span={6}>
              
              <div className="card-lg flex flex-col gap-1 p-2">
                <h1 className="text-2xl text-primary fw-bold">{exam?.name}</h1>
                <div className="bg-secondary p-3 ">
                <h1 className="text-md">المادة : <span className="text-primary fw-bold">{exam.category}</span></h1>

                <h1 className="text-md m-1">الدرجة الاجمالية : <span className="text-primary fw-bold">{exam.totalMarks}</span></h1>
                <h1 className="text-md m-1" >درجة النجاح : <span className="text-primary fw-bold">{exam.passingMarks}</span></h1>
                <h1 className="text-md">الوقت (ث) : <span className="text-primary fw-bold">{exam.duration}</span></h1>
                  </div>
                <button
                  className="primary-outlined-btn cursor-pointe fw-bold bg-secondary"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  بدء الامتحان
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;
