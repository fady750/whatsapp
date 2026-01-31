import LeftPanelHeader from "@/shared/ui/LeftPanelHeader";

export default function ProfileHeader(){
    return(
        <LeftPanelHeader styles="flex-col! gap-1! h-fit! items-start!" >
            <h1 className="text-primary-250 p-5 font-medium text-2xl" >Profile</h1>
        </LeftPanelHeader>
    )
}