import Tablist from "../components/TabList"

export default function RootLayout({
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