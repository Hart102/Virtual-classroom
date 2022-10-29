const InputField = ({name, id, image, onchange}) => {
  return (

    <div className="input-field d-flex mt-3">
        <div className="form-icon">
          <img src={image}  />
        </div>

        <div className="input-field-container ml-2">
          <label htmlFor={name} className='text-capitalize'>{name}</label>
          <input name={name} id={id} type="text"  className="form-control p-0" onChange={onchange}/>
        </div>
    </div>
  )
}

export default InputField