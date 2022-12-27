const InputField = ({type, name, id, image, onchange, display, viewPassword, placeholder}) => {

  return (

    <div className="input-field d-flex align-items-center my-5 shadow-sm border-bottom px-4">
          <input name={name} id={id} type={type}  className="form-control py-3 col-md-10" onChange={onchange} placeholder={placeholder}/>
          <i className="fa fa-eye" style={{display: `${display}`}} onClick={viewPassword}></i>
    </div>
  )
}

export default InputField