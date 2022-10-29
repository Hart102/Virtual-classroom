
const InputComponent = ({ btnText, onclick }) => {
  return (
    <div className="BtnComponent">
      <button className="btn font-weight-bold text-white btn-block mt-lg-0 mt-2 py-3 text-uppercase border-bottom shadow" onClick={onclick}>{btnText}</button>
    </div>
  )
}

export default InputComponent