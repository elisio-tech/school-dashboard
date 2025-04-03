import ComponentCard from "../../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import TeacherTable from "../../../../components/tables/BasicTables/TeacherTable";
import { Modal } from "../../../../components/ui/modal";
import { useModal } from "../../../../hooks/useModal";
import TeacherForm from "./TeacherForm";


export default function Teachers() {
 const { isOpen, closeModal, openModal } = useModal()
 
  return (
    <>
      <PageBreadcrumb pageTitle="Professores" />
      <div className="space-y-6">
        <ComponentCard title="Professores" click={openModal} btn={"Novo professor"}>
          <TeacherTable />
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
