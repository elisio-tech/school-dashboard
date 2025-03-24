
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";

export default function Teachers() {
  return (
    <>
      <PageBreadcrumb pageTitle="Teachers" />
      <div className="space-y-6">
        <ComponentCard title="Teachers"  click={()=> alert("click me!")} btn={"New teacher"}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}