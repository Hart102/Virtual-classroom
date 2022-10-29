
const FormTitle = ({Title, Text}) => {
  return (
    <div className="d-flex justify-content-around align-items-baseline px-4">
      <div className="text-center">
        <h4 className="h4 font-weight-bold text-uppercase text-success">{Title}</h4>
        <p className="text-capitalize text-success h5">{Text}</p>
      </div>
    </div>
  )
}

export default FormTitle