import List from "./components/list/List"
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"

const App = () => {
  return (
    <div className='flex w-[80vw] h-[90vh] bg-[#111928BF] rounded-xl backdrop-blur-[19px] backdrop-saturate-[180%] border border-[rgba(255,255,255,0.125)]'>
      <List />
      <Chat />
      <Detail />
    </div>
  )
}

export default App