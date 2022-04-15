import { Button } from "./button"
import { useContext } from "react"
import { ProjectContext } from "../contexts/project.context"

export const GridActionBar = () =>{
    const {deleteSelection, addTask} = useContext(ProjectContext)

    const handleAdd = () =>{
        addTask(taskToAdd)
    }

    const taskToAdd =  {
        id: 9,
        name: "Seed 3 Fermenter",
        duration: "3 days",
        status: "single",
        resources: "steam",
        subRows: [
          {
            id: 10,
            name: "CIP",
            duration: "2 hours",
            status: "single",
            resources: "steam",
          },
          {
            id: 11,
            name: "SIP",
            duration: "3 hours",
            status: "single",
            resources: "Steam",
          },
          {
            id: 12,
            name: "Fermenation",
            duration: "5 days",
            status: "single",
          },
        ],
      }

    return(
        <>
        <Button onClick={deleteSelection}>
            Delete
        </Button>
        <Button>
            Indent
        </Button>
        <Button onClick={handleAdd}>
            Add
        </Button>
        </>
    )
}
