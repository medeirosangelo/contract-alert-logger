import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { TemplateEditor } from "@/components/contract/TemplateEditor";

const ContractTemplate = () => {
  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <TemplateEditor />
        </div>
      </main>
    </div>
  );
};

export default ContractTemplate;