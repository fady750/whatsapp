import LeftPanelHeader from "@/shared/ui/LeftPanelHeader";
import SearchInput from "@/shared/ui/SearchInput";

export default function SettingsHeader(){
    return(
        <LeftPanelHeader styles="flex-col! gap-5! h-fit! items-start!" >
                <h1 className="text-primary-250 p-5 font-medium text-base" >Settings</h1>
                <SearchInput  />
        </LeftPanelHeader>
    )
}