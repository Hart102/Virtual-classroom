
const FormTitle = ({Title, Text}) => {
  return (
    <div className="d-flex justify-content-around align-items-baseline px-4">
      <div className="text-center">
        <p className="text-uppercase text-dark h6">{Title}</p>
        <b className="text-dark h6">{Text}</b>
      </div>
    </div>
  )
}

export default FormTitle