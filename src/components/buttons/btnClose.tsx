

export default function btnClose() {
  return <button className="inline-flex h-12 animate-background-shine2 items-center justify-center rounded-md border border-red-600 bg-[linear-gradient(110deg,#640000,45%,#ff8282,55%,#640000)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <div className="flex flex-row items-center gap-2">
    <span>Cerrar</span>
    <img
      src="./assets/x.png"
      alt="Nueva Imagen"
      className="w-[24px]"
    />
  </div>
</button>
}
