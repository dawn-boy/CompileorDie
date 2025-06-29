import Question from './Question.jsx';
import Answer from './Answer.jsx';
import { useNavigate } from 'react-router-dom';

const UserInput = ({ questionIndex, question, description }) => {
  const navigate = useNavigate();
  function handleNext() {
    navigate('/loading', { replace: true });
  }
  return (
    <div>
      <Question
        questionIndex={questionIndex}
        question={question}
        description={description}
      />
      <Answer handleNext={handleNext} />
    </div>
  );
};

export default UserInput;
