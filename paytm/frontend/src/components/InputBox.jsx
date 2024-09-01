export default function InputBox({title, placeholder, type, onChange}){
    return(
        <div className="mb-4 w-80">
            <label className="block text-sm font-medium text-gray-700">{title}</label>
            <input onChange={onChange} className="appearance-none border rounded-md w-full px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type={type} placeholder={placeholder} />
        </div>
    )
}