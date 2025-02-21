const Loader = () => {
    return (
        <div className="flex  container mx-auto h-screen items-center justify-center flex-col gap-6 p-4 bg-gray-200">
            <div className="skeleton h-60 w-4/5 rounded-lg"></div>
            <div className="skeleton h-5 w-32 rounded"></div>
            <div className="skeleton h-10 w-4/5 rounded"></div>
            <div className="skeleton h-10 w-4/5 rounded"></div>
        </div>
    );
};

export default Loader;
