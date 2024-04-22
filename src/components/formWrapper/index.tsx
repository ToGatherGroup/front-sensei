import React, { ReactNode } from 'react'

type FormWrapperProps = {
    header: string;
    handleSubmit?: (event: React.FormEvent) => void;
    formStyle?: React.CSSProperties;
    formClass?: string;
    children: ReactNode;
}

const defaultStyles: any = {
    header: "font-bold uppercase xl:text-4xl md:text-1xl sm:text-lg text-lg xl:mb-10 md:mb-7 sm:mb-5 mb-5 text-center",
    formWrapper: "bg-defaultGray px-10 py-6 sm:px-8 sm:py-4 md:px-24 md:py-16 xl:px-36 xl:py-20 rounded-md max-h-[650px] overflow-y-auto custom-scrollbar",
  };


export const FormWrapper = ({children, header, handleSubmit, formClass = '', formStyle}: FormWrapperProps) => {
    
    const combinedClasses = `${defaultStyles.formWrapper} ${formClass}`

    return ( 
        <form className={combinedClasses} style={{...formStyle}} onSubmit={handleSubmit}>
            <h2 className={defaultStyles.header}>{header}</h2>
            {children}
        </form>
            
        
    );
}