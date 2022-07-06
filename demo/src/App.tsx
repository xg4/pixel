import ImageContainer from './components/ImageContainer'
import PhantomContainer from './components/PhantomContainer'
import VideoContainer from './components/VideoContainer'

function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <ImageContainer />
      <VideoContainer />
      <PhantomContainer />
    </div>
  )
}

export default App
