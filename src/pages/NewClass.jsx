
const NewClass = () => {
  return (
    <section style={{background: '#e5e4f3', width: '100%', height: '100vh', position: 'relative'}}>
        {/*----- White board ----- */}
        <div className="board bg-white shadow" 
        style={{width: '90%', height: '80%', position: 'absolute', left: '5%', top: '2%'}}></div>

        {/*--------- Menu --------- */}
        <div className="side-menu bg-white shadow-sm d-flex justify-content-center p-4" 
        style={{width: '90%', height: '17%', position: 'absolute', left: '5%', bottom: '0'}}>
            <ul className="list-unstyled d-flex justify-content-center">
                <li className="m-4">
                    <i className="fa fa-microphone fa-2x"></i>
                </li>
                <li className="m-4">
                    <i className="fa fa-pencil fa-2x text-dark"></i>
                </li>
            </ul>
        </div>
    </section>
  )
}

export default NewClass