const Answer = ({ handleNext }) => {
  return (
    <div>
      <textarea rows={30} cols={130} />
      <br />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Answer;
