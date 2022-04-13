import React from "react"
import Table from "../components/table"
import {MdKeyboardArrowDown,MdKeyboardArrowRight} from "react-icons/md"
import PreviousMap from "postcss/lib/previous-map"

const GridPage = () =>{

    const exampleData = React.useMemo(() => makeData(5, 5, 5), [])
    console.log("example data")
    console.log(exampleData)

    const processData = React.useMemo(() => [{
        id: 1,
        name: "Seed 1 Fermenter",
        duration: "3 days",
        status: "single",
        resources: "steam",
        subRows: [
            {
                id: 2,
                name: "CIP",
                duration: "2 hours",
                status: "single",
                resources: "steam"
            },
            {
                id: 3,
                name: "SIP",
                duration: "3 hours",
                status: "single",
                resources: "Steam"
            },
            {
                id: 4,
                name: "Fermenation",
                duration: "5 days",
                status: "single",
            },
            ]
        },
        {
            id: 5,
            name: "Seed 2 Fermenter",
            duration: "3 days",
            status: "single",
            subRows: [
                {
                    id: 6,
                    name: "CIP",
                    duration: "2 hours",
                    status: "single",
                },
                {
                    id: 7,
                    name: "SIP",
                    duration: "3 hours",
                    status: "single",
                },
                {
                    id: 8,
                    name: "Fermenation",
                    duration: "5 days",
                    status: "single",
                },
                ]
            },
    ], [])

    console.log(processData)


    const columns = React.useMemo(
        () => [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            // Build our expander column
            id: 'expander', // Make sure it has an ID
            Header: 'Description',
            accessor: 'name',
            Cell: ({row, value }) =>
            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
            // to build the toggle for expanding a row
              {if(row.canExpand){
                if(row.isExpanded){
                  return (
                    <div className="flex items-center">
                    <MdKeyboardArrowDown  {...row.getToggleRowExpandedProps()}/> 
                    <span className="font-bold">{value}</span>
                    </div>
                  )
                }else{
                  return (
                    <div className="flex items-center">
                    <MdKeyboardArrowRight {...row.getToggleRowExpandedProps()}/> 
                    <span className="font-bold" >{value}</span>
                    </div>
                  )
                }
              }else{
               return  <span {...row.getToggleRowExpandedProps({ style: {paddingLeft: `${row.depth * 2}rem`,},})}>{value}</span>
              } }
          },              
          {
            Header: 'Duration',
            accessor: 'duration',
          },
          {
            Header: 'Resources',
            accessor: 'resources',
            Cell: ({value}) => {if(value){return(<span className="px-1 py-1 text-sm text-white bg-blue-400 rounded">{value}</span>)} else return null},
          },
        ],
        []
      )
      
      return (
        <Table columns={columns} data={processData}/>
      )
}


const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: "Matthew",
    lastName: "Malone",
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

 function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}




export default GridPage