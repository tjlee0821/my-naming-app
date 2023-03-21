import Head from 'next/head'
import {useState} from 'react'

export default function Home() {

  const [count, setCounter] = useState(0);
  const [animalInput, setAnimalInput] = useState("");

  async function onSubmit(e)  {      
        e.preventDefault()
        const response = await fetch("/api/generate",{
          method: "post",
          header: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            animal:animalInput
          }),
          
        })
        if(count ==10 ){
          return console.log('you have reached your limit');
        }    
        setCounter(count + 1);
        setAnimalInput("");
        console.log('It is submitted');
  }

  return (
    <>
    <div>
      <Head>
        <title>This is My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>This is My App</h1>
        <img src="/favicon.ico" />
        <h3>Name My Pet</h3>
        <p>You've used this app {count} times</p>
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
      </main>
      </div>
    </>
  )
}
