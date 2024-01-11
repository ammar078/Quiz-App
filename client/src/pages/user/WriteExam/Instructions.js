import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-col gap-1">
        <h1 className="text-2xl underline text-primary">تعليمات</h1>
        <li>يجب إكمال الامتحان في {examData.duration} ثانية.</li>
        <li>
        سيتم تقديم الامتحان تلقائيًا بعد مرور {examData.duration}{" "}
          ثانية.
        </li>
        <li>بمجرد التسليم لا يمكنك تغيير إجاباتك.</li>
        <li>يرجى عدم تحديث الصفحة.</li>
        <li>
        يمكنك استخدام أزرار<span className="font-bold">"السابق"</span> و{" "}
          <span className="font-bold">"التالي"</span>  للتنقل بين الأسئلة
        </li>
        <li>
        إجمالي درجات الامتحان هو{" "}
          <span className="font-bold">{examData.totalMarks}</span>.
        </li>
        <li>
        الدرجات اللازمة للنجاح في الامتحان هي{" "}
          <span className="font-bold">{examData.passingMarks}</span>.
        </li>
      </ul>

      <div className="flex gap-2">
        <button className="primary-outlined-btn"
         onClick={()=>navigate('/')}
        >
              الغاء
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          بدء الامتحان
        </button>
      </div>
    </div>
  );
}

export default Instructions;
