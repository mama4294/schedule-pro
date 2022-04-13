import {useTable, useExpanded} from "react-table"


const Table = ({ columns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state: { expanded },
    } = useTable(
      {
        columns,
        data,
      },
      useExpanded // Use the useExpanded plugin hook
    )
  
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
      </>
    )
  }

  export default Table