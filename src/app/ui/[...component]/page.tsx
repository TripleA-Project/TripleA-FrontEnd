import ComponentTest from '@/components/ComponentTest';

interface UIComponentTestProps {
  params: {
    component: string[];
  };
}

function UIComponentTest({ params: { component } }: UIComponentTestProps) {
  const name = component.length === 1 ? component.join('') : component.join('/');

  return (
    <div className="box-border flex h-screen w-screen items-center justify-center">
      <ComponentTest name={name} />
    </div>
  );
}

export default UIComponentTest;
