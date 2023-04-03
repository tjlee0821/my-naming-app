import Head from 'next/head'
import {useState} from 'react'
import styles from "./index.module.css"

export default function Home() {

  const [count, setCounter] = useState(0);
  const [animalInput, setAnimalInput] = useState("");
  const [result,setResult] = useState();

  async function onSubmit(e)  {      
    try{
      e.preventDefault()
        const response = await fetch("/api/generate",{
          method: "post",
          header: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            animal:animalInput
          }),
          
        });

        const data = await response.json();
        if(response.status !==200){
          throw data.error || new Error('Request failed with status ${response.status}')

        }
        if(count ==10 ){
          return console.log('you have reached your limit');
        }    
        setCounter(count + 1);
        setAnimalInput("");
        console.log('It is submitted');
    }catch(e){
      console.error(e);
      alert(e.message);
    }
  }

  return (
    <>
    <div className={styles.body}>
      <Head>
        <title>This is My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <img src="/favicon.ico" className={styles.icon}/>
        <h3>Name My Pet</h3>
        <p>You&apos;ve used this app {count} times</p>
        <form onSubmit={onSubmit}>
          <input 
            type='text'
            name='animal'
            value={animalInput}
            onChange={(e)=>{
              {
                setAnimalInput(e.target.value);
                console.log(animalInput);
              }
            }}
            placeholder='Enter an animal'
          />

          <input type='submit'/>
        </form>
        <div className={styles.result}></div>
      </main>
      </div>
    </>
  )
}
