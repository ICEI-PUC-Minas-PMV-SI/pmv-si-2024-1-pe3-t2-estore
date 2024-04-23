const Inputs = ({ label, ...rest }) => {
  console.log(label);
  return (
    <>
      {label && <label>{label}</label>}

      <input {...rest}></input>
    </>
  );
};

export default Inputs;
