import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import { Modal } from "../../../components/ui/modal";
import { useModal } from "../../../hooks/useModal";
import TeacherForm from "./TeacherForm";


export default function Teachers() {
 const { isOpen, closeModal, openModal } = useModal()
 
  return (
    <>
      <PageBreadcrumb pageTitle="Teachers" />
      <div className="space-y-6">
        <ComponentCard title="Teachers" click={openModal} btn={"New teacher"}>
          <BasicTableOne />
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[700px] m-4"
          >
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
              <TeacherForm  closeModal={closeModal} />
            </div>
          </Modal>
        </ComponentCard>
      </div>
    </>
  );
}
