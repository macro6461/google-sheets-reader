import {useEffect, useState} from 'react';
import GSheetReader from "g-sheets-api";

const GoogleSheetReader = () => {

    const [results, setResults] = useState([]) 
    const [filters, setFilters] = useState({}) 
    const [sortBy, setSortBy] = useState({by: '', dir: true}) 
    const [filterEls, setFilterEls] = useState([]) 

    useEffect(()=>{
        GSheetReader(
            {
              sheetId: "1r5wsLD17WY8rH8K7TjH95sZrro1LAMzLAIbUehz89yU",
              sheetNumber: 1,
              returnAllResults: false
            },
            (results) => {
              setResults(results)
              var x = constructFilters(results, true)
              setFilterEls(x)
            },
            (error) => {
              alert(error)
            }
          );
    }, [])

    const onFilter = (filter, e) => {
      var x = {...filters}
      x[filter] = e.target.value
      setFilters(x)
    }

    const constructFilters = (results, init) =>{
      var map = {}

      results.forEach(x=>{
        Object.keys(x).forEach(y=>{
          map[y] = ''
        })
      })

      setFilters(map)

      if (init){
        return Object.keys(map)
      }
    }

    const onSort = (key, dir) =>{
      var sorter = {...sortBy}
      sorter['by'] = key
      sorter['dir'] = dir
      
    }

    var finalResults = results.filter(x=>{
      var returnItem = true
      for (var k in filters){
        if ((!x[k] && filters[k].length > 0) || (x[k] && x[k].toLowerCase().indexOf(filters[k].toLowerCase()) === -1)){
          returnItem = false
        }
      }
      return returnItem
    })

    return (<div>
      <div style={{textAlign: 'left'}}>
        {filterEls.map(filter=>{
          return <div style={{display: 'inline-block', margin: 10}}>{filter}: <input value={filters[filter]} onChange={(e)=>onFilter(filter, e)}/></div>
        })}
      </div>
      <button onClick={()=>constructFilters(results)}>clear filters</button>
      <table>
       <tr>
         {Object.keys(filters).map(header=>{
           return <td>
             <div>
             {header}
             <div className="chevronContainer">
              <span className="chevron top"/>
              <span className="chevron bottom"/>
             </div>
             </div>
            </td>
         })}
        </tr>
        {finalResults.map(result=>{
          return <tr>
            {Object.keys(filters).map(key=>{
              return <td>{result[key]}</td>
            })}
          </tr>
        })}
      </table>
    </div>)

}

export default GoogleSheetReader;
