import {
  useState, useEffect,
} from "react"
import './App.css'


export default function App() {
  const [resultado, setResultado] = useState('');
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);

  /*
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:7017/clasificador', {
      method: 'POST',
      body: JSON.stringify({ 'texto': '{{texto}}' }),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setResultado(data);
      })
      .finally(() => setLoading(false));
  },[])
  */

  const handleSubmit = (e) => {

    e.preventDefault();

    const ingreso = { texto };
    setLoading(true);
    fetch('http://localhost:7017/clasificador', {
      method: 'POST',
      body: JSON.stringify(ingreso),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setResultado(data);
      })
      .finally(() => setLoading(false));
  }


  return (
    <>
      <div className="container">
        <h1>Clasificador de texto</h1>
        <p>A continuación, ingrese el texto que desee clasificar:</p>
      </div>

      <div className='container-form'>
        <form onSubmit={handleSubmit}>
          <textarea placeholder='Ingrese su texto' required value={texto} onChange={(e) => setTexto(e.target.value)}></textarea>
          <input type='submit' value='Clasificar'></input>
        </form>
        <h3>Resultado:</h3>
        {!loading && <textarea readOnly value={resultado['label']} disabled></textarea>}
        {!loading && <textarea readOnly value={resultado['score']} disabled></textarea>}
        {loading && <textarea readOnly disabled></textarea>}
      </div>
    </>
  );
}










