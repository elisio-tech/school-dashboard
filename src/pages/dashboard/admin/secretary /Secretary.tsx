import ComponentCard from "../../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import SecretaryTable from "../../../../components/tables/BasicTables/SecretaryTable";
import { Modal } from "../../../../components/ui/modal";
import { useModal } from "../../../../hooks/useModal";
import SecretaryForm from "./SecretaryForm";



export default function Secretary() {
 const { isOpen, closeModal, openModal } = useModal()
 
  return (
    <>
      <PageBreadcrumb pageTitle="Secretária" />
      <div className="space-y-6">
        <ComponentCard title="Area academica" click={openModal} btn={"Novo funcionário"}>
          <SecretaryTable />
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[700px] m-4"
          >
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
              <SecretaryForm closeModal={closeModal}  />
            </div>
          </Modal>
        </ComponentCard>
      </div>
    </>
  );
}
