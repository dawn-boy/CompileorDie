const Question = ({
  question,
  description,
  questionNumber,
  difficulty,
  starter_code,
  expected_output,
}) => {
  return (
    <div>
      <h1>
        {questionNumber + 1}. {question}
      </h1>
      <h3>{description}</h3>
      <span>Difficulty: {difficulty}</span>
      <pre>
        StarterCode:<code> {starter_code}</code>
      </pre>
      <div>Expected Output: {expected_output}</div>
    </div>
  )
}

export default Question
