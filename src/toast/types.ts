export type ToastType = "success" | "info" | "error"

export type ToastItem = {
  id: number
  type: ToastType
  message: string
  duration: number | null
}

export type ToastContextType = {
  list: ToastItem[]
  addToast: (
   type: ToastType,
   message: string,
   duration?: number | null
  )=> void
  removeToast: (id:number)=> void
}