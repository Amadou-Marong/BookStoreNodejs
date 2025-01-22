const MyModal = (props) => {
    
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 w-1/3 rounded-lg min-w-[400px]">
            <h2 className="text-2xl font-semibold text-gray-800">{props.title}</h2>
            {props.children}
        </div>
    </div>
  )
}

export default MyModal