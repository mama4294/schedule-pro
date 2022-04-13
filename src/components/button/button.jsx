import React from 'react'

export const BUTTON_TYPE_CLASS = {
    base: 'outline',
}


export const Button = ({children, buttonType, ...otherProps}) => {

    const getStyles = (buttonType) => {
        switch (buttonType) {
                case "outline":
                   return "text-slate-800 border-slate-800 hover:text-white hover:bg-slate-800 hover:border-transparent"
            
                default:
                    return "text-slate-800 hover:bg-slate-200"
        }
    }

    const additionalStyles = getStyles(buttonType)
  return (
    <button {...otherProps} className={`px-3 py-2 rounded-md text-sm font-medium ease-in-out duration-300  ${additionalStyles}`}>
        {children}
    </button>
  )
}
