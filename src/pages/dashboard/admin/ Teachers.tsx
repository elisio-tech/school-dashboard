
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import TeacherModalForm from "../../../components/Modals/TeacherModalForm";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import { useModal } from "../../../hooks/useModal";

export default function Teachers() {
  const { openModal } = useModal()  
  return (
    <>
      <PageBreadcrumb pageTitle="Teachers" />
      <div className="space-y-6">
        <ComponentCard title="Teachers"  click={openModal} btn={"New teacher"}>
          <BasicTableOne />
          <TeacherModalForm />
        </ComponentCard>
      </div>
    </>
  );
}