import React, { ReactNode, useState } from 'react'

export interface TabProps {
  label: string
  children?: ReactNode
}

export const Tab: React.FC<TabProps> = ({ label, children }) => { return <></> }

interface TabsProps {
  activeTab: string
}

const Tabs: React.FC<TabsProps> = ({ activeTab, children }) => {
  const [active, setActive] = useState(activeTab)
  const handleTabChange = (e: any) => setActive(e.target.innerText)

  return <>
    <div className="tab">
      <ol className="tab-list">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<TabProps>(child)) { return undefined }

          let elementChild: React.ReactElement<TabProps> = child
          const label = elementChild.props.label
          let className = 'tab-list-item'

          if (active === label) {
            className = 'tab-list-item active'
          }
          
          return React.createElement("li", { className, onClick: handleTabChange }, label)
        })}
      </ol>
    </div>
    <div className="content">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<TabProps>(child)) { return undefined }

        let elementChild: React.ReactElement<TabProps> = child
        const children = elementChild.props.children
        const label = elementChild.props.label

        if(label !== active) { return undefined }

        return React.createElement("div", { }, children)
      })}
    </div>
  </>
}

export default Tabs