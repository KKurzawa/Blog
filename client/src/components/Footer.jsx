const Footer = () => {
    return (
        <footer className="flex justify-center w-full h-[10rem] bg-[#949AA2] text-[#252528] border-t-8 border-[#74787e]">
            <button onClick={() => {
                const topBtn = document.getElementById('top')
                topBtn?.scrollIntoView({ behavior: 'smooth' })
            }} className="header-btn top-btn text-5xl">To The Top</button>
        </footer>
    )
}

export default Footer