import Tablist from "./TabList"

export default function GenreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Tablist/>
      {children}
    </div>
  )
}