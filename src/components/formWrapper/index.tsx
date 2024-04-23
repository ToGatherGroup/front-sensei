import React, { ReactNode } from 'react'

// Esse wrapper aceita parametros de css do tailwindcss e styles padrão para o header e o form

type FormWrapperProps = {
    header: string;
    handleSubmit?: (event: React.FormEvent) => void;
    formStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    formClass?: string;
    headerClass?: string;
    children: ReactNode;
}

const defaultStyles: any = {
    header: "font-bold uppercase xl:text-4xl md:text-1xl sm:text-lg text-lg xl:mb-10 md:mb-7 sm:mb-5 mb-5 text-center",
    formWrapper: "bg-defaultGray my-0 mx-auto px-10 py-6 sm:px-8 sm:py-4 md:px-24 md:py-16 xl:px-36 xl:py-20 rounded-md max-h-[650px] sm:max-w-[350px] md:max-w-[450px] xl:max-w-[650px] max-w-[350px] overflow-y-auto custom-scrollbar",
  };


export const FormWrapper = ({children, header, handleSubmit, formClass = '', formStyle, headerClass= '', headerStyle}: FormWrapperProps) => {
    
    const combinedFormClasses = `${defaultStyles.formWrapper} ${formClass}`
    const combinedHeaderClasses = `${defaultStyles.header} ${headerClass}`

    return ( 
        <div>
            <form className={combinedFormClasses} style={{...formStyle}} onSubmit={handleSubmit}>
                <h2 className={combinedHeaderClasses} style={{...headerStyle}}>{header}</h2>
                {children}
            </form>
        </div>
            
        
    );
}