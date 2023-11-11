import chick from 'images/ch01_yellow.jpg'


export default function abc() {

  //const chick = 'client/public/images/ch01_yellow.jpg'

  return (
    <div className="App">
      <div className="top-box">
        <div className="text-box">
          <h1>TitleTitle</h1>
          
        </div>
      </div>
      <div className="centered-box">
        <img src={chick} alt="chick" style={{ width: '50px', height: 'auto'}}/>
      </div>
    </div>
  )
}


