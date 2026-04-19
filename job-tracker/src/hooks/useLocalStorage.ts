import { useState, useEffect } from "react"

function useLocalStorage<T>(key:string, defaultValue: T){
  const [value, setValue] = useState<T>(()=> {
  const saved = localStorage.getItem(key)
  if (saved === null) {
    return defaultValue
  }
  try {
    return JSON.parse(saved) as T
  }
  catch {
    return defaultValue
  }
})
useEffect(()=>{
  localStorage.setItem(key, JSON.stringify(value))
}, [key,value]
)
return [value,setValue] as const
}
export default useLocalStorage