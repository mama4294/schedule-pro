import {useTable, useExpanded, useRowSelect} from "react-table"
import { useEffect, useRef, forwardRef } from "react"


const Table = ({ columns, data, setSelection }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { expanded, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded, // Use the useExpanded plugin hook
    useRowSelect,
    )

    useEffect(()=>{
      setSelection(selectedFlatRows.map( d => d.original.id))
    },[selectedRowIds])

    
    return (
      <>
        <table {...getTableProps()} className ="">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="px-6 py-2 text-xs text-gray-500">{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="whitespace-nowrap border-2 border-slate-100">
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()} className="px-6 py-4 text-sm text-gray-500">{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p> */}
        <pre>
        <code>
          {JSON.stringify(
            {
              // selectedRowIds: selectedRowIds,
              'Selected Ids': selectedFlatRows.map(
                d => d.original.id
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
      </>
    )
  }

  export default Table