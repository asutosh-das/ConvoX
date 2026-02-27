import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
    return (
        <div className='flex h-[80vh] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
            <Sidebar />
            <MessageContainer />
        </div>
    );
};
export default Home;
