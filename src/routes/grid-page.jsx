import React from "react"
import Table from "../components/table"
import {MdKeyboardArrowDown,MdKeyboardArrowRight} from "react-icons/md"
import { useContext } from "react"
import { ProjectContext } from "../contexts/project.context"
import { GridActionBar } from "../components/gridActionBar"

const GridPage = () =>{

  const {tasks} = useContext(ProjectContext)
  const {setSelectedTaskRowIds} = useContext(ProjectContext)
  console.log(tasks)
  const processData = React.useMemo(() => tasks, [tasks])

  const columns = React.useMemo(
      () => [
        {
          Header: '',
          accessor: 'id',
        },
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
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
        <>
        <GridActionBar/>
        <Table columns={columns} data={processData} setSelection={setSelectedTaskRowIds}/>
        </>
      )
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)




export default GridPage