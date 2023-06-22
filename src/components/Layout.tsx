import React from 'react'

export const Layout = ({ children }: { children: any }) => {
  return (
    <React.Fragment>
      <div className="navigationWrapper">
        <main className="mx-auto items-center">
          {children}
        </main>
      </div>
    </React.Fragment>
  )
}
