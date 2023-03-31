import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export const PageLoading = () => {
    return (
        <div className="absolute z-10 top-0 left-0 flex items-center justify-center w-screen h-screen backdrop-saturate-0">
            <AiOutlineLoading3Quarters size={50} className="animate-spin fill-sky-400 stroke-2"/> 
        </div>
    )
}