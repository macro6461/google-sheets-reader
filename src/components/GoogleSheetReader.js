import {useEffect, useState} from 'react';
import GSheetReader from "g-sheets-api";

const GoogleSheetReader = () => {

    const [results, setResults] = useState([]) 

    useEffect(()=>{
        GSheetReader(
            {
              sheetId: "1r5wsLD17WY8rH8K7TjH95sZrro1LAMzLAIbUehz89yU",
              sheetNumber: 1,
              returnAllResults: false
            },
            (results) => {
              setResults(results)
            },
            (error) => {
              alert(error)
            }
          );
    }, [])

    return (<div>
        {results.map(result=>{
            return <p>{result.Date}</p>
        })}
    </div>)

}

export default GoogleSheetReader;
