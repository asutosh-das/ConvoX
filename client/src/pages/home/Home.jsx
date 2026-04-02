import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
    return (
        <div className='flex h-[92vh] w-[96vw] max-w-7xl rounded-3xl overflow-hidden glassmorphism relative z-10'>
            <Sidebar />
            <MessageContainer />
        </div>
    );
};
export default Home;
