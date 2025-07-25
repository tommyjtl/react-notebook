import { SideBySideRow } from "@/components/notebook/layout/Rows";
import CatalogueCard from "@/components/notebook/CatalogueCard";
import RNContentBody from "@/components/notebook/ContentBody";


export default function URLParamsPage() {
    return (
        <RNContentBody
            title="State Management"
            structure={[
                { name: "Home", url: "../" },
                { name: "State Management" },
            ]}
        >
            <SideBySideRow
                left={
                    <CatalogueCard
                        name="useState"
                        description="Native way of handling local state within a component."
                        url="state-management/use-state"
                        disabled={true}
                    />
                }
                right={
                    <CatalogueCard
                        name="useReducer"
                        description="Native way of wrapping up multiple states with a reducer function."
                        url="state-management/use-reducer"
                        disabled={true}
                    />
                }
            />

            <SideBySideRow
                left={
                    <CatalogueCard
                        name="useContext"
                        description="Native way of handling global and co-located states."
                        url="use-context"
                    />
                }
                right={
                    <CatalogueCard
                        name="URL Params"
                        description="Setting and extracting states from URL"
                        url="url-params"
                    />
                }
            />

            <SideBySideRow
                left={
                    <CatalogueCard
                        name="Web Storage API"
                        description="Using browser for managing states via local & session storage"
                        url="state-management/use-context"
                        disabled={true}
                    />
                }
            />
        </RNContentBody>
    )
}