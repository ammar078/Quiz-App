import { Form, message, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addQuestionToExam, editQuestionById } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function AddEditQuestion({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
    selectedQuestion,
    setSelectedQuestion
}) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };

      let response
        if(selectedQuestion){
            response = await editQuestionById({
                ...requiredPayload,
                questionId: selectedQuestion._id
            })
        }
        else{
            response = await addQuestionToExam(requiredPayload);
        }
      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
      }
      setSelectedQuestion(null)
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={selectedQuestion ? "اضافة سؤال" : "Edit Question "}
      visible={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false)
        setSelectedQuestion(null)
      }}
    >
      <Form onFinish={onFinish} layout="vertical"
        initialValues={{
            name: selectedQuestion?.name,
            A: selectedQuestion?.options?.A,
            B: selectedQuestion?.options?.B,
            C: selectedQuestion?.options?.C,
            D: selectedQuestion?.options?.D,
            correctOption: selectedQuestion?.correctOption,
        }}
      >
        <div className="Questions"> 
        <Form.Item name="name" label="السؤال" rules={[{ required: true, message: 'يرجى إدخال السؤال' }]}>
  <input type="text" />
</Form.Item>

<Form.Item name="correctOption" label="الإجابة الصحيحة" rules={[{ required: true, message: 'يرجى اختيار الإجابة الصحيحة' }]}>
  <select>
    <option value="A">الخيار الاول</option>
    <option value="B">الخيار الثاني</option>
    <option value="C">الخيار الثالث</option>
    <option value="D">الخيار الرابع</option>
  </select>
</Form.Item>


        <div className="flex gap-3">
          <Form.Item name="A" label=" الخيار الاول" rules={[{ required:true, message: 'يرجى كتابة السؤال  '}]}>
            <input type="text" />
          </Form.Item>
          <Form.Item name="B" label="الخيار الثاني" rules={[{ required:true, message: 'يرجى كتابة السؤال  '}]}>
            <input type="text" />
          </Form.Item>
        </div>
        <div className="flex gap-3">
          <Form.Item name="C" label="الخيار الثالث" >
            <input type="text" />
          </Form.Item>
          <Form.Item name="D" label="الخيار الرابع" >
            <input type="text" />
          </Form.Item>
        </div>
        </div>
        <div className="flex justify-end mt-2 gap-3">
          <button
            className="primary-outlined-btn cursor-pointe"
            type="button"
            onClick={() => setShowAddEditQuestionModal(false)}
          >
            الغاء
          </button>
          <button className="primary-contained-btn cursor-pointe">اضافة</button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditQuestion;
