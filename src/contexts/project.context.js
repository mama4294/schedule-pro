import { createContext, useState, useEffect } from "react";

const defaultTasks = [
  {
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
        resources: "steam",
      },
      {
        id: 3,
        name: "SIP",
        duration: "3 hours",
        status: "single",
        resources: "Steam",
      },
      {
        id: 4,
        name: "Fermenation",
        duration: "5 days",
        status: "single",
      },
    ],
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
    ],
  },
];

export const ProjectContext = createContext({
  tasks: defaultTasks,
  setTasks: () => null,
  selectedTaskRowIds: [],
  setSelectedTaskRowIds: () => null,
});

export const ProjectProvider = ({ children }) => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [selectedTaskRowIds, setSelectedTaskRowIds] = useState([]);

  useEffect(() => {
    console.log("new selection");
    console.log(selectedTaskRowIds);
    // console.log(selectedTaskRowIds);
  }, [selectedTaskRowIds]);

  // useEffect(() => {
  //     // update number of items in cart
  //     const newCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  //     setCartCount(newCartCount)
  //     // update cart total
  //     const newCartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  //     setCartTotal(newCartTotal)
  // },[cartItems])

  const addTask = (taskToAdd) => setTasks(handleAddTask(tasks, taskToAdd));
  const removeTask = (taskToRemove) =>
    setTasks(handleRemoveTask(tasks, taskToRemove));
  const deleteSelection = () =>
    setTasks(handleDeleteSelection(tasks, selectedTaskRowIds));

  // const addItemToCart = (productToAdd) =>setCartItems(addCartItem(cartItems, productToAdd))
  // const removeItemFromCart = (productToRemove) =>setCartItems(removeCartItem(cartItems, productToRemove))
  // const decreaseProductQuantity = (product) =>setCartItems(decreaseCartItemQty(cartItems, product))

  return (
    <ProjectContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        deleteSelection,
        selectedTaskRowIds,
        setSelectedTaskRowIds,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

const handleAddTask = (tasks, taskToAdd) => {
  return [...tasks, taskToAdd];
};

const handleRemoveTask = (tasks, taskToRemove) => {
  return tasks.filter((task) => task.id !== taskToRemove.id);
};

const handleDeleteSelection = (tasks, selectedTaskIds) => {
  console.log(`Deleting: ${selectedTaskIds}`);
  return tasks.map((element) => {
    return {
      ...element,
      subRows: element.subRows.filter(
        (subElement) => !selectedTaskIds.includes(subElement.id)
      ),
    };
  });
};
