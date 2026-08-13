import LeftSidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <LeftSidebar />
            <div className="h-screen xl:mr-90 mr-0 md:ml-90 ml-0">
                {children}
            </div>
            <RightSidebar />
        </div>
    )
}

export default layout
