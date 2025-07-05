const Question = ({ questionIndex, question, description }) => {
  return (
    <div>
      <h1>
        {questionIndex}. {question}
      </h1>
      <h3>{description}</h3>
    </div>
  )
}

export default Question
