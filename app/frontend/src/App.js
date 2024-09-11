import './App.css';
import { useState } from 'react'
import axios from 'axios'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
      </header>
    </div>
  );
}

function Form() {
  const [url, setUrl] = useState('')
  const [qrCode, setQrCode] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    url && axios.post('/api/generate-qr', { url })
      .then(response => {
        setQrCode(response.data.qrCode);
        console.log(response.data);
      })
      .catch(err => {
        console.log("There was an eror: ", err);
      })
  }

  function handleChange(e) {
    setUrl(e.target.value)
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='url'>Enter URL</label>
          <br />
          <input type='text' value={url} name='url' onChange={handleChange} />
          <br />
          <Button>Generate QR</Button>
        </form>

        {qrCode && (
          <div>
            <h3>QR Code:</h3>
            <img src={qrCode} alt="Generated QR Code" />
            <br />
            {/* Download Button */}
            <a href={qrCode} download="qr-code.png">
              {/* <button className='botao'>Download QR Code</button> */}
              <Button>Download QR</Button>
            </a>
          </div>
        )}
      </div>
    </>
  )
}

function Button({ children }) {
  return (
    <button className='botao'>
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mysvg"><g id="SVGRepo_bgCarrier" stroke-width="0">
      </g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
          <g id="Interface / Download">
            <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#f1f1f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </g> </g>
      </svg>
      <span class="texto">{children}</span>
    </button>
  )
}

export default App;